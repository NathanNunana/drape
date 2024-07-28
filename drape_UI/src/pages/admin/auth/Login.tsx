import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { login } from "./authSlice";
import { RootState } from "../../../drape/store";
import Toast from "../../../components/Toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | "warning">(
    "success",
  );
  const [toastMessage, setToastMessage] = useState("");

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const authError = useAppSelector((state: RootState) => state.auth.error);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setToastType("success");
        setToastMessage("Login successful!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/dashboard");
        }, 3000);
      })
      .catch(() => {
        setToastType("error");
        setToastMessage(authError?.message || "Login failed");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded"
          >
            {authStatus === "loading" ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
      {showToast && <Toast type={toastType} message={toastMessage} />}
    </section>
  );
};

export default Login;
