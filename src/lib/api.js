
const ITUNES_API = "https://itunes.apple.com/search";

export async function searchMusic(query, signal) {
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: "song",
    limit: "24",
    country: "NG",
  });

  const response = await fetch(
    `${ITUNES_API}?${params.toString()}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch music.");
  }

  const data = await response.json();

  return (data.results || [])
    .filter((song) => song.previewUrl)
    .map((song) => ({
      id: song.trackId,
      title: song.trackName,
      artist: song.artistName,
      image: song.artworkUrl100?.replace(
        "100x100bb",
        "600x600bb"
      ),
      album: song.collectionName,
      audio: song.previewUrl,
      url: song.trackViewUrl,
    }));
}
