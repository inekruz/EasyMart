import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>

      {children}

      <div className="toast-container">
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} />
        ))}
      </div>

    </ToastContext.Provider>
  );
}

function ToastItem({ message, type }) {

  const icons = {
    success: "✔",
    error: "✖",
    info: "ℹ"
  };

  return (
    <div className={`toast ${type}`}>

      <div className="toast-icon">
        {icons[type]}
      </div>

      <div className="toast-message">
        {message}
      </div>

      <div className="toast-progress"></div>

    </div>
  );
}

export default ToastProvider;