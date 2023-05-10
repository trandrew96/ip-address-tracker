// All State data comes from user input (ip address) or API response from ipapi.co
let State = {
  ip: "8.8.8.8",
  latitude: 37.42301,
  location: "Mountain View, California 94043",
  longitude: -122.083352,
  timezone: "UTC -0700",
  country_name: "United States",
};

// Update "State" object using data fetched from API (ipapi.co)
async function setIPData(res) {
  console.log(res);
  State.ip = res.ip;
  State.location = `${res.city}, ${res.region} ${res.postal}`;
  State.timezone = `UTC ${res.utc_offset}`;
  State.country_name = res.country_name;
  State.latitude = res.latitude;
  State.longitude = res.longitude;
  console.log(State);
}

// Change HTML content using "State" data
function updateDOM() {
  document.getElementById("ip").innerHTML = State.ip;
  document.getElementById("location").innerHTML = State.location;
  document.getElementById("timezone").innerHTML = State.timezone;
  document.getElementById("country").innerHTML = State.country_name;
  map.setView([State.latitude, State.longitude], 13);
}

// Retrieve data related to IP address (ipapi.co)
async function fetchIPData(ip) {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const jsonData = await response.json();
  return jsonData;
}

// Procedure when ip address is submitted
async function handleSubmit(event) {
  event.preventDefault();

  let ip = document.getElementById("ip-field").value;
  const res = await fetchIPData(ip);

  setIPData(res);
  updateDOM();
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

// Grab the user's IP address on startup so we can fill the initial state with something
async function fetchUserIP() {
  const res = await fetch(`https://api.ipify.org?format=json`);
  const jsonData = await res.json();
  return jsonData.ip;
}

// Get some info about a placeholder IP address on startup
async function startup() {
  // const ip = await fetchUserIP();
  const ip = "8.8.8.8";
  console.log(ip);

  const res = await fetchIPData(ip);
  setIPData(res);

  updateDOM();
}

// startup();

// Leaflet
var map = L.map("map").setView([37.42301, -122.083352], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
