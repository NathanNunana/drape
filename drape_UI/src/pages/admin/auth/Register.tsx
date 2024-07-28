import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { register } from "./authSlice";
import { RootState } from "../../../drape/store";
import Toast from "../../../components/Toast";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | "warning">(
    "success",
  );
  const [toastMessage, setToastMessage] = useState("");
  const [, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const authError = useAppSelector((state: RootState) => state.auth.error);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    dispatch(
      register({
        username,
        first_name: firstname,
        last_name: lastname,
        email,
        password,
      }),
    )
      .unwrap()
      .then(() => {
        setToastType("success");
        setToastMessage("Registration successful!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/auth/login");
        }, 3000);
      })
      .catch((error) => {
        setToastType("error");
        const errorMsg = error.email
          ? error.email[0]
          : authError?.message || "Registration failed";
        setToastMessage(errorMsg);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);

        if (error.errors) {
          setErrors(error.errors);
        }
      });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
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
            {authStatus === "loading" ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
      {showToast && <Toast type={toastType} message={toastMessage} />}
    </section>
  );
};

export default Register;
