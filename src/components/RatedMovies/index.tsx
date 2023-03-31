import { GetServerSideProps } from "next";
import React from "react";
import { Result } from "../../models/apiResponse.models";
import Image from "next/image";

interface Props {
    ratedMovies: Result[];
}

const RatedMovies = ({ ratedMovies }: Props) => {
    console.log(ratedMovies.length);
    return (
        <div>
            <div>
                <h1 className="font-medium tracking-wide text-2xl text-white">
                    Rated Movies
                </h1>
            </div>
            <div className="flex w-max gap-5">
                {ratedMovies.map((movie) => {
                    return (
                        <div
                            key={movie.id}
                            style={{ width: "250px", height: "150px" }}
                        >
                            <Image
                                width={200}
                                height={200}
                                className="w-full h-full object-contain"
                                src={
                                    "https://image.tmdb.org/t/p/original/" +
                                    movie.backdrop_path
                                }
                                alt={movie.title}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatedMovies;
