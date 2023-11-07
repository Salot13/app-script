"use client";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { db } from "@/firebase";
import { useRouter } from "next/router";
import axios from "axios";

export default function Id() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState({
    isModal: false,
    error: "",
  });
  const { query } = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSaveEmail = async () => {
    if (!query?.uid || !email) {
      console.error("ID and email are required.");
      return;
    }

    const test = String(query?.uid);
    const docRef = db.collection("emails").doc(`${test}.0`);

    docRef
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          const existingData: any = doc.data();
          const existingEmails = existingData.email || [];
          existingEmails.push(email);
          docRef.update({ email: existingEmails });
          await axios.post("/api/confirm-subscribing", {
            id: test,
            email: email,
          });
        }
      })
      .then(() => {
        setIsSubscribed({
          isModal: true,
          error: "Successfully subscribed to question. Thank You!!!!",
        });
      })
      .catch((error) => {
        setIsSubscribed({
          isModal: false,
          error: "Internal server error. Please try again",
        });
      });
  };

  return (
    <main>
      <div className={styles.main}>
        <div style={{ color: "red", fontSize: "16px" }}>APP SCRIPT</div>
        {!isSubscribed?.isModal ? (
          <div
            style={{
              background: "white",
              height: "400px",
              width: "400px",
              margin: "0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label style={{ marginBottom: "12px" }}>
              Enter an email for subscribing question on App Script:
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              style={{
                marginBottom: "12px",
                width: "300px",
                padding: "12px",
              }}
            />
            <button
              type="button"
              onClick={handleSaveEmail}
              style={{
                width: "300px",
                padding: "12px",
                background: "blue",
                color: "white",
                border: "1px solid gray",
                borderRadius: "30px",
              }}
            >
              Save Email
            </button>
          </div>
        ) : (
          <div
            style={{
              background: "white",
              height: "400px",
              width: "400px",
              margin: "0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Successfully subscribed to the question. Thank You !!!!!
          </div>
        )}
      </div>
    </main>
  );
}
