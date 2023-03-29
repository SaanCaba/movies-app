import { create } from "domain";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { AppContext } from "../models/context.models";

export const ContextApp = createContext<AppContext>({
    user: null,
    signup: () => {},
    login: () => {},
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
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error instanceof FirebaseError) {
                return error.code;
            }
        }
    };

    return (
        <ContextApp.Provider value={{ user, signup, login }}>
            {children}
        </ContextApp.Provider>
    );
}
