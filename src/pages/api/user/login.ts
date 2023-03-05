import { NextApiRequest, NextApiResponse } from "next";
import admin from 'firebase-admin';
import serviceAccount from '@/secrets/serviceAccountKey.json';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const accessToken = req.headers.authorization?.split(" ")[1]
  try{
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    const uid = decodedToken.uid;
    const phone = decodedToken.phone_number;

    res.status(200).json({uid, phone})
  }catch(err){
    console.log(err)
    res.status(401).json({message: 'Invalid or expired token'})
  }
 
  res.status(200).json({code: 0})
}