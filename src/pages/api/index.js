import { db } from "@/firebase";
import axios from "axios";

export default async function handleSubmitPost(req, res) {
  if (req?.id) {
    try {
      const docRef = db.collection("emails").doc(req?.id);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data();
        console.log("data", data);

        data?.email?.map(async (emailData) => {
          try {
            const sendMails = await axios.post(
              "/api/mail-service",
              {
                email: emailData,
              }
            );
            return sendMails;
          } catch (error) {
            console.error("Error sending email:", error);
            return null;
          }
        });

        // await Promise.all(emailPromises);
      } else {
        console.log("Document not found.");
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
