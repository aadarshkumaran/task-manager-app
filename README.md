
# 📝 Task Manager App – Full Stack Project

## 🚀 How to Set Up and Run the Project

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/aadarshkumaran/task-manager-app.git
   cd task-manager-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

> Server will run on `http://localhost:5000`

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

> The app will run on `http://localhost:5173` by default.

---

## 💡 Assumptions Made

- All users must sign up and log in before accessing tasks.
- Each task is tied to a single user (`owner`).
- Categories are entered as free text for now (not selected from a fixed list).
- Tasks can be marked completed or pending only via boolean field.
- The dashboard is per-user and shows stats only for the logged-in user.
- The backend API base URL is hardcoded or handled via `.env` files.
- The user must be authenticated before accessing protected routes (e.g., dashboard, task list).
- JWT token is stored in `localStorage` and sent with each API request using `Authorization` headers.

---

## 🛠️ Technologies & Libraries Used

### Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- CORS

### Frontend:
- **React** 19.1.0
- **Vite** 6.3.5 (build tool)
- **Tailwind CSS** 3.4.17 (for styling)
- **React Router DOM** 7.6.0 (for routing)
- **Axios** 1.9.0 (for HTTP requests)
- **Lucide React** (for icons)
- **Framer Motion** (for animations)

### Dev Tools:
- Postman (API testing)
- Nodemon (backend development)

---

## 🧗 Challenges Faced & Solutions in Backend

1. **Authentication Protection:**
   - ✅ Solved by creating a reusable `authMiddleware` that checks JWT tokens and protects task routes.

2. **Task Filtering & Searching:**
   - ✅ Used MongoDB's query capabilities and regex to allow flexible searching and filtering by query params.

3. **Category Summarization in Dashboard:**
   - ✅ Used MongoDB aggregation to dynamically group tasks by category.

4. **Frontend Token Handling:**
   - ✅ Stored token in `localStorage` and passed in `Authorization` headers via Axios interceptors or manually.

5. **Cross-Origin Requests:**
   - ✅ Configured CORS middleware to allow frontend communication during development.

## 🧗 Challenges Faced & Solutions in Frontend

1. **Routing and Navigation:**
   - ✅ Used `react-router-dom` v7 to structure public and private routes cleanly.

2. **JWT Token Management:**
   - ✅ Handled token storage and sending manually via Axios headers.

3. **Responsive UI with Tailwind:**
   - ✅ Used Tailwind's utility classes to ensure responsiveness across devices.

4. **State Handling for Auth & Dashboard:**
   - ✅ Managed using `useEffect`, `useState`, and component props.

---

## 📎 Final Notes

- This app is mobile-responsive and can be easily extended to include due date reminders and notifications.
- Deployment-ready and uses environment variables for production safety.
- Smooth integration with backend API at `http://localhost:5000`
- Designed with scalability in mind—modular components and routing
- Easily deployable to platforms like Vercel or Netlify

---

Feel free to fork, improve, or contribute!
