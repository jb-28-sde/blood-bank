Got it 👍 — here’s your **final clean version of the README.md** (license section removed).
You can copy-paste this directly into your GitHub project 👇

---

# 🩸 Blood Bank Management System

A **full-stack MERN (MongoDB, Express, React, Node.js)** application for managing blood donations and inventory efficiently.
It enables **hospitals, donors, and organisations** to record, manage, and track blood stock in real time.

---

## 🚀 Features

### 🔐 Authentication & Roles

* Role-based access for:

  * 🏥 **Hospitals** — request or manage blood stock
  * 🧑‍🤝‍🧑 **Donors** — donate blood using their email
  * 🏢 **Organisations** — manage overall blood inventory

### 💉 Blood Inventory Management

* Add blood records (`in` for donation, `out` for request)
* Automatically calculates available stock
* Prevents over-requesting more blood than available

### 📊 Dashboard & Analytics

* View total donated and requested blood
* Real-time record updates
* Filter by blood group, organisation, or donor

### 🧾 History & Recent Transactions

* Shows the latest 5 donation or request records
* Hospital and donor-specific dashboards

### 📨 Smart Donor Entry

* If donor’s email doesn’t exist → system **auto-creates a new donor entry**
  (no manual registration required)

---

## 🛠️ Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| Frontend         | React.js (Vite)             |
| Styling          | CSS / Bootstrap             |
| State Management | Redux Toolkit / Context API |
| Backend          | Node.js + Express.js        |
| Database         | MongoDB + Mongoose          |
| Authentication   | JWT (JSON Web Token)        |
| API Testing      | Postman                     |

---

## 📂 Folder Structure

```
BloodBankApp/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔽 Clone Repository

```bash
git clone https://github.com/jb-28-sde/blood-bank-management.git
cd blood-bank-management
```

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm start
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint                          | Description                      |
| ------ | --------------------------------- | -------------------------------- |
| POST   | `/api/inventory/create-inventory` | Add new blood record             |
| GET    | `/api/inventory/get-inventory`    | Get all records                  |
| GET    | `/api/inventory/get-donars`       | Fetch donors for organisation    |
| GET    | `/api/inventory/get-hospitals`    | Fetch hospitals for organisation |
| GET    | `/api/inventory/get-recent`       | Get latest 5 records             |

---

## 🧠 How It Works

1. A donor visits the blood bank and donates blood.
2. Admin (organisation) records the donation with the donor’s email.
3. If the email exists → the record links to that donor.
   If not → a new donor is auto-created.
4. Hospitals can request blood — the system checks stock availability before approval.
5. Inventory updates dynamically in real time.

---

## 👨‍💻 Developer

**👤 Jaibhim Bangrey**
Frontend Developer | MERN Stack Enthusiast
📧 Email: [jaibhimb@gmail.com](mailto:jaibhimb@gmail.com)
💼 GitHub: [https://github.com/jb-28-sde](https://github.com/jb-28-sde)
