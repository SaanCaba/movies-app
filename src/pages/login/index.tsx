import React from "react";

const Login = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center">
            <form className="border border-indigo-600 h-2/5 w-1/5 flex flex-col justify-end items-center gap-6 p-2">
                <h1 className="font-bold text-3xl">Login</h1>
                <div className="flex w-full flex-col p-2">
                    <label htmlFor="">Email:</label>
                    <input className="w-full  p-2" type="email" />
                </div>
                <div className="flex w-full flex-col p-2 mb-12">
                    <label htmlFor="">Password:</label>
                    <input className="w-full p-2" type="password" />
                </div>
                <div className="w-full mb-1  bg-black text-center ">
                    <button className=" text-white p-2 ">Login</button>
                </div>
            </form>
        </section>
    );
};

export default Login;
