import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../appContext/context";
import ProtectedRoute from "../components/ProtectedRoute";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <AppProvider>
                <ProtectedRoute>
                    <Component {...pageProps} />;
                </ProtectedRoute>
            </AppProvider>
        </>
    );
}
