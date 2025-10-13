import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { route } from "./routes/router/router.tsx";
import AuthProvider from "./contexts/AuthProvider/AuthProvider.tsx";
import toast, { Toaster, ToastBar } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={route}></RouterProvider>
      {/* Correct way to use Toaster */}
      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'enter 0.3s ease-out' : 'exit 0.3s ease-in forwards',
            }}
          >
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>✕</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </AuthProvider>
  </StrictMode>
);