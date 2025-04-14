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
    logger.info("startGeneration request body:", req.body);

    const {jobId} = req.body;
    if (!jobId) {
      return res.status(400).json({error: "jobId is required"});
    }
    const jobDoc = await db.collection("jobs").doc(jobId).get();
    if (!jobDoc.exists) {
      return res.status(404).json({error: "Job not found"});
    }

    const delayInSeconds = Math.floor(Math.random() * 31) + 30;

    await jobDoc.ref.update({
      status: "processing",
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    setTimeout(async () => {
      await jobDoc.ref.update({
        status: "done",
        result_url: "https://via.placeholder.com/512x512.png?text=Mock+Image",
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
    }, delayInSeconds * 1000);

    res.status(200).json({jobId: jobDoc.id, status: "processing"});
  } catch (error) {
    console.error("startGeneration error:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
