import React from "react";

const LoadingScreen = () => {
    return (
        <div className="h-screen bg-black w-full flex justify-center items-center absolute">
            <div>
                <h1 className="text-white text-3xl">Loading...</h1>
            </div>
        </div>
    );
};

export default LoadingScreen;
