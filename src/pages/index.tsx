import Head from "next/head";
import Image from "next/image";
import styles from "@/src//.tsstyles/Home.module.css";
import { useAppContext } from "../appContext/context";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
    const { user, logout, loading } = useAppContext();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push("/login");
    };
    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <h1>{user ? user : "no logueado"}</h1>
                    <button onClick={() => handleLogout()}>log out</button>
                </>
            )}
        </>
    );
}
