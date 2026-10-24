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
        <header className="flex items-center gap-3 border-b border-zinc-800 px-4 py-4 sm:px-6 md:justify-between md:px-8 md:py-5">
            <form
                onSubmit={handleSearch}
                className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none"
            >
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search songs, artists, or albums..."
                    aria-label="Search songs, artists, or albums"
                    className="min-w-0 flex-1 rounded-full bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:w-80 md:flex-none"
                />

                <button
                    type="submit"
                    className="shrink-0 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400 sm:px-5"
                >
                    Search
                </button>
            </form>

            <button
                type="button"
                className="shrink-0 rounded-full bg-zinc-900 px-3 py-3 text-sm transition hover:bg-zinc-800 sm:px-4"
            >
                Profile
            </button>
        </header>
    );
};

export default Navbar;