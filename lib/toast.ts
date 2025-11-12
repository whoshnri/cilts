import { toast, ToastOptions } from 'react-toastify';
import CustomToast from '@/components/Toast'; // Adjust path if needed

const toastOptions: ToastOptions = {
  closeButton: false,
  className: "p-0 bg-transparent w-[400px] shadow-none",
  ariaLabel: "Notification",
};

// --- Exportable Success Toast Function ---
export const toastSuccess = (title: string, message: string) => {
  toast(
    // 1. Pass the component reference directly.
    CustomToast, 
    { 
      ...toastOptions,
      // 2. Put all your custom data inside the `data` property.
      data: {
        title,
        message,
        type: 'success',
      },
        className: "border border-green-400"
    }
  );
};

// --- Exportable Error Toast Function ---
export const toastError = (title: string, message: string) => {
  toast(
    CustomToast, 
    { 
      ...toastOptions,
      data: {
        title,
        message,
        type: 'error',
      },
      className: "border border-red-400"
    }
  );
};