import {createRoot} from "react-dom/client"
import App from "./components/App";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query"
import { ErrorBoundary } from "react-error-boundary";

const root = document.getElementById("root")

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const queryClient = new QueryClient()

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    return (
      <div role="alert">
        <h2>⚠️ Что-то пошло не так!</h2>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Попробовать снова</button>
      </div>
    );
  }

container.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
                <App />
            {/* </ErrorBoundary> */}
        </QueryClientProvider>
    </React.StrictMode>
)