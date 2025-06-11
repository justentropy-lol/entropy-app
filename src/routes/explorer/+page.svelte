<script>
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import { MapboxOverlay } from "@deck.gl/mapbox";
  import { HexagonLayer } from "@deck.gl/aggregation-layers";
  import InfoPair from "$lib/elements/InfoPair.svelte";
  import LabelPair from "$lib/elements/LabelPair.svelte";
  //import { isUtf8 } from "buffer";

  const station_data_url = import.meta.env.VITE_STATION_DATA_URL;
  const mars_url = import.meta.env.VITE_MARS_URL;

  const total_api_endpoint = import.meta.env.VITE_ORACLE_HOST + "/total";
  const circulating_api_endpoint =
    import.meta.env.VITE_ORACLE_HOST + "/circulating";

  let map;
  const startZoom = 1;
  const maxZoom = 6;

  let total = 55480;
  let circulating = 0;
  $: burned = 0;
  $: claimed = 0;
  let minted = 0;
  let minted_week_ago = 0;
  $: price = 0;
  $: estMaxSupply = (1 - burned / minted_week_ago) * 55480;
  $: medMined = 0;
  $: burnedFormatted = formatNumber(55480 - total);
  $: circulatingFormatted = formatNumber(circulating);
  $: mintedFormatted = formatNumber(minted);
  // $: estMaxSupplyFormatted = formatNumber(estMaxSupply);
  // $: remainingFormatted = formatNumber(55480 - minted);
  $: remainingPercent = (((55480 - minted) / (55480 - burned)) * 100).toFixed(
    0
  );
  $: mktCap = (price * circulating).toFixed(2);
  $: estFDV = formatNumber(price * estMaxSupply);
  $: estEarn = (price * medMined).toFixed(2);
  let minerLocations = [];
  let minerInput = "";
  let marker;
  let el;

  function formatNumber(number) {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  async function fetchData() {
    const response = await fetch(station_data_url);
    const data = await response.json();
    return data;
  }

  async function fetchTotal() {
    const response = await fetch(total_api_endpoint);
    const total = await response.json();
    return total;
  }

  async function fetchCirculating() {
    const response = await fetch(circulating_api_endpoint);
    const circulating = await response.json();
    return circulating;
  }

  async function extractData() {
    const data = await fetchData();
    total = (await fetchTotal()) / 1_000_000;
    circulating = (await fetchCirculating()) / 1_000_000;
    burned = data.burned.toFixed(0);
    minted = data.minted;
    claimed = data.claimed;
    minted_week_ago = data.minted_week_ago;
    medMined = parseFloat(data.median);
    price = parseFloat(data.price);

    minerLocations = data.records
      .filter((record) => record.lon !== null && record.lat !== null) // Filter out invalid coordinates
      .map((record) => ({
        name: record.miner_name,
        coordinates: [parseFloat(record.lon), parseFloat(record.lat)],
        score: record.score.toFixed(3),
        ranking: record.ranking,
      }));
  }

  $: hexInfo = [];

  const bbox = [-180, -75, 180, 75];

  onMount(async () => {
    el = document.createElement("div");
    el.className = "custom-marker";
    el.style.backgroundImage = "url(/puredepin.png)";
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.backgroundSize = "100%";

    await extractData();

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    map = new mapboxgl.Map({
      container: "map",
      style: {
        version: 8,
        sources: {
          "mars-tiles": {
            type: "raster",
            tiles: [mars_url],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "mars-tiles",
            type: "raster",
            source: "mars-tiles",
            minzoom: 0,
            maxzoom: 10,
          },
        ],
      },
      center: [0, 0],
      zoom: startZoom,
      maxZoom: maxZoom,
    });

    const deckOverlay = new MapboxOverlay({
      layers: [
        new HexagonLayer({
          id: "hexagon-layer",
          data: minerLocations,
          radius: 200000,
          elevationScale: 4,
          extruded: false,
          pickable: true,
          getPosition: (d) => d.coordinates,
          opacity: 0.6,
          coverage: 0.8,
          getColorWeight: (points) =>
            parseFloat(points.score) -
            (parseFloat(points.rank) <= 0 ? 0.00001 : 0.0),
          colorAggregation: "SUM",
          colorRange: [
            [162, 162, 162],
            [252, 142, 172],
            [228, 128, 155],
            [204, 114, 138],
            [180, 100, 121],
            //[156, 86, 104],
            //[132, 72, 87],
            //[108, 58, 70],
          ],
          colorDomain: [-1, 5],
          onHover: ({ object }) => {
            const hexHoverInfo = document.getElementById("hexHoverInfo");
            if (object) {
              hexHoverInfo.style.display = "block";
              hexHoverInfo.innerHTML = `MINERS IN HEX: ${object.points.length}`;
              map.getCanvas().style.cursor = "pointer";
            } else {
              hexHoverInfo.style.display = "none";
              map.getCanvas().style.cursor = "grab";
            }
          },
          onClick: ({ object }) => {
            if (object) {
              hexInfo = object.points;
            } else {
              hexInfo = [];
            }
          },
        }),
      ],
    });

    map.on("zoomend", () => {
      if (map.getZoom() <= 4 && marker) {
        marker.remove();
      }
    });

    map.setMaxBounds([
      [-180, -85],
      [180, 85],
    ]);

    map.addControl(deckOverlay);
  });

  const searchMiner = () => {
    const miner = minerLocations.find((m) => m.name === minerInput.trim());

    if (miner) {
      map.flyTo({
        center: miner.coordinates,
        zoom: 5,
        speed: 1.5,
        curve: 1,
      });

      if (marker) {
        marker.remove();
      }
      marker = new mapboxgl.Marker(el).setLngLat(miner.coordinates).addTo(map);
      // Ensure marker is on top by setting a higher z-index
      const markerElement = marker.getElement();
      markerElement.style.zIndex = "999";
    } else {
      const hexHoverInfo = document.getElementById("hexHoverInfo");
      hexHoverInfo.style.display = "block";
      hexHoverInfo.innerHTML = `NO SUCH MINER`;
    }
  };
</script>

<div class="absolute inset-0 z-0 bg-bground w-full h-full min-h-[1000px]"></div>
<div class="h-8"></div>
<div class="flex justify-around w-full z-30 mt-16 mb-6">
  <div class="w-[calc(100%-100px)] max-w-[833px]">
    <div
      class="grid grid-col-1 place-items-center text-white text-xs sm:text-sm tracking-wider font-sans"
    >
      <div class="flex flex-row">
        {#if price > 0}
          <InfoPair label="MKT CAP" desc="${mktCap} million" />
        {/if}
        <InfoPair label="CIRCULATING" desc="{circulatingFormatted} million" />
        <InfoPair label="MINED" desc="{mintedFormatted} million" />
      </div>
      <div class="flex flex-row">
        {#if price > 0}
          <InfoPair label="FDV (est)" desc="${estFDV} million" />
        {/if}
        <InfoPair label="NTWK REVENUE" desc="$0" />
        <InfoPair label="BURNED" desc="{burnedFormatted} million" />
      </div>
      <div class="flex flex-row">
        <InfoPair label="DAILY MINT" desc="76 million" />
        {#if price > 0}
          <InfoPair label="MEDIAN EARN" desc="${estEarn} per day" />
        {/if}
        <InfoPair label="REMAINING" desc="{remainingPercent}%" />
      </div>
    </div>
    <div class="h-4"></div>
    <div
      id="mapContainer"
      class="w-full h-[469px] relative border border-white shadow-md"
    >
      <div id="map" class="w-full h-[469px]"></div>
      <div id="hexHoverInfo"></div>
    </div>
    <div class="w-full ml-4 mt-2">
      <form on:submit|preventDefault={searchMiner} class="flex items-center">
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass pr-2"></i>
        </button>
        <input
          bind:value={minerInput}
          type="text"
          placeholder=""
          class="bg-transparent border-b-2 border-white outline-none text-xs sm:text-sm text-white tracking-wider placeholder-white transition duration-300 w-[calc(100%-100px)] max-w-xs"
        />
      </form>
    </div>
  </div>
</div>
<div class="flex-grow items-center mt-4">
  {#if hexInfo}
    {#each hexInfo as hex}
      <div class="hex-info mt-1">
        {#if hex.source.ranking > 0}
          <LabelPair
            label="{hex.source.name}:"
            desc="#{hex.source.ranking} (score {hex.source.score})"
          />
        {:else}
          <LabelPair label="{hex.source.name}:" desc="unranked" />
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  #hexHoverInfo {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(252, 142, 172, 0.5);
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: none;
    font-size: small;
    z-index: 100;
    pointer-events: none;
  }
</style>
