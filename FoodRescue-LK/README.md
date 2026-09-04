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
