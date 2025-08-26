import { Hono } from "hono"
import { serve } from "@hono/node-server"
import {POST} from "../api/agent.js";

const app = new Hono()

app.post('/invocations', async (c) => POST(c.req.raw))

app.get("/ping", (c) => {
  return c.json({
    status: "Healthy",
    time_of_last_update: Math.floor(Date.now() / 1000)
  }, 200)
})

serve({
  fetch: app.fetch,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000
})
