import { Play } from "lucide-react";

const MusicCard = ({ song, onPlay }) => {
    return (
        <article className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl">
                <img src={song.image} alt={song.title} className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105" />
                <button onClick={() => onPlay(song)} className="absolute bottom-3 right-3 flex h-10 w-10 items-center rounded-full bg-purple-600 opacity-0 transition group-hover:opacity-100">
                    <Play className="mx-auto h-5 w-5 text-white" fill="currentColor"/>
                </button>
            </div>
            <h3 className="mt-3 truncate font-semibold">{song.title}</h3>
            <p className="mt-1 truncate text-sm text-zinc-400">{song.artist}</p>
        </article>
    );
};
export default MusicCard;