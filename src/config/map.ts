export const TILE_LAYERS = [
  {
    name: "main",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    previewUrl:
      "https://api.maptiler.com/maps/bright/256/0/0/0.png?key=PZ3AWg9sbH4ErA56TDyv",
  },
  {
    name: "outdoor",
    url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
    previewUrl:
      "https://api.maptiler.com/maps/outdoor-v2/256/0/0/0.png?key=PZ3AWg9sbH4ErA56TDyv",
  },
  {
    name: "sattelite",
    url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg",
    previewUrl:
      "https://api.maptiler.com/maps/satellite/256/0/0/0.jpg?key=PZ3AWg9sbH4ErA56TDyv",
  },
  {
    name: "dark",
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    previewUrl:
      "https://cloud.maptiler.com/static/img/maps/dataviz-dark.png?t=1706015365",
  },
];

export const INIT_TILE_LAYER_URL = TILE_LAYERS[0].url;

export const INIT_MAP_OPTIONS = {
  lat: 52.161944,
  lng: 21.211111,
  zoom: 13,
  scrollWheelZoom: true,
  zoomControl: false,
  attributionControl: false,
};
