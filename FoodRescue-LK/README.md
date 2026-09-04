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

The backend loads `backend/.env` automatically. It contains this environment variable:

```env
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=foodrescue_lk;Username=postgres;Password=YOUR_PASSWORD
```

The connection format is `Host`, `Port`, `Database`, `Username`, and `Password`. PostgreSQL normally listens on port `5432`.
