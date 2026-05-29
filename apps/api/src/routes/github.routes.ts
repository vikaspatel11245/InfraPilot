import { Router } from "express";

const router: Router = Router();

router.post("/validate", (req, res) => {
  const { repoUrl } = req.body;
  const valid = !!(repoUrl && repoUrl.startsWith("http"));
  res.json({ valid });
});

router.post("/branches", (req, res) => {
  res.json({ branches: ["main", "master", "dev", "staging"] });
});

export default router;
