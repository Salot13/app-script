"use client";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { db } from "@/firebase";
import { useRouter } from "next/router";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "44px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

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

    const test = `${query?.uid}.0`;
    const docRef = db.collection("emails").doc(test);

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
          error: "Successfully subscribed to question. Thank You",
        });
      })
      .catch((error) => {
        setIsSubscribed({
          isModal: false,
          error: "Internal server error. Please try again",
        });
      });
  };

  console.log("isSubscribed", isSubscribed);

  return (
    <main>
      <div className={styles.main}>
        <div
          style={{ fontSize: "32px", marginBottom: "20px" }}
          className="gradient-text"
        >
          APP SCRIPT
        </div>
        <div
          style={{
            background: "#f0f0f0",
            borderRadius: "10px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            padding: "20px",
            width: "400px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSubscribed?.isModal ? (
            <div style={{ color: "green", fontSize: "20px" }}>
              Successfully subscribed to the question. Thank You!!!{" "}
            </div>
          ) : (
            <div>
              <label>
                Enter an email to subscribe to the question on App Script:
              </label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={handleSaveEmail}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save Email
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
