## 📚 Book-Store-API-Server-for-j

A feature-rich and secure RESTful API for managing books, orders, users, and payments. Built with **Node.js, Express, TypeScript, and MongoDB**, this server powers the **Book Store Web App**, supporting functionalities like book management, order processing, authentication, and payment tracking.

---

## 🚀 Features

### 📖 **Book Management**

- Add, update, delete, and retrieve books.
- Search functionality to find books by title, author, or category.
- Stock tracking to manage availability.

### 🛒 **Order Processing**

- Users can place orders and track their status (`pending`, `confirmed`, `canceled`, `delivered`).
- Secure checkout process with different payment methods.

### 👤 **User Management**

- User registration and login with secure password handling.
- Role-based access (`admin`, `user`) to manage permissions.
- Admin functionality to manage users and inventory.

### 🔐 **Authentication & Authorization**

- JWT-based authentication for secure access.
- Role-based authorization to control actions like book addition and order management.

### 💳 **Payment Management**

- Supports `cash` and `Stripe` payment methods.
- Transaction tracking with unique `transactionId`.

### ⚙️ **Error Handling & Validation**

- Centralized error handling for consistent API responses.
- Data validation using `Zod` to prevent invalid requests.

---

## 🛠 Technologies Used

### 🔹 **Backend**

- **Node.js** – JavaScript runtime for server-side development.
- **Express.js** – Framework for building RESTful APIs.

### 🔹 **Database**

- **MongoDB** – NoSQL database for efficient data storage.
- **Mongoose** – ODM for MongoDB to structure data.

### 🔹 **Validation & Security**

- **Zod** – Schema-based validation for request data.
- **JSON Web Token (JWT)** – Authentication mechanism.

### 🔹 **Payment Integration**

- **Stripe** – Online payment processing.

### 🔹 **Other Tools**

- **Dotenv** – Environment variable management.
- **Cors & Helmet** – Security middleware for API protection.

---

## 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **MongoDB Atlas Account** or a local MongoDB setup
- **npm** (Node Package Manager)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rashidsarkar/Book-Store-API-Server.git
cd Book-Store-API-Server
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DATABASE_URL=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

### 4️⃣ Start the Server

Run the following command to start the application:

```bash
npm run start:dev
```

The server will start on `http://localhost:5000`.

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## 📜 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

## 👨‍💻 Author

**MD Rashid Sarkar**

- [GitHub](https://github.com/rashidsarkar)
- [Portfolio](https://fabulous-meringue-442652.netlify.app)
- [Email](mailto:rashidsarkar558@gmail.com)

---

### 🚀 Happy Coding & Keep Reading! 📖✨
