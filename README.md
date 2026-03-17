# notesBackend

Production-grade backend learning lab built from this project.

## What this project is (current state)

- **Stack**: TypeScript, Express, Prisma, Postgres
- **Port**: `3001`
- **Core features**: CRUD notes with pagination
- **Already present (good production foundations)**:
  - **Async error safety** via `src/utils/asyncHandler.ts`
  - **Central error handler** via `src/middleware/errorHandling.ts`
  - **Request sanitization/redaction** via `src/middleware/sanitizer.ts` (stores sanitized copy in `res.locals.sanitized`)
  - **Basic request logging** via `src/middleware/logSecurity.ts`
  - **Schema validation** (Zod) in `src/controllers/create.ts`

## API routes

Mounted at `/notes` in `src/index.ts`.

- `POST /notes/create`
- `GET /notes?page=1&limit=10`
- `GET /notes/unique/:id`
- `PUT /notes/update/:id`
- `DELETE /notes/delete/:id`

## Local setup (dev)

### Prerequisites

- Node.js (recent LTS)
- pnpm
- Postgres database

### Environment variables

Create a `.env` file (or export env vars in your shell) with:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
NODE_ENV="development"
```

### Install dependencies

```bash
pnpm install
```

### Prisma (generate client + migrations)

This repo uses Prisma schema in `prisma/schema.prisma`.

```bash
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

### Run the server

```bash
pnpm dev
```

Server starts on `http://localhost:3001`.

## How to use quickly (manual smoke test)

Create a note:

```bash
curl -sS -X POST "http://localhost:3001/notes/create" \
  -H "Content-Type: application/json" \
  -d '{"title":"First note","content":"This is a note with enough content."}'
```

Read notes (paginated):

```bash
curl -sS "http://localhost:3001/notes?page=1&limit=10"
```

Read by id:

```bash
curl -sS "http://localhost:3001/notes/unique/1"
```

Update:

```bash
curl -sS -X PUT "http://localhost:3001/notes/update/1" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated content that is long enough."}'
```

Delete:

```bash
curl -sS -X DELETE "http://localhost:3001/notes/delete/1"
```

## “My steps” — what to do next (project-only roadmap)

This is a practical path to turn this repo into a production-grade backend learning lab. The key is to build **one vertical slice at a time** and add production patterns you can reuse.

### Step 0: Lock the baseline (1–2 hours)

- **Add a “start” script** (production run, not nodemon)
- **Add `.env.example`** with `DATABASE_URL` and required config
- **Add a simple health endpoint**:
  - `/healthz` (liveness, always 200 if process is alive)
  - `/readyz` (readiness, checks DB connectivity)

Acceptance check: `curl /readyz` returns success only when DB is reachable.

### Step 1: Make controllers consistent (2–3 hours)

Right now some controllers use `asyncHandler` and some use `try/catch`.

- **Standardize all controllers** on `asyncHandler` (or all on try/catch + `next(error)`) so errors behave consistently.
- **Standardize response shape** (`{ success, data, message, errors }`) across all endpoints.
- **Fix error messages** in Zod and error handler (avoid returning `NOT_FOUND` for validation failures).

Acceptance check: every failing request returns predictable JSON + correct status code.

### Step 2: Add authentication + authorization (4–8 hours)

Goal: learn auth properly by implementing it in this same codebase.

- **Auth model**:
  - Users table (Prisma model)
  - Password hashing (argon2 or bcrypt)
- **JWT**:
  - Short-lived **access token**
  - Longer-lived **refresh token** with rotation
  - Revocation strategy (store refresh token hashes in DB or Redis)
- **Authorization**:
  - Add a role (`user`, `admin`)
  - Protect note routes so users only see their own notes

Acceptance check: without token → 401; with token → only own notes.

### Step 3: Redis for caching + rate limiting (3–6 hours)

