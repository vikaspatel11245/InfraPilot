import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "online",
    engine: "InfraPilot Autonomous AI V1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;
