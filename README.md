# Expense Tracker

Expense Tracker is a full-stack application designed to help users manage and monitor their expenses. The project consists of a React + TypeScript frontend and a Node + TypeScript backend. It offers a responsive user interface, state management with Redux, and a robust API backend built with Express and TypeORM.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Development Scripts](#development-scripts)
  - [Frontend Scripts](#frontend-scripts)
  - [Backend Scripts](#backend-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-Friendly UI:** Built with React and enhanced with Tailwind CSS for a modern look.
- **State Management:** Managed via Redux Toolkit for predictable state control.
- **Routing:** Smooth navigation using React Router.
- **API Integration:** Secure interactions between the frontend and backend.
- **Data Export:** Generate reports using ExcelJS and JSON-to-CSV conversion.
- **Authentication:** Secure authentication using JWT.
- **Validation:** Input and request validation via Zod.

## Technology Stack

### Frontend

- **Framework:** React with TypeScript
- **Tooling:** Vite for fast development and build times
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS (with @tailwindcss/vite)
- **Routing:** React Router Dom
- **HTTP Requests:** Axios
- **Additional Libraries:** Framer Motion, React Icons, Sweetalert2, and more

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express for RESTful API endpoints
- **Database:** TypeORM for database interaction (using PostgreSQL)
- **Security & Utilities:** bcryptjs for password hashing, jsonwebtoken for authentication, and dotenv for environment management
- **Additional Libraries:** CORS, ExcelJS, json2csv, and Zod for data validation

## Installation

### Frontend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pawan-chauhan-9560/Expense-Tracker.git
   cd Expense-Tracker/frontend
   npm install
   npm run dev
   ```

### Backend Setup

Navigate to the Backend Directory:
cd ../expense-tracker-backend
npm install
npm run dev

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements and bug fixes.

### License

This project is licensed under the MIT License.
