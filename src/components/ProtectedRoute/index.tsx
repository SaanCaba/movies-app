import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAppContext } from "../../appContext/context";

interface Props {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: Props): JSX.Element => {
    const router = useRouter();
    useEffect(() => {
        if (sessionStorage.getItem("auth_token") === null) {
            return router.push("/login");
        }
    }, []);

    return <>{children}</>;
};

export default ProtectedRoute;
