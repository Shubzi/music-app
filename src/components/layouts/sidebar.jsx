"use client";
 
import Link from "next/link"; import { usePathname } from "next/navigation";
 
const Sidebar = () => { const pathname = usePathname();
 
const navItems = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Library", href: "/playlist" },
];

const libraryItems = [
    { name: "Liked Songs", href: "/playlist?filter=liked" },
    { name: "Albums", href: "/playlist?filter=albums" },
    { name: "Artists", href: "/playlist?filter=artists" },
    { name: "Playlists", href: "/playlist?filter=playlists" },
];

const isActive = (href) => pathname === href;

return (
    <>
        {/* Desktop sidebar */}
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-6 text-white md:block">
            <Link
                href="/"
                className="mb-10 block text-2xl font-bold tracking-wide"
            >
                MUSIC
            </Link>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-lg px-4 py-3 transition ${
                            isActive(item.href)
                                ? "bg-purple-600 text-white"
                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    YOUR LIBRARY
                </p>

                <nav className="space-y-3 text-sm">
                    {libraryItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block text-zinc-400 transition hover:text-white"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>

        {/* Mobile top navigation */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 text-white backdrop-blur md:hidden">
            <div className="mb-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-wide">
                    MUSIC
                </Link>

                <span className="text-xs text-zinc-500">
                    YOUR MUSIC
                </span>
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                            isActive(item.href)
                                ? "bg-purple-600 text-white"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}

                {libraryItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-400 transition hover:text-white"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    </>
);
 
};
 
export default Sidebar;