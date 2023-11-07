/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";
import { db } from "@/firebase";

export default async function (req, res) {
  const docRef = db.collection("emails").doc(req?.body?.id);

  const doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "kineticproject13@gmail.com",
        pass: "piunwkesgvfekplr",
      },
      secure: true,
    });

    const emailPromises = data?.email?.map(async (emailData) => {
      try {
        const mailData = {
          to: emailData,
          subject: `Message From `,
          text: "new one",
          // html: <html><div>HI</div></html>,
        };
        transporter.sendMail(mailData);
      } catch (error) {
        console.error("Error sending email:", error);
        return null;
      }
    });

    const sentMail = await Promise.all(emailPromises);
    await res.status(200).json({ message: "Success", body: sentMail });
  } else {
    console.log("Document not found.");
  }
}
