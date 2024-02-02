const CACHED_SHOWS = "cashedShows";
const CACHED_SHOW = "cashedShow";
const CACHED_EPISODES = "cashedEpisodes";
const FAVORITES = "favorites";

const storageKeys = {
  CACHED_SHOWS,
  CACHED_SHOW,
  CACHED_EPISODES,
  FAVORITES,
} as const;

export { storageKeys };
