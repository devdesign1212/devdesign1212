import { toast } from "react-toastify";

export const showSuccessNotification = (
  message: string,
  theme: "light" | "dark"
) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: theme,
  });
};

export const showErrorNotification = (
  message: string,
  theme?: "light" | "dark"
) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: theme,
  });
};
