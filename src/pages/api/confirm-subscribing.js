/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";
import { db } from "@/firebase";

export default async function (req, res) {
  const docRef = db.collection("emails").doc(req?.body?.id);
  const userEmail = req?.body?.email;
  const doc = await docRef.get();

  const data = doc.data();

  if (doc.exists) {
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
      text: `You  are subscurbing to this question. ${data.question}`,
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
    await res.status(200).json({ message: "Success" });
  } else {
    console.log("Document not found.");
  }
}
