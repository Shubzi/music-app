"use client";

import MusicCard from "./musicCard";

const MusicSection = ({ title, songs, onPlay }) => {
    return (
        <section className="mt-8 sm:mt-10">
            <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                <h2 className="text-xl font-bold hover:text-white sm:text-2xl">
                    {title}
                </h2>

                <button
                    type="button"
                    className="shrink-0 text-sm text-zinc-400 transition hover:text-white sm:text-base"
                >
                    See All
                </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 sm:gap-5 scrollbar-hide">
                {songs.map((song) => (
                    <div
                        key={song.id}
                        className="w-36 shrink-0 sm:w-40 md:w-44"
                    >
                        <MusicCard song={song} onPlay={onPlay} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MusicSection;