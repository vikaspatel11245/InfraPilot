import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import healthRouter from "./routes/health.routes";
import githubRouter from "./routes/github.routes";
import logsRouter from "./routes/logs.routes";
import deploymentRouter, { deploymentsDb } from "./routes/deployment.routes";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Bind HTTP routes
app.use("/api/health", healthRouter);
app.use("/api/github", githubRouter);
app.use("/api/logs", logsRouter);
app.use("/api/deployments", deploymentRouter);

const server = createServer(app);

// Bind WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: WebSocket, request) => {
  // Extract deployment ID from path `/ws/deployments/:id`
  const url = request.url || "";
  const parts = url.split("/");
  const deploymentId = parts[parts.length - 1];

  console.log(`WebSocket client connected for deployment: ${deploymentId}`);

  // Send initial deployment state immediately
  const sendState = () => {
    const deployment = deploymentsDb[deploymentId];
    if (deployment) {
      ws.send(JSON.stringify({ type: "status", payload: deployment }));
    }
  };

  sendState();

  // Set up periodic sync stream loops matching active states
  const interval = setInterval(() => {
    const deployment = deploymentsDb[deploymentId];
    if (deployment) {
      // Stream logs/thoughts
      ws.send(JSON.stringify({ type: "status", payload: deployment }));
      
      const lastThought = deployment.agentThoughts[deployment.agentThoughts.length - 1];
      if (lastThought) {
        ws.send(JSON.stringify({ type: "thought", payload: lastThought }));
      }
      
      if (deployment.status === "success" || deployment.status === "failed") {
        clearInterval(interval);
      }
    }
  }, 2000);

  ws.on("close", () => {
    console.log(`WebSocket client disconnected from: ${deploymentId}`);
    clearInterval(interval);
  });
});

// Upgrade HTTP to WS connection
server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url || "", `http://${request.headers.host}`).pathname;

  if (pathname.startsWith("/ws/deployments")) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(port, () => {
  console.log(`[InfraPilot API] Server listening online at http://localhost:${port}`);
});
