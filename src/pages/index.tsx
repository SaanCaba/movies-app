import Image from "next/image";
import { useAppContext } from "../appContext/context";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";
import dataLanding from "../data/data.landing.json";
import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const { user, logout, loading } = useAppContext();
    const [changeNav, setChangeNav] = useState<boolean>(false);

    const [clientWindowHeight, setClientWindowHeight] = useState<number>(0);

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        if (clientWindowHeight > 1) {
            setChangeNav(true);
        } else {
            setChangeNav(false);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [clientWindowHeight]);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div className="h-screen relative">
                        <NavBar changeNav={changeNav} />
                        <Image
                            src={
                                "https://image.tmdb.org/t/p/original/" +
                                dataLanding.backdrop_path
                            }
                            alt={dataLanding.title}
                            width={1580}
                            height={1580}
                            className="h-full object-cover w-full absolute -z-10"
                        />
                        <div className="z-10 h-full flex flex-col justify-center gap-10 ml-10">
                            <div>
                                <h1 className="text-3xl text-white font-bold tracking-wide drop-shadow-lg shadow-black">
                                    {dataLanding.title}
                                </h1>
                            </div>
                            <div className="w-1/2">
                                <p className="text-white text-xl tracking-wide drop-shadow-xl shadow-black">
                                    {dataLanding.overview}
                                </p>
                            </div>
                            <div>
                                {dataLanding.production_companies.map((el) => {
                                    return (
                                        <Image
                                            key={el.id}
                                            width={300}
                                            height={300}
                                            alt={el.name}
                                            src={
                                                "https://image.tmdb.org/t/p/original/" +
                                                el.logo_path
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
