import {createRoot} from "react-dom/client"
import App from "./components/App";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query"

const root = document.getElementById("root")

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const queryClient = new QueryClient()

container.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
                <App />
        </QueryClientProvider>
    </React.StrictMode>
)