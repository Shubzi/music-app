"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "HOME", href: "/" },
        { name: "SEARCH", href: "/search" },
        { name: "LIBRARY", href: "/playlist" },
    ];

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-6 text-white">
            <h1 className="mb-10 text-2xl font-bold tracking-wide">
                MUSIC
            </h1>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-4 py-3 transition ${
                                isActive
                                    ? "bg-purple-600 text-white"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    YOUR LIBRARY
                </p>

                <div className="space-y-3 text-sm text-zinc-400">
                    <Link
                        href="/playlist?filter=liked"
                        className="block hover:text-white"
                    >
                        Liked Songs
                    </Link>

                    <Link
                        href="/playlist?filter=albums"
                        className="block hover:text-white"
                    >
                        Albums
                    </Link>

                    <Link
                        href="/playlist?filter=artists"
                        className="block hover:text-white"
                    >
                        Artists
                    </Link>

                    <Link
                        href="/playlist?filter=playlists"
                        className="block hover:text-white"
                    >
                        Playlists
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;