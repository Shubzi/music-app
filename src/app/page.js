
"use client";

import { useEffect, useState } from "react";
import { searchMusic } from "@/lib/api";
import Sidebar from "@/components/layouts/sidebar";
import Navbar from "@/components/layouts/navbar";
import Hero from "@/components/layouts/hero";
import MusicSection from "@/components/music/musicSection";
import MusicPlayer from "@/components/layouts/musicPlayer";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSongs() {
      try {
        setLoading(true);
        setError("");

        const apiSongs = await searchMusic(
          "popular music",
          controller.signal
        );

        setSongs(apiSongs);

        if (apiSongs.length > 0) {
          setCurrentSong(apiSongs[0]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Couldn't load music. Please refresh and try again.");
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

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <section className="px-8 pb-28 pt-8">
          <Hero />

          <div className="mt-8">
            {loading && (
              <p className="py-8 text-zinc-400">
                Loading music...
              </p>
            )}

            {error && (
              <p role="alert" className="py-8 text-red-400">
                {error}
              </p>
            )}

            {!loading && !error && songs.length === 0 && (
              <p className="py-8 text-zinc-400">
                No songs are available right now.
              </p>
            )}

            {songs.length > 0 && (
              <MusicSection
                title="Discover Music"
                songs={songs}
                onPlay={handlePlay}
              />
            )}
          </div>
        </section>

        <MusicPlayer
          song={currentSong}
          songs={songs}
          onSelectSong={handlePlay}
        />
      </div>
    </main>
  );
}
