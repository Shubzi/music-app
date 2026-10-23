"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchMusic } from "@/lib/api";

function LibraryContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const filter = searchParams.get("filter") || "all";

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSongs() {
            try {
                setLoading(true);
                setError("");

                const results = await searchMusic(
                    "popular music",
                    controller.signal
                );

                setSongs(results);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Couldn't load your music. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchSongs();

        return () => controller.abort();
    }, []);

    const titles = {
        all: "Your Library",
        liked: "Liked Songs",
        albums: "Albums",
        artists: "Artists",
        playlists: "Your Playlists",
    };

    const uniqueSongs = (key) => {
        const seen = new Set();

        return songs.filter((song) => {
            const value = song[key];

            if (!value || seen.has(value)) return false;

            seen.add(value);
            return true;
        });
    };

    let displayedSongs = songs;

    if (filter === "albums") {
        displayedSongs = uniqueSongs("album");
    } else if (filter === "artists") {
        displayedSongs = uniqueSongs("artist");
    } else if (filter === "liked" || filter === "playlists") {
        displayedSongs = [];
    }

    const descriptions = {
        all: "Explore music and discover your next favourite track.",
        liked: "Your favourite tracks will appear here when liked songs are implemented.",
        albums: "Explore albums available in your music collection.",
        artists: "Discover artists and explore their music.",
        playlists: "Your created playlists will appear here when playlist creation is implemented.",
    };

    const isCollection = filter === "albums" || filter === "artists";

    function openItem(song) {
        if (filter === "albums") {
            router.push(`/albums/id?album=${encodeURIComponent(song.album)}`);
        } else if (filter === "artists") {
            router.push(`/artist/id?artist=${encodeURIComponent(song.artist)}`);
        }
    }

    return (
        <main className="min-h-screen bg-zinc-950 px-5 py-8 text-white sm:px-8 sm:py-10">
            <button
                onClick={() => router.push("/")}
                className="mb-8 text-sm text-zinc-400 transition hover:text-white"
            >
                ← Back to Home
            </button>

            <div className="mb-8">
                <h1 className="mb-3 text-3xl font-bold">
                    {titles[filter] || titles.all}
                </h1>

                <p className="text-zinc-400">
                    {descriptions[filter] || descriptions.all}
                </p>
            </div>

            {loading && (
                <div className="py-16 text-center text-zinc-400">
                    <p>Loading music...</p>
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-900/50 bg-red-950/20 px-6 py-12 text-center">
                    <p className="text-red-300">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-5 rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold transition hover:bg-purple-500"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && displayedSongs.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
                    {displayedSongs.map((song) => {
                        const heading =
                            filter === "albums"
                                ? song.album
                                : filter === "artists"
                                ? song.artist
                                : song.title;

                        const subtitle =
                            filter === "artists"
                                ? "Artist"
                                : filter === "albums"
                                ? song.artist
                                : song.artist;

                        return (
                            <article
                                key={`${filter}-${song.id}`}
                                className="group min-w-0 rounded-xl bg-zinc-900 p-3 transition duration-200 hover:bg-zinc-800"
                            >
                                <div
                                    className={`relative mb-4 overflow-hidden ${
                                        filter === "artists"
                                            ? "rounded-full"
                                            : "rounded-lg"
                                    }`}
                                >
                                    {song.image ? (
                                        <img
                                            src={song.image}
                                            alt={heading || "Music artwork"}
                                            loading="lazy"
                                            className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex aspect-square items-center justify-center bg-zinc-800 text-3xl text-zinc-500">
                                            ♪
                                        </div>
                                    )}
                                </div>

                                <h2 className="truncate font-semibold">
                                    {heading || "Unknown"}
                                </h2>

                                <p className="mt-1 truncate text-sm text-zinc-400">
                                    {subtitle || "Unknown artist"}
                                </p>

                                {filter === "all" && song.album && (
                                    <p className="mt-1 truncate text-xs text-zinc-500">
                                        {song.album}
                                    </p>
                                )}

                                {isCollection && (
                                    <button
                                        onClick={() => openItem(song)}
                                        className="mt-3 w-full rounded-full border border-zinc-700 px-3 py-2 text-xs font-semibold transition hover:border-purple-500 hover:bg-purple-600/10"
                                    >
                                        {filter === "albums"
                                            ? "View Album"
                                            : "View Artist"}
                                    </button>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}

            {!loading && !error && displayedSongs.length === 0 && (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-16 text-center">
                    <div className="mb-4 text-4xl text-zinc-600">
                        {filter === "liked"
                            ? "♡"
                            : filter === "playlists"
                            ? "♫"
                            : "♪"}
                    </div>

                    <h2 className="text-lg font-semibold">
                        {filter === "liked"
                            ? "No liked songs yet"
                            : filter === "playlists"
                            ? "No playlists yet"
                            : "No music found"}
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                        {filter === "liked"
                            ? "The liked-songs feature still needs to be connected."
                            : filter === "playlists"
                            ? "Playlist creation still needs to be implemented."
                            : "Try exploring music again in a moment."}
                    </p>

                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:bg-purple-500"
                    >
                        Explore Music
                    </button>
                </div>
            )}
        </main>
    );
}

export default function LibraryPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-zinc-950 px-8 py-10 text-white">
                    Loading library...
                </main>
            }
        >
            <LibraryContent />
        </Suspense>
    );
}