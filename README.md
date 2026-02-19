# React Poker Order

A full-stack Texas Hold'em poker odds calculator built with React and Express. Users must register and log in to access the poker calculator.

## Features

- User registration / login (JWT authentication)
- Texas Hold'em poker odds calculator
  - Supports 2-6 players
  - Supports Preflop / Flop / Turn / River stages
  - Preflop uses Monte Carlo simulation (50,000 iterations)
  - Flop / Turn uses exhaustive enumeration for exact calculation
  - Displays win rate, tie rate, and 10 hand type probabilities per player

## Tech Stack

### Frontend
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Axios** — HTTP client
- **Bootstrap 5** — CSS framework (CDN)

### Backend
- **Express** — Web framework
- **Sequelize** — MySQL ORM
- **MySQL2** — Database driver
- **Passport + passport-jwt** — JWT authentication
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
│   │   └── passport.js      # Passport JWT strategy
│   ├── models/
│   │   ├── index.js         # Sequelize instance export
│   │   └── user.js          # User model
│   ├── routes/
│   │   ├── auth.js          # Register/Login API
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
```

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
2. Register an account and log in
3. Navigate to the poker calculator, select player hands and community cards
4. Click "Calculate" to see the results

## API

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/user/register` | Register | No |
| POST | `/api/user/login` | Login, returns JWT | No |
| POST | `/api/poker/calculate` | Calculate poker odds | JWT |
