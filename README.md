# React Poker Order

A full-stack Texas Hold'em poker odds calculator built with React and Express. Users must register and log in to access the poker calculator.

## Features

- User registration / login (JWT authentication + Google OAuth)
- Texas Hold'em poker odds calculator
  - Supports 2-6 players
  - Supports Preflop / Flop / Turn / River stages
  - Preflop uses Monte Carlo simulation (50,000 iterations)
  - Flop / Turn uses exhaustive enumeration for exact calculation
  - Displays win rate, tie rate, and 10 hand type probabilities per player
- Internationalization (i18n) — supports Traditional Chinese (zh-TW) and English (en)

## Tech Stack

### Frontend
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Axios** — HTTP client
- **Bootstrap 5** — CSS framework (CDN)
- **i18next + react-i18next** — Internationalization

### Backend
- **Express** — Web framework
- **Sequelize** — MySQL ORM
- **MySQL2** — Database driver
- **Passport + passport-jwt + passport-google-oauth20** — JWT & Google OAuth authentication
- **bcrypt** — Password hashing
- **Joi** — Data validation
- **pokersolver** — Poker hand evaluation
- **jsonwebtoken** — JWT token signing

### Database
- **MySQL** — Relational database

## Project Structure

```
react_poker_order/
├── server/                  # Express backend
│   ├── config/
│   │   ├── database.js      # Sequelize MySQL connection
│   │   └── passport.js      # Passport JWT + Google OAuth strategy
│   ├── models/
│   │   ├── index.js         # Sequelize instance export
│   │   └── user.js          # User model
│   ├── routes/
│   │   ├── auth.js          # Register/Login/Google OAuth API
│   │   └── poker.js         # Poker calculation API
│   ├── services/
│   │   └── calculator.js    # Poker odds calculation engine
│   ├── validation.js        # Joi validation
│   └── index.js             # Express entry point
│
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   ├── NavComponent.js
│       │   ├── HomeComponent.js
│       │   ├── LoginComponent.js
│       │   ├── RegisterComponent.js
│       │   ├── ProfileComponent.js
│       │   ├── OAuthCallbackComponent.js
│       │   └── poker/
│       │       ├── PokerCalculator.js
│       │       ├── PlayerSection.js
│       │       ├── BoardSection.js
│       │       ├── CardPicker.js
│       │       ├── PokerCard.js
│       │       ├── ResultsSection.js
│       │       └── poker.css
│       ├── services/
│       │   ├── auth.service.js
│       │   └── poker.service.js
│       ├── locales/
│       │   ├── zh-TW.json         # Traditional Chinese
│       │   └── en.json            # English
│       ├── i18n.js
│       ├── App.js
│       └── index.js
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- MySQL

### 1. Create Database

```sql
CREATE DATABASE react_poker_order;
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=react_poker_order
PASSPORT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/user/google/callback
```

To obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, create an OAuth 2.0 credential at [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and add `http://localhost:8080/api/user/google/callback` as an authorized redirect URI.

### 3. Install Dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd client && npm install
```

### 4. Run

```bash
# Terminal 1 - Backend (port 8080)
cd server && npm run dev

# Terminal 2 - Frontend (port 3000)
cd client && npm start
```

### 5. Usage

1. Open browser and go to http://localhost:3000
2. Register an account and log in (or use Google OAuth)
3. Navigate to the poker calculator, select player hands and community cards
4. Click "Calculate" to see the results

## API

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/user/register` | Register | No |
| POST | `/api/user/login` | Login, returns JWT | No |
| GET | `/api/user/google` | Initiate Google OAuth login | No |
| GET | `/api/user/google/callback` | Google OAuth callback | No |
| POST | `/api/poker/calculate` | Calculate poker odds | JWT |
