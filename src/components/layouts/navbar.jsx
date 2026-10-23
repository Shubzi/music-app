"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        const query = search.trim();
        if (!query) return;

        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <header className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for songs, artists, or albums..."
                    aria-label="Search songs, artists, or albums"
                    className="w-80 rounded-full bg-zinc-900 px-5 py-3 text-sm outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500"
                />

                <button
                    type="submit"
                    className="rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
                >
                    Search
                </button>
            </form>

            <button
                type="button"
                className="rounded-full bg-zinc-900 px-4 py-3 text-sm hover:bg-zinc-800"
            >
                Profile
            </button>
        </header>
    );
};

export default Navbar;