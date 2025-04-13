#!/bin/bash
echo $GOOGLE_SERVICES_JSON | base64 --decode > ./google-services.json