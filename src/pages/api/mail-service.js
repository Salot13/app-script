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

    const checkMail= data?.email?.map(async (emailData) => {
      try {
        const mailData = {
          to: emailData,
          subject: `Message From `,
          text: "new one",
          html: <html><div>HI</div></html>,
        };
        await transporter.sendMail(mailData);
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
