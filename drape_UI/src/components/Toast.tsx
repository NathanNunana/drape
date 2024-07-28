import React from "react";

interface ToastProps {
  type: "success" | "error" | "warning";
  message: string;
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-yellow-500";

  return (
    <div
      className={`fixed top-0 right-0 mt-4 mr-4 px-4 py-2 rounded ${bgColor}`}
    >
      <p className="text-white">{message}</p>
    </div>
  );
};

export default Toast;