- **Cache-aside** for `GET /notes` and `GET /notes/unique/:id`
  - Choose cache keys (include `page`, `limit`, `userId`)
  - TTL strategy (short TTL, plus invalidation on create/update/delete)
- **Rate limiting**:
  - Use Redis-backed rate limiting for auth endpoints and write endpoints

Acceptance check: repeated reads become faster; writes invalidate relevant cache keys.

### Step 4: Observability (3–6 hours)

- **Logging**:
  - JSON logs
  - request ID / correlation ID
  - ensure sanitized request data is what you log (never raw tokens/passwords)
- **Metrics** (Prometheus):
  - request count, latency histogram, error count
  - DB query timing (basic)
- **Dashboards** (Grafana):
  - latency p95, error rate, RPS

Acceptance check: you can see traffic + latency in Grafana locally.

### Step 5: Docker + CI/CD (3–6 hours)

- **Dockerfile** (multi-stage, non-root user)
- **docker-compose** (app + postgres + redis)
- **CI pipeline** (GitHub Actions):
  - install → typecheck → test → build docker
  - basic security scan (deps, image)

Acceptance check: `docker compose up` boots everything; CI is green on every push.

### Step 6: Kubernetes (4–8 hours)

Use a local cluster (kind/minikube) and deploy what you already built.

- Deployment + Service (+ Ingress if you want)
- ConfigMap/Secret for config
- Liveness/readiness probes wired to `/healthz` and `/readyz`
- Resource requests/limits

Acceptance check: rolling update works and readiness gate prevents broken pods serving traffic.

### Step 7: Async jobs + queues (Kafka later, pattern first) (4–8 hours)

Add one feature that is **intentionally async**, for example:
- Export notes to a file
- Send an email/notification after create/update
- Generate a report

Start with a simple queue/worker approach, then map the same concepts to Kafka:
- **At-least-once delivery**
- **Retries**
- **Dead letter queue**
- **Idempotency keys**

Acceptance check: API returns quickly; job finishes in background; retries don’t duplicate results.

## Learn the async nature of backend (with exercises tied to this repo)

You learn “async backend” fastest by understanding:
1) how Node schedules work (event loop + microtasks),
2) how your handlers propagate errors,
3) how to control concurrency and avoid overload.

### What to study in this repo (in order)

- `src/utils/asyncHandler.ts`
  - Exercise: explain why `Promise.resolve(fn(...)).catch(next)` prevents “unhandled promise rejection” and ensures `errorHandler` runs.
- `src/controllers/read.ts`
  - Exercise: it uses `Promise.all([findMany, count])`.
    - Explain when parallelism helps and when it hurts (DB saturation).
    - Add a “limit max” rule to prevent huge `limit` values (backpressure).
- `src/middleware/logSecurity.ts`
  - Exercise: logs on `res.on("finish")`. Explain why this callback runs even for errors and how timing is measured.

### Fast async exercises (do these after each change)

- **Microtask vs macrotask demo**:
  - Create a small script in the repo (e.g., `scripts/event-loop-demo.ts`) that prints the order of:
    - `console.log`
    - `Promise.resolve().then(...)`
    - `setTimeout(..., 0)`
  - Explain the output order.
- **Concurrency control**:
  - Write a tiny helper that limits concurrency for an array of async tasks (or use a library later).
  - Use it in a “fake workload” endpoint to see how uncontrolled concurrency can spike latency.
- **Backpressure mindset**:
  - Add request timeouts and DB timeouts (where applicable).
  - Add a maximum payload size for JSON (Express limit).

## Notes (what you’ll learn by doing this)

- **API engineering**: routing, validation, errors, pagination, versioning
- **Database engineering**: schema design, indexing, migrations, query patterns
- **Security**: JWT flows, refresh rotation, secrets, rate limiting, sanitization
- **Distributed systems basics**: caching, queues, retries, idempotency
- **DevOps**: Docker, CI/CD, K8s, observability with Prometheus/Grafana

