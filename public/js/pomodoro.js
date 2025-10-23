import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pomodoro", { user: req.session.user || null });
});

export default router;
