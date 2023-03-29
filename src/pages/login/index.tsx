import { useRouter } from "next/navigation";
import React, { FormEvent, useRef } from "react";
import { useAppContext } from "../../appContext/context";

const Login = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const { login } = useAppContext();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errMessage = await login(
            emailRef.current?.value as string,
            passwordRef.current?.value as string
        );
        if (errMessage !== undefined) {
            return console.log(errMessage);
        }
        router.push("/");
        console.log("autentificado!");
    };

    return (
        <section className="h-screen flex flex-col justify-center items-center">
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="border border-indigo-600 h-2/5 w-96 flex flex-col justify-end items-center gap-6 p-2"
            >
                <h1 className="font-bold text-3xl">Login</h1>
                <div className="flex w-full flex-col p-2">
                    <label htmlFor="">Email:</label>
                    <input
                        ref={emailRef}
                        className="w-full  p-2"
                        type="email"
                    />
                </div>
                <div className="flex w-full flex-col p-2 mb-12">
                    <label htmlFor="">Password:</label>
                    <input
                        ref={passwordRef}
                        className="w-full p-2"
                        type="password"
                    />
                </div>
                <div className="w-full mb-1  bg-black text-center ">
                    <button type="submit" className="w-full text-white p-2 ">
                        Login
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Login;
