"use client";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { db } from "@/firebase";
import handleSubmitPost from "../api/index";
import { useRouter } from "next/router";

export default function Id() {
  const [email, setEmail] = useState("");
  const { query } = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSaveEmail = async () => {
    await handleSubmitPost({ id: "9" });
    if (!query?.uid || !email) {
      console.error("ID and email are required.");
      return;
    }

    const test = String(query?.uid);
    const docRef = db.collection("emails").doc(test);

    docRef
      .get()
      .then((doc) => {
        // if (doc.exists) {
        //   const existingData: any = doc.data();
        //   const existingEmails = existingData.email || [];
        //   existingEmails.push(email);
        //   return docRef.update({ email: existingEmails });
        // } else {
        //   return docRef.set({ email: [email] });
        // }
      })
      .then(() => {
        console.log("Email appended to Firebase document");
      })
      .catch((error) => {
        console.error("Error updating email: ", error);
      });
  };

  return (
    <main>
      <div className={styles.main}>
        <form>
          <label>
            Enter an email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <button type="button" onClick={handleSaveEmail}>
            Save Email
          </button>
        </form>
      </div>
    </main>
  );
}
