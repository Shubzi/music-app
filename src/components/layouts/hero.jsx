const Hero =() =>{
    return(
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-zinc-900 p-10 ">
            <div className="relative z-10 max-w-xl">
                <p className="mb-3 text-sm font-medium text-purple-300">Good Evening, Shubzi 👋</p>
                <h1 className ="text-5xl font-bold leading-tight">
                    Music For Your <span className="block text-purple-500">Soul.</span>
                </h1>
                <p className="mt-4 text-zinc-300">Discover, Play and Feel The Music </p>
                <button className="mt-8 rounded-full bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500">
                    ▶ Listen Now
                </button>
            </div>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"/>
        </section>
    );
};
export default Hero;