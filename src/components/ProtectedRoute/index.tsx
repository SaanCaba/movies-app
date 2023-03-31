import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const router = useRouter();

    useEffect(() => {
        if (sessionStorage.getItem("auth_token") === null) {
            return router.push("/login");
        }
    }, []);

    return <div>{children}</div>;
};

export default ProtectedRoute;
