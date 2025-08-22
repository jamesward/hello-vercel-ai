import { Hono } from "hono"
import { serve } from "@hono/node-server"
import {POST} from "../api/agent";

const app = new Hono()

app.post('/api/agent', async (c) => POST(c.req.raw))

serve({ fetch: app.fetch, port: 3000 })
