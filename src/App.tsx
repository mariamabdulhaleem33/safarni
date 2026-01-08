import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            background: "#1a1a2e",
            color: "#ffffff",
            padding: "16px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },

          // Success toast style
          success: {
            duration: 3000,
            style: {
              background: "#065f46",
              color: "#ffffff",
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },

          // Error toast style
          error: {
            duration: 4000,
            style: {
              background: "#b21010",
              color: "#ffffff",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },

          // Loading toast style
          loading: {
            style: {
              background: "#1e3a5f",
              color: "#ffffff",
              border: "1px solid #3b82f6",
            },
          },
        }}
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
