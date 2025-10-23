import express from "express";
import path from "path";
import session from "express-session";
import indexRoute from "./routes/index.js";
import tasksRoute from "./routes/tasks.js";
import pomodoroRoute from "./routes/pomodoro.js";
import routineRoute from "./routes/routine.js";
import pagesRoute from "./routes/pages.js";
import habitsRoute from "./routes/habits.js";
import authRoute from "./routes/auth.js";

const __dirname = path.resolve();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "soluna-secret", resave: false, saveUninitialized: true }));

// Routes
app.use("/", indexRoute);
app.use("/tasks", tasksRoute);
app.use("/pomodoro", pomodoroRoute);
app.use("/routine", routineRoute);
app.use("/pages", pagesRoute);
app.use("/habits", habitsRoute);
app.use("/auth", authRoute);

// 404
app.use((req, res) => res.status(404).send("404 - Not Found"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Soluna running at http://localhost:${PORT}`));
