import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ---------- helper validators ---------- */
  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const isValidPassword = (val) => val.length >= 6; // demo rule

  /* -------------- submit ----------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");           // clear old errors

    /* 1️⃣  basic empty‑field check */
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    /* 2️⃣  field‑format validation */
    if (!isValidEmail(email)) {
      setError("Enter a valid e‑mail address.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    /* 3️⃣  look up user in localStorage */
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email);

    if (!user) {
      setError("This e‑mail is not registered. Please sign up first.");
      return;
    }

    /* 4️⃣  compare password */
    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    /* ✅ all good — log in */
    console.log("Logged in!");
    navigate("/dna");
  };

  /* -------------- UI --------------------- */
  return (
    <div
      style={{
        backgroundColor:"black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="bg-gray-900 sm:px-10 md:px-14 py-7 text-white space-y-5 rounded shadow-lg transition-transform duration-300 transform hover:scale-105">
        <h1 className="text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* E‑mail */}
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="E‑mail"
              autoComplete="username"
              className="w-full p-2 outline-none bg-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full p-2 outline-none bg-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 w-full rounded p-2 text-white hover:bg-blue-500 hover:shadow-lg hover:rounded-md transition"
          >
            Login
          </button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-bold hover:text-white"
          >
            Sign Up
          </Link>{" "}
          |{" "}
          <Link to="/" className="text-blue-600 font-bold hover:text-white">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
