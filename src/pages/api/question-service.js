/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/firebase";

export default async function (req, res) {
  const docRef = db.collection("emails").doc(req?.body?.id);
  docRef.get().then((doc) => {
    if (doc.exists) {
      return docRef.update({ question: req.body.question });
    } else {
      return docRef.set({ question: req.body.question });
    }
  });
}
