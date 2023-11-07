import axios from "axios";

export default async function handleSubmitPost(req, res) {
  if (req?.id) {
    try {
      await axios.post("/api/mail-service", { id: req?.id });
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
