import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhhh_secret = "dog";
  next();
});

app.use("/api", router);

app.get("/app", (req, res) => {
  res.json({ message: "hello" });
});

export default app;
