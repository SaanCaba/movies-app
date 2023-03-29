import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/src//.tsstyles/Home.module.css";
import { useAppContext } from "../appContext/context";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { user, logout } = useAppContext();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push("/login");
    };
    return (
        <>
            <h1>{user ? user : "no logueado"}</h1>
            <button onClick={() => handleLogout()}>log out</button>
        </>
    );
}
