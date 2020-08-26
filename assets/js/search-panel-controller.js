// Search panels & their buttons
var server_search = document.getElementById("server-search");
var server_select = document.getElementById("server-select");
var player_search = document.getElementById("player-search");
var player_select = document.getElementById("player-select");

// Tracker of current mode
var mode = "server";

// For setting the active search mode
function setSearchMode(_mode) {
  // Strip button styles
  server_select.classList.remove("btn-info");
  server_select.classList.remove("btn-light");
  player_select.classList.remove("btn-info");
  player_select.classList.remove("btn-light");

  // Handle hiding and showing panels
  if (_mode == "player") {
    server_search.classList.add("hidden");
    server_select.classList.add("btn-light");
    player_search.classList.remove("hidden");
    player_select.classList.add("btn-info");
  } else {
    player_search.classList.add("hidden");
    player_select.classList.add("btn-light");
    server_search.classList.remove("hidden");
    server_select.classList.add("btn-info");
  }

  // Set page mode
  mode = _mode;
}

function search() {
  // Handle correct mode, fetch data, and redirect

  if (mode == "player") {
    // Get player to look up
    var player = document.getElementById("player-name").value;

    // Make the name safe
    player = encodeURIComponent(player);

    // Redirect to the player page
    document.location = "/player?p=" + player;
  } else {
    // Get the server domain and IP
    var domain = document.getElementById("server-ip").value;
    var port = document.getElementById("server-port").value;

    // Construct address
    var address = encodeURIComponent(domain) + ":" + port;

    // Redirect to the server page
    document.location = "/server?s=" + address;
  }
}
