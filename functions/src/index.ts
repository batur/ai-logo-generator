/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase/app";
import {getVertexAI, getImagenModel} from "firebase/vertexai";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
const db = admin.firestore();

export const startGeneration = onRequest(async (req: any, res: any) => {
  try {
    const vertexAI = getVertexAI(initializeApp());
    const imagenModel = getImagenModel(vertexAI, {
      model: "imagen-3.0-fast-generate-001",
    });

    logger.info("startGeneration request body:", req.body);

    const {jobId} = req.body;
    if (!jobId) {
      return res.status(400).json({error: "jobId is required"});
    }
    const jobDoc = await db.collection("jobs").doc(jobId).get();
    if (!jobDoc.exists) {
      return res.status(404).json({error: "Job not found"});
    }

    const response = await imagenModel.generateImages(
      jobDoc.data()?.prompt +
        "." +
        jobDoc.data()?.style +
        ", " +
        jobDoc.data()?.style_description
    );

    if (response.filteredReason) {
      console.log(response.filteredReason);
    }

    if (response.images.length == 0) {
      throw new Error("No images in the response.");
    }
    await jobDoc.ref.update({
      status: "processing",
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    const image = response.images[0];
    const bucket = admin.storage().bucket();
    const fileName = `${jobId}.png`;
    const file = bucket.file(fileName);
    const buffer = Buffer.from(image.bytesBase64Encoded, "base64");

    await file.save(buffer, {
      metadata: {
        contentType: "image/png",
      },
      public: true,
      validation: "md5",
    });

    const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    await jobDoc.ref.update({
      status: "done",
      result_url: url,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    const {jobId} = req.body;

    if (jobId) {
      const jobDoc = await db.collection("jobs").doc(jobId).get();
      if (jobDoc.exists) {
        await jobDoc.ref.update({
          status: "error",
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
    logger.error("Error processing job:", error);
    console.error("startGeneration error:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
