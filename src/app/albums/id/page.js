"use client";

import { useRouter } from "next/navigation";

export default function AlbumDetailsPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-zinc-950 px-8 py-10 text-white">
            <button
                onClick={() => router.push("/playlist?filter=albums")}
                className="mb-8 text-sm text-zinc-400 transition hover:text-white"
            >
                ← Back to Albums
            </button>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 md:p-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">
                    Album Details
                </p>

                <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                    Album
                </h1>

                <p className="max-w-lg text-zinc-400">
                    Album details and tracks will appear here when album
                    data is connected to this page.
                </p>

                <button
                    onClick={() => router.push("/playlist?filter=albums")}
                    className="mt-8 rounded-full bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
                >
                    Browse Albums
                </button>
            </section>
        </main>
    );
}