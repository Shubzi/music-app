
"use client";

import { searchMusic } from "@/lib/api";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setSearch(searchParams.get("q") || "");
    }, [searchParams]);

    useEffect(() => {
        const query = search.trim();

        if (!query) {
            setSongs([]);
            setError("");
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            setLoading(true);
            setError("");

            try {
                const results = await searchMusic(
                    query,
                    controller.signal
                );

                setSongs(results);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Couldn't load songs. Please try again.");
                    setSongs([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, 400);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search]);

    return (
        <main className="min-h-screen bg-zinc-950 px-4 py-6 pb-40 text-white sm:px-6 sm:py-8 md:px-10 md:py-10 md:pb-36">
            <button
                type="button"
                onClick={() => router.push("/")}
                className="mb-6 text-sm text-zinc-400 transition hover:text-white sm:mb-8"
            >
                ← Back to Home
            </button>

            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                Search
            </h1>

            <p className="mb-6 text-sm text-zinc-400 sm:mb-8 sm:text-base">
                Discover songs from the music catalog.
            </p>

            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search songs or artists..."
                aria-label="Search songs or artists"
                className="mb-8 w-full max-w-xl rounded-full border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:px-6 sm:py-4"
            />

            {loading && (
                <p className="py-8 text-zinc-400" role="status">
                    Searching songs...
                </p>
            )}

            {error && (
                <p role="alert" className="py-8 text-red-400">
                    {error}
                </p>
            )}

            {!loading && !error && search.trim() && songs.length === 0 && (
                <p className="py-8 text-zinc-400">
                    No songs found. Try another search.
                </p>
            )}

            {!search.trim() && (
                <p className="py-8 text-zinc-500">
                    Start typing to discover music.
                </p>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">
                {songs.map((song) => (
                    <article
                        key={song.id}
                        className="min-w-0 overflow-hidden rounded-xl bg-zinc-900 p-2 transition hover:bg-zinc-800 sm:p-3"
                    >
                        <img
                            src={song.image}
                            alt={`${song.title} artwork`}
                            loading="lazy"
                            className="mb-3 aspect-square w-full rounded-lg object-cover sm:mb-4"
                        />

                        <h2 className="truncate text-sm font-semibold sm:text-base">
                            {song.title}
                        </h2>

                        <p className="mt-1 truncate text-xs text-zinc-400 sm:text-sm">
                            {song.artist}
                        </p>

                        <p className="mt-1 truncate text-xs text-zinc-500">
                            {song.album}
                        </p>

                        {song.audio && (
                            <audio
                                controls
                                preload="none"
                                src={song.audio}
                                aria-label={`Play ${song.title}`}
                                className="mt-3 block w-full max-w-full"
                            >
                                Your browser does not support audio playback.
                            </audio>
                        )}

                        {song.url && (
                            <a
                                href={song.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-block text-xs text-purple-400 transition hover:text-purple-300 sm:text-sm"
                            >
                                View in Apple Music Store ↗
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 md:px-10">
                    Loading search...
                </main>
            }
        >
            <SearchContent />
        </Suspense>
    );
}