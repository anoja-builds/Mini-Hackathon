# FoodRescue LK

FoodRescue LK connects surplus-food donors with people and organisations that need food across Sri Lanka.

## Project structure

- `frontend/` — Next.js application
- `backend/` — ASP.NET Core Web API

## Modules

| Module | API route | Owner |
| --- | --- | --- |
| Donations | `/api/donations` | Person 1 |
| Food requests | `/api/foodrequests` | Person 2 |
| Organizations | `/api/organizations` | Person 3 |
| Pickups | `/api/pickups` | Person 4 |

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

The API exposes Swagger in the Development environment.

### PostgreSQL setup

The backend uses PostgreSQL through Entity Framework Core and Npgsql.

1. Install PostgreSQL and remember the password for the `postgres` user.
2. Create the database using pgAdmin or `psql`:

```sql
CREATE DATABASE foodrescue_lk;
```

3. Copy `backend/.env.example` to `backend/.env` and set your PostgreSQL password. The `.env` file is ignored by git.
4. From the `backend/` directory, create and apply the first migration after models are added:

```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

The application applies pending migrations automatically in Development mode.

The backend loads `backend/.env` automatically. It contains this environment variable:

```env
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=foodrescue_lk;Username=postgres;Password=YOUR_PASSWORD
```

The connection format is `Host`, `Port`, `Database`, `Username`, and `Password`. PostgreSQL normally listens on port `5432`.

### Deploy with GitHub

The repository is ready to deploy as two services from the `main` branch.

#### Backend on Railway

1. Create a Railway project and choose **Deploy from GitHub repo**.
2. Select `anoja-builds/Mini-Hackathon`, branch `main`.
3. Set the service root directory to `FoodRescue-LK/backend`.
4. Railway will use the included `backend/Dockerfile`.
5. Add these variables in Railway:

```text
ConnectionStrings__DefaultConnection=YOUR_NEON_CONNECTION_STRING
ASPNETCORE_ENVIRONMENT=Production
```

6. Deploy and test `https://YOUR-RAILWAY-DOMAIN/api/organizations`.

#### Frontend on Vercel

1. Import `anoja-builds/Mini-Hackathon` into Vercel.
2. Set the root directory to `FoodRescue-LK/frontend`.
3. Add this variable:

```text
NEXT_PUBLIC_API_URL=https://YOUR-RAILWAY-DOMAIN/api
```

4. Deploy with the default Next.js build settings.

Do not commit `backend/.env`. The deployed frontend must use the Railway URL, not `localhost`.
