
"use client";

import { useEffect, useRef, useState } from "react";
import {
    Heart,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Repeat,
    Shuffle,
} from "lucide-react";

export default function MusicPlayer({
    song,
    songs = [],
    onSelectSong,
}) {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [audioError, setAudioError] = useState("");

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setAudioError("");

        if (!song?.audio) {
            audio.removeAttribute("src");
            audio.load();
            return;
        }

        audio.src = song.audio;
        audio.load();

        audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
                setIsPlaying(false);
                setAudioError("Unable to play this audio source.");
            });
    }, [song?.id, song?.audio]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const togglePlay = async () => {
        const audio = audioRef.current;

        if (!audio || !song?.audio) {
            setAudioError("This song has no playable audio URL yet.");
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
                setAudioError("");
            } catch {
                setIsPlaying(false);
                setAudioError("Playback failed. Check the audio URL.");
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const playNext = () => {
        if (!songs.length || !song) return;

        const index = songs.findIndex((item) => item.id === song.id);

        if (isShuffle && songs.length > 1) {
            let nextIndex;

            do {
                nextIndex = Math.floor(Math.random() * songs.length);
            } while (nextIndex === index);

            onSelectSong?.(songs[nextIndex]);
            return;
        }

        onSelectSong?.(songs[(index + 1) % songs.length]);
    };

    const playPrevious = () => {
        const audio = audioRef.current;

        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }

        if (!songs.length || !song) return;

        const index = songs.findIndex((item) => item.id === song.id);
        const previousIndex = (index - 1 + songs.length) % songs.length;

        onSelectSong?.(songs[previousIndex]);
    };

    const formatTime = (time) => {
        if (!Number.isFinite(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    };

    const handleEnded = () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;

            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));

            return;
        }

        playNext();
    };

    return (
        <>
            <audio
                ref={audioRef}
                onTimeUpdate={(event) =>
                    setCurrentTime(event.currentTarget.currentTime)
                }
                onLoadedMetadata={(event) =>
                    setDuration(event.currentTarget.duration)
                }
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleEnded}
                onError={() => {
                    setIsPlaying(false);

                    if (song?.audio) {
                        setAudioError("Audio couldn't be loaded.");
                    }
                }}
            />

            <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 px-3 py-3 text-white backdrop-blur-md md:left-64 md:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

                    {/* Current song */}
                    <div className="flex min-w-0 items-center gap-3 sm:flex-1 md:w-1/3">
                        {song?.image ? (
                            <img
                                src={song.image}
                                alt={song.title || "Album artwork"}
                                className="h-10 w-10 shrink-0 rounded-lg object-cover sm:h-11 sm:w-11"
                            />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 sm:h-11 sm:w-11">
                                <Play size={18} />
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                                {song?.title || "No song selected"}
                            </p>

                            <p className="truncate text-xs text-zinc-400">
                                {song?.artist || "Choose a song to get started"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsLiked((previous) => !previous)}
                            aria-label={isLiked ? "Unlike song" : "Like song"}
                            className={`shrink-0 ${
                                isLiked ? "text-purple-400" : "text-zinc-400"
                            } hover:text-purple-400`}
                        >
                            <Heart
                                size={18}
                                fill={isLiked ? "currentColor" : "none"}
                            />
                        </button>
                    </div>

                    {/* Playback controls and progress */}
                    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:w-1/2 md:w-1/3">
                        <div className="flex items-center justify-center gap-5 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => setIsShuffle((previous) => !previous)}
                                aria-label="Toggle shuffle"
                                className={`hidden sm:block ${
                                    isShuffle ? "text-purple-400" : "text-zinc-400"
                                } hover:text-white`}
                            >
                                <Shuffle size={17} />
                            </button>

                            <button
                                type="button"
                                onClick={playPrevious}
                                aria-label="Previous song"
                                className="text-zinc-400 hover:text-white"
                            >
                                <SkipBack size={19} />
                            </button>

                            <button
                                type="button"
                                onClick={togglePlay}
                                aria-label={isPlaying ? "Pause" : "Play"}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 sm:h-10 sm:w-10"
                            >
                                {isPlaying ? (
                                    <Pause size={18} fill="currentColor" />
                                ) : (
                                    <Play size={18} fill="currentColor" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={playNext}
                                aria-label="Next song"
                                className="text-zinc-400 hover:text-white"
                            >
                                <SkipForward size={19} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsRepeat((previous) => !previous)}
                                aria-label="Toggle repeat"
                                className={`hidden sm:block ${
                                    isRepeat ? "text-purple-400" : "text-zinc-400"
                                } hover:text-white`}
                            >
                                <Repeat size={17} />
                            </button>
                        </div>

                        <div className="flex w-full max-w-md items-center gap-2">
                            <span className="text-[10px] text-zinc-500">
                                {formatTime(currentTime)}
                            </span>

                            <input
                                type="range"
                                min="0"
                                max={duration || 100}
                                value={Math.min(currentTime, duration || 100)}
                                onChange={(event) => {
                                    if (audioRef.current && duration) {
                                        audioRef.current.currentTime = Number(event.target.value);
                                        setCurrentTime(Number(event.target.value));
                                    }
                                }}
                                aria-label="Track progress"
                                className="h-1 min-w-0 flex-1 cursor-pointer accent-purple-500"
                            />

                            <span className="text-[10px] text-zinc-500">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>

                    {/* Volume controls: desktop only */}
                    <div className="hidden flex-1 items-center justify-end gap-3 md:flex md:w-1/3">
                        <button
                            type="button"
                            onClick={() => setIsMuted((previous) => !previous)}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                            className="text-zinc-400 hover:text-white"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX size={19} />
                            ) : (
                                <Volume2 size={19} />
                            )}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(event) => {
                                setVolume(Number(event.target.value));
                                setIsMuted(false);
                            }}
                            aria-label="Volume"
                            className="w-24 cursor-pointer accent-purple-500"
                        />
                    </div>
                </div>

                {audioError && (
                    <p
                        role="status"
                        className="mt-1 truncate text-center text-xs text-amber-400"
                    >
                        {audioError}
                    </p>
                )}
            </footer>
        </>
    );
}