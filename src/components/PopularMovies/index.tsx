import React from "react";
import { Result } from "../../models/apiResponse.models";
import Image from "next/image";

interface Props {
    popularMovies: Result[];
}

const PopularMovies = ({ popularMovies }: Props) => {
    return (
        <div>
            <div>
                <h1 className="font-medium tracking-wide text-2xl text-white">
                    Popular Movies
                </h1>
            </div>
            <div className="flex w-max gap-5">
                {popularMovies.map((movie) => {
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

export default PopularMovies;
