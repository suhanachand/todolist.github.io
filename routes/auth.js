import express from "express";
const router = express.Router();

// This file is mostly a placeholder. We perform Google sign-in on client side (Firebase).
router.get("/login", (req, res) => {
  res.render("index", { user: req.session.user || null });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

export default router;
