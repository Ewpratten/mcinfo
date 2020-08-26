// Parse a server's data, and push it all
function pushServerData(name, data) {
  // Set the server name
  document.getElementById("server-name").innerText = name.split(":")[0];

  // Set server description
  document.getElementById("server-desc").innerText = "";
  if (data.status.description.text) {
    document.getElementById("server-desc").innerText +=
      data.status.description.text + "\n";
  }
  if (data.status.description.extra) {
    data.status.description.extra.forEach((entry) => {
      document.getElementById("server-desc").innerText += " " + entry.text;
    });
  } else {
    document.getElementById("server-desc").innerText += data.status.description;
  }

  // Set server version
  document.getElementById("server-version-name").innerText =
    data.status.version.name;

  // Set player count
  document.getElementById("server-players-count").innerText =
    data.status.players.online + " / " + data.status.players.max;

  // Toggle the extra info based on server fillage
  if (data.status.players.online > 0 && data.status.players.sample.length > 0) {
    document
      .getElementById("server-only-with-players")
      .classList.remove("hidden");
  }

  // For every player, add them and their link to the list
  document.getElementById("players-list").innerHTML = "";
  data.status.players.sample.forEach((player) => {
    document.getElementById("players-list").innerHTML =
      '<a href="/player?p=' +
      player.name +
      '" class="list-group-item list-group-item-action">' +
      player.name +
      "</a>";
  });
}

// Show the server container
function showServerData() {
  // Hide the loader
  document.getElementById("loader").classList.add("hidden");

  // Show the playeDapibus ac facilisis inr info
  document.getElementById("server-info").classList.remove("hidden");
}

// Show the "not found" container
function showServerNotFound() {
  // Hide the loader
  document.getElementById("loader").classList.add("hidden");

  // Show the player info
  document.getElementById("server-not-found").classList.remove("hidden");
}

// Get the specified player
var server = new URLSearchParams(window.location.search).get("s");

if (server) {
  // Make an HTTP request
  const Http = new XMLHttpRequest();
  const url = API_ENDPOINT + "/minecraft/server/" + server;
  Http.open("GET", url);
  Http.send();

  // Handle response
  Http.onreadystatechange = (e) => {
    // Get response data
    var response;
    try {
      response = JSON.parse(Http.response);
    } catch (error) {
      return;
    }

    // Set all data
    if (response.success) {
      pushServerData(server, response);
      showServerData();
    } else {
      showServerNotFound();
    }
  };
} else {
  showServerNotFound();
}
