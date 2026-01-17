import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import { login } from "./controllers/authcontroller.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});
