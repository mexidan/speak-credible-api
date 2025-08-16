# Speak Credible API (Vercel / Next.js)

This is a minimal, production-friendly API starter that **cannot hang** and is ready to connect to your Custom GPT Action.

## Endpoints
- `GET /api/ping` — health check
- `POST /api/analyze` — accepts `multipart/form-data` with a `file` field and returns stub JSON

## Quick Start

1. **Install deps**
   ```bash
   npm install
   ```

2. **Set API key (local dev)**
   Create `.env.local` with:
   ```bash
   API_KEY=REPLACE_WITH_YOUR_LONG_SECRET
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```
   Test:
   ```bash
   curl -i http://localhost:3000/api/ping
   curl -i -X POST http://localhost:3000/api/analyze      -H "x-api-key: REPLACE_WITH_YOUR_LONG_SECRET"      -F "file=@/path/to/10s.wav"
   ```

4. **Deploy to Vercel**
   - Push this repo to GitHub.
   - In Vercel → *New Project* → import the repo.
   - After the first deploy, set **Environment Variable**: `API_KEY=REPLACE_WITH_YOUR_LONG_SECRET` and redeploy.

5. **Wire your GPT Action**
   - **Auth:** API Key → Custom
     - Variable name: `x-api-key`
     - Value: your exact `API_KEY`
   - **OpenAPI (3.1.1) schema** (use your deployed URL in `servers.url`):
     ```yaml
     openapi: 3.1.1
     info:
       title: Speak Credible API
       version: "1.0.0"
     jsonSchemaDialect: https://json-schema.org/draft/2020-12/schema
     servers:
       - url: https://YOUR-PROJECT.vercel.app
     paths:
       /api/ping:
         get:
           operationId: ping
           summary: Health check
           responses:
             "200":
               description: OK
       /api/analyze:
         post:
           operationId: analyzeVoice
           summary: Analyze an audio sample and return voice metrics
           requestBody:
             required: true
             content:
               multipart/form-data:
                 schema:
                   type: object
                   required: [file]
                   properties:
                     file:
                       type: string
                       format: binary
           responses:
             "200":
               description: OK
               content:
                 application/json:
                   schema:
                     type: object
     ```

## Notes
- The `await file.arrayBuffer()` line ensures the request body is fully consumed to prevent hanging before you add heavy analysis.
- Keep test clips short (10–30s) while wiring. Raise limits later only if needed.
