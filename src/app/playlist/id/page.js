"use client";

import { useRouter } from "next/navigation";

export default function PlaylistDetailsPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-zinc-950 px-8 py-10 text-white">
            <button
                type="button"
                onClick={() => router.push("/playlist")}
                className="mb-8 text-sm text-zinc-400 transition hover:text-white"
            >
                ← Back to Library
            </button>

            <section className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 sm:flex-row sm:items-end md:p-12">
                <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-950 text-7xl">
                    ♪
                </div>

                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400">
                        Playlist
                    </p>

                    <h1 className="mb-3 text-3xl font-bold md:text-5xl">
                        Your Playlist
                    </h1>

                    <p className="max-w-lg text-sm leading-6 text-zinc-400">
                        Your playlist details and tracks will appear here
                        when playlist data is connected.
                    </p>

                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:bg-purple-500"
                    >
                        Explore Music
                    </button>
                </div>
            </section>

            <div className="mt-10 rounded-xl border border-zinc-800 p-8 text-center">
                <h2 className="font-semibold">No tracks yet</h2>

                <p className="mt-2 text-sm text-zinc-400">
                    Playlist tracks will appear here when you add them.
                </p>
            </div>
        </main>
    );
}
