
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
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white md:px-10">
      <button
        onClick={() => router.push("/")}
        className="mb-8 text-sm text-zinc-400 hover:text-white"
      >
        ← Back to Home
      </button>

      <h1 className="mb-2 text-3xl font-bold">Search</h1>

      <p className="mb-8 text-zinc-400">
        Discover songs from the music catalog.
      </p>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search songs or artists..."
        aria-label="Search songs or artists"
        className="mb-8 w-full max-w-xl rounded-full border border-zinc-800 bg-zinc-900 px-6 py-4 text-sm outline-none focus:border-purple-500"
      />

      {loading && (
        <p className="py-8 text-zinc-400">Searching songs...</p>
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

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {songs.map((song) => (
          <article
            key={song.id}
            className="rounded-xl bg-zinc-900 p-3 transition hover:bg-zinc-800"
          >
            <img
              src={song.image}
              alt={`${song.title} artwork`}
              className="mb-4 aspect-square w-full rounded-lg object-cover"
            />

            <h2 className="truncate font-semibold">
              {song.title}
            </h2>

            <p className="mt-1 truncate text-sm text-zinc-400">
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
                className="mt-3 w-full"
              >
                Your browser does not support audio playback.
              </audio>
            )}

            {song.url && (
              <a
                href={song.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-purple-400 hover:text-purple-300"
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
        <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
          Loading search...
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
