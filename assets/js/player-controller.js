// For pushing a player's skin to the skinhead context
function pushPlayerSkin(skin) {}

// Parse a player's data, and push it all
function pushPlayerData(data) {
  // Set username
  document.getElementById("player-name").innerText = data.username;

  // Set UID
  document.getElementById("player-uid").innerText = data.uid;

  // Set status
  if (data.premium) {
    document.getElementById("player-premium").innerText = "True";
    document.getElementById("player-premium").classList.remove("badge-danger");
    document.getElementById("player-premium").classList.add("badge-success");
  }
  if (data.legacy) {
    document.getElementById("player-legacy").innerText = "True";
    document.getElementById("player-legacy").classList.remove("badge-success");
    document.getElementById("player-legacy").classList.add("badge-danger");
  }

  // Set name history
  document.getElementById("player-history").innerHTML = "";
  data.name_history.forEach((entry) => {
    // Add name
    var output =
      '<li class="list-group-item"> <div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
      entry.name;

    // If there is a date, add it too
    if (entry.changedToAt) {
      output +=
        "</h5><small>" +
        new Date(entry.changedToAt).toLocaleDateString("en-CA") +
        "</small>";
    }

    // Cap off the div
    document.getElementById("player-history").innerHTML += output + "</div></li>";
  });
}

// Show the player container
function showPlayerData() {
  // Hide the loader
  document.getElementById("loader").classList.add("hidden");

  // Show the player info
  document.getElementById("player-info").classList.remove("hidden");
}

// Show the "not found" container
function showPlayerNotFound() {
  // Hide the loader
  document.getElementById("loader").classList.add("hidden");

  // Show the player info
  document.getElementById("player-not-found").classList.remove("hidden");
}

// Get the specified player
var player = new URLSearchParams(window.location.search).get("p");

if (player) {
  // Make an HTTP request
  const Http = new XMLHttpRequest();
  const url = API_ENDPOINT + "/minecraft/user/" + player;
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
      pushPlayerData(response);
      showPlayerData();
    } else {
      showPlayerNotFound();
    }
  };
} else {
  showPlayerNotFound();
}
