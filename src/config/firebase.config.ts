import * as admin from 'firebase-admin';
import { join } from 'path';
import { config } from 'dotenv';
// Load environment variables from .env file
config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    join(__dirname, '../config/firebase-service-account.json'),
  ),
  //   credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Lưu tên bucket trong file .env
});

export const bucket = admin.storage().bucket();
