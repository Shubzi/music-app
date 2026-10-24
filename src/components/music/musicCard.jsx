"use client";

import { Play } from "lucide-react";

const MusicCard = ({ song, onPlay }) => {
    return (
        <article className="group min-w-0 cursor-pointer">
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={song.image}
                    alt={song.title || "Album cover"}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={() => onPlay(song)}
                    aria-label={`Play ${song.title}`}
                    className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 shadow-lg transition hover:bg-purple-500 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100"
                >
                    <Play
                        className="h-4 w-4 text-white sm:h-5 sm:w-5"
                        fill="currentColor"
                    />
                </button>
            </div>

            <h3 className="mt-2 truncate text-sm font-semibold sm:mt-3 sm:text-base">
                {song.title}
            </h3>

            <p className="mt-1 truncate text-xs text-zinc-400 sm:text-sm">
                {song.artist}
            </p>
        </article>
    );
};

export default MusicCard;