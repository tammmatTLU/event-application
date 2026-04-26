# Event Application

A web application for managing events and registering attendees. Built with .NET 10 (backend) and React (frontend).

## Features

- Public event listing — visitors can browse upcoming events and register to attend
- Admin panel — authenticated admins can create and delete events, and manage participants
- JWT-based admin authentication
- SQLite database — no external database setup required

## Prerequisites

Make sure you have the following installed before proceeding:

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org) (includes npm)
- [Git](https://git-scm.com)

To verify your installations, run:

```bash
dotnet --version   # should be 10.0.201 or higher
node --version     # should be v22.16.0 or higher
npm --version      # should be 10.9.2 or higher
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tammmatTLU/event-application.git
cd event-application
```

### 2. Configure the backend

Navigate to the backend project folder:

```bash
cd backend/EventApp
```

Create a `appsettings.Development.json` file by copying the example:

```bash
cp appsettings.Development.example.json appsettings.Development.json
```

Open `appsettings.Development.json` and set your desired admin credentials and JWT secret:

```json
{
  "AdminCredentials": {
    "Email": "admin@example.com",
    "Password": "your-password-here"
  },
  "Jwt": {
    "Secret": "replace-with-a-random-32-character-string"
  }
}
```

### 3. Run the backend

Still inside `backend/EventApp/`, run:

```bash
dotnet run
```

The API will start on the port specified in `Properties/launchSettings.json` — 
by default `http://localhost:5054`. If this differs on your machine, update 
`VITE_API_URL` in the frontend `.env` file to match.

The SQLite database (`events.db`) is created automatically on first run — no setup needed.

### 4. Configure the frontend

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend/event-app
```

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Open `.env` and set the API URL to match the port your backend is running on:

VITE_API_URL=http://localhost:5054/api

### 5. Install frontend dependencies

```bash
npm install
```

### 6. Run the frontend

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Usage

### As a visitor

- Open `http://localhost:5173` in your browser
- Browse the list of upcoming events
- Click **Register** on any event to sign up with your first name, last name, and national ID

### As an admin

- Click **Admin login** in the top right corner
- Log in with the credentials you set in `appsettings.Development.json`
- Once logged in you can:
  - Create new events using the form at the top
  - View and remove participants by clicking **Edit participants** on any event card
  - Delete individual events using the **Delete event** button
  - Clear all data using the **Clear all data** button

## Project Structure
```
event-application/
├── backend/
│   └── EventApp/
│       ├── Controllers/    # API endpoints
│       ├── DTOs/           # Request and response types
│       ├── Data/           # Database context
│       ├── Models/         # Entity models
│       └── Program.cs      # App configuration and startup
├── frontend/
│   └── event-app/
│       └── src/
│           ├── api/        # API service layer
│           ├── components/ # React components
│           ├── hooks/      # Custom React hooks
│           └── styles/     # CSS files
└── README.md
```

## Configuration Reference

### Backend — `appsettings.Development.json`

| Key | Description |
|-----|-------------|
| `AdminCredentials.Email` | Admin login email |
| `AdminCredentials.Password` | Admin login password |
| `Jwt.Secret` | Secret key used to sign JWT tokens (min. 32 characters) |

### Frontend — `.env`

| Key | Description |
|-----|-------------|
| `VITE_API_URL` | Full base URL of the backend API |

## Disclaimer

This project was developed with the assistance of [Claude](https://claude.ai).
