"use client";

export default function SongRow({
    song,
    index,
    onPlay,
    isPlaying = false,
}) {
    if (!song) return null;

    return (
        <div className="group flex min-w-0 items-center gap-4 rounded-lg px-3 py-3 transition hover:bg-zinc-900">
            <span className="w-6 shrink-0 text-center text-sm text-zinc-500">
                {index ?? "—"}
            </span>

            {song.image ? (
                <img
                    src={song.image}
                    alt={song.title || "Song artwork"}
                    className="h-12 w-12 shrink-0 rounded-md object-cover"
                />
            ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-zinc-800">
                    <span className="text-lg text-purple-400">♪</span>
                </div>
            )}

            <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">
                    {song.title || "Untitled Song"}
                </p>

                <p className="truncate text-sm text-zinc-400">
                    {typeof song.artist === "string"
                        ? song.artist
                        : song.artist?.name || "Unknown Artist"}
                </p>
            </div>

            {song.duration && (
                <span className="shrink-0 text-sm text-zinc-500">
                    {song.duration}
                </span>
            )}

            <button
                type="button"
                onClick={() => onPlay?.(song)}
                disabled={!onPlay}
                aria-label={`Play ${song.title || "song"}`}
                className="shrink-0 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-default disabled:opacity-50"
            >
                {isPlaying ? "Playing" : "Play"}
            </button>
        </div>
    );
}