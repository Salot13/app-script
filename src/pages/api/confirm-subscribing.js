/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";
import { db } from "@/firebase";

export default async function (req, res) {
  const docRef = db.collection("emails").doc(req?.body?.id);
  const userEmail = req?.body?.email;
  const doc = await docRef.get();
  if (doc.exists) {
    docRef.get().then(async () => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "kineticproject13@gmail.com",
          pass: "piunwkesgvfekplr",
        },
      });
      const mailData = {
        to: userEmail,
        subject: `Message From App Script`,
        text: `You  are subscurbing to this question. ${doc.question}`,
      };
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        });
      });
    });
  } else {
    console.log("Document not found.");
  }
}
