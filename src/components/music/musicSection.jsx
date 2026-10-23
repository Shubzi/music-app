"use client"
import MusicCard from "./musicCard"

const MusicSection = ({ title, songs, onPlay }) => {
    return(
        <section className="mt-10">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold hover:text-white">{title}</h2>
                <button>See All</button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
                {songs.map((song) => (
                    <div key={song.id} className="shrink-0 w-44">
                        <MusicCard song={song} onPlay={onPlay} />
                    </div>
                ))}
            </div>
        </section>
    );
};
export default MusicSection;