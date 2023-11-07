/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";
import { db } from "@/firebase";

export default async function (req, res) {
  const docRef = db.collection("emails").doc(req?.body?.id);

  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "techydev2016@gmail.com",
        pass: "urdkgdlhwpqhaadu",
      },
    });

    const checkMail = data?.email?.map(async (emailData) => {
      try {
        const mailData = {
          to: emailData,
          subject: `Message From `,
          text: `You answer has been updated. Please check doc: https://docs.google.com/spreadsheets/d/1sQ8umTovNX_PayWPrVnXzXUXiAOJ4ahVRUhxp0PmgGg/edit#gid=0`,
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
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(400).json({ message: "Success" });
      }
    });

    await Promise.all(checkMail);

    await res.status(200).json({ message: "Success" });
  } else {
    console.log("Document not found.");
  }
}
