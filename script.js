// Write your JavaScript code here!
window.addEventListener("load", function() {
  let pilotName = document.querySelector("input[name=pilotName]");
  let copilotName = document.querySelector("input[name=copilotName]");
  let fuelLevel = document.querySelector("input[name=fuelLevel]");
  let cargoWeight = document.querySelector("input[name=cargoWeight]");
  let form = document.getElementById("launchForm");
  let faultyItems = document.getElementById("faultyItems");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let launchStatus = document.getElementById("launchStatus");
  let missionTarget = document.getElementById("missionTarget");

  form.addEventListener("submit", function(event) {
    console.log(pilotName.value);

    if (
      pilotName.value === "" ||
      copilotName.value === "" ||
      fuelLevel.value === "" ||
      cargoWeight.value === ""
    ) {
      window.alert("All fields must be filled out");
      event.preventDefault();
    } else if (typeof pilotName.value !== "string" || !isNaN(pilotName.value)) {
      window.alert("You must enter a valid name for Pilot Name");
      event.preventDefault();
    } else if (
      typeof copilotName.value !== "string" ||
      !isNaN(copilotName.value)
    ) {
      window.alert("You must enter a valid name for Copilot Name");
      event.preventDefault();
    } else if (isNaN(fuelLevel.value) || isNaN(cargoWeight.value)) {
      window.alert(
        "You must enter a valid number for Fuel Level and Cargo Weight"
      );
      event.preventDefault();
    } else {
      event.preventDefault();
      faultyItems.style.visibility = "visible";
      pilotStatus.innerHTML = `${pilotName.value} Ready`;
      copilotStatus.innerHTML = `${copilotName.value} Ready`;
      if (fuelLevel.value < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
      } else if (cargoWeight.value > 10000) {
        cargoStatus.innerHTML = "Cargo weight too heavy for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
      } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo weight low enough for launch";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
      }
    }
  });

  const fetchPromise = fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );
  fetchPromise.then(function(response) {
    const jsonPromise = response.json();
     jsonPromise.then(function (json) {
        let jsonIndex = Math.floor(Math.random() * json.length);
      missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[jsonIndex].name}</li>
            <li>Diameter: ${json[jsonIndex].diameter}</li>
            <li>Star: ${json[jsonIndex].star}</li>
            <li>Distance from Earth: ${json[jsonIndex].distance}</li>
            <li>Number of Moons: ${json[jsonIndex].moons}</li>
         </ol>
         <img src="${json[jsonIndex].image}">`;
    });
  });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
