"use client";

import { X, CheckCircle, XCircle } from "lucide-react";
import { ToastContentProps } from "react-toastify";



interface CustomToastProps {
  title: string;
  message: string;
  type: "success" | "error";
}

const CustomToast = ({
  closeToast,
  data,
}: ToastContentProps<CustomToastProps>) => {
  if (!data) {
    return null;
  }


  const { title, message, type } = data;
  const isSuccess = type === "success";

  return (
    <div
      className={`relative w-full rounded-lg `}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`shrink-0 ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {isSuccess ? <CheckCircle size={24} /> : <XCircle size={24} />}
        </div>

        {/* Content */}
        <div className="grow">
          <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600">{message}</p>
        </div>

        {/* Close Button */}
        <div className="shrink-0">
          <button
            onClick={closeToast}
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
