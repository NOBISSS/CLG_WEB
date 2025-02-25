import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import Adminrouter from "./routes/admin.route.js";
import eventRouter from "./routes/event.route.js";
import hybridRouter from "./routes/hybrid.route.js";
import noticeRouter from "./routes/notice.route.js";
import studentRouter from "./routes/student.route.js";
import syllabusRouter from "./routes/syllabus.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();

//Common Middlewears:
const allowedOrigins = ["http://localhost:5174", "http://127.0.0.1:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extends: true, limit: "16kb", extended: true }));
app.use(express.static("public"));

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", Adminrouter);
app.use("/api/v1/auth", hybridRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/notice", noticeRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/syllabus", syllabusRouter);
export { app };
