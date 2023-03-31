import Image from "next/image";
import { useAppContext } from "../appContext/context";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";
import dataLanding from "../data/data.landing.json";
import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import RatedMovies from "../components/RatedMovies";
import PopularMovies from "../components/PopularMovies";
import { Result } from "../models/apiResponse.models";

interface Props {
    ratedMovies: Result[];
    popularMovies: Result[];
}

export default function Home({ ratedMovies, popularMovies }: Props) {
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
        <ProtectedRoute>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <section className="h-screen relative">
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
                            <div className="w-1/4">
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
                    </section>
                    <section className="bg-[#4a4a4a] pl-10 flex flex-col gap-20">
                        <RatedMovies ratedMovies={ratedMovies} />
                        <PopularMovies popularMovies={popularMovies} />
                    </section>
                </>
            )}
        </ProtectedRoute>
    );
}

export const getServerSideProps = async () => {
    const responseRatedMovies = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=f13ee10485ee4510387320a5c5bd58e2"
    );
    const responsePopularMovies = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=f13ee10485ee4510387320a5c5bd58e2"
    );
    const { results: ratedMovies } = await responseRatedMovies.json();
    const { results: popularMovies } = await responsePopularMovies.json();

    return {
        props: {
            ratedMovies,
            popularMovies,
        },
    };
};
