import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { store } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoutes />
                    <Toaster />
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    );
}
