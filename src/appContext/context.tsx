import { create } from "domain";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { AppContext } from "../models/context.models";

export const ContextApp = createContext<AppContext>({
    user: null,
    signup: () => {},
    login: () => {},
    logout: () => {},
    loading: false,
});

interface Props {
    children: React.ReactNode;
}

export const useAppContext = (): AppContext => {
    const context = useContext<AppContext>(ContextApp);
    return context;
};

export function AppProvider({ children }: Props) {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const signup = async (
        email: string,
        password: string
    ): Promise<void | string> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error instanceof FirebaseError) {
                return error.code as string;
            }
        }
    };

    const login = async (
        email: string,
        password: string
    ): Promise<void | string> => {
        try {
            const response: UserCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const token = await response.user.getIdToken();
            sessionStorage.setItem("auth_token", token);
            setUser(response.user.email);
        } catch (error) {
            if (error instanceof FirebaseError) {
                return error.code;
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            sessionStorage.removeItem("auth_token");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("auth_token") === null) {
            return router.push("/login");
        }
        setLoading(true);
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser === null) {
                return setLoading(false);
            }
            setUser(currentUser.email);
            setLoading(false);
        });
    }, []);

    return (
        <ContextApp.Provider value={{ user, signup, login, logout, loading }}>
            {children}
        </ContextApp.Provider>
    );
}
