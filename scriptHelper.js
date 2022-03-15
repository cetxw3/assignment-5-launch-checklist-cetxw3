// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
        `
    return `Name: ${name}, Diameter: ${diameter}, Star: ${star}, Distance from Earth: ${distance}, Number of Moons: ${moons}, Image URL: "${imageUrl}"`;
}

function validateInput(testInput) {
    if(testInput === "") {
        return "Empty";
    } 
    if(isNaN(testInput)) {
      return "Not a Number";
    }
    if(!isNaN(testInput)) {
      return "Is a Number";
    }  
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {    
    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required.");
        return false;
    }else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Pilot Name and/or Copilot Name must be entered as text only.");
        return false;
    } else if(validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Fuel Level and Cargo Mass must be entered as numbers only.");
        return false;
    } 
    
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    let launchStatusText = document.getElementById("launchStatus");
    let launchStatusStyle = document.querySelector("#launchStatus");
    
    pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
    copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
    
    if(fuelLevel < 10000 && cargoLevel > 10000) {
        launchStatusText.textContent = "Shuttle not ready for launch";
        launchStatusStyle.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        fuelStatus.textContent = `Fuel level insufficient for launch`;
        cargoStatus.textContent = `Cargo mass too high for launch`;
        return false;
    } else if(fuelLevel < 10000) {
        launchStatusText.innerText = "Shuttle not ready for launch";
        launchStatusStyle.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        fuelStatus.textContent = `Fuel level insufficient for launch`;
        return false;
    } else if(cargoLevel > 10000) {
        launchStatusText.innerText = "Shuttle not ready for launch";
        launchStatusStyle.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        cargoStatus.textContent = `Cargo mass too high for launch`;
        return false;
    } else {
        launchStatusText.textContent = "Shuttle is ready for launch";
        launchStatusStyle.style.color = "green";
        list.style.visibility = "hidden";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    for(let i = 0; i < planets.length; i++) {
        let num = Math.floor(Math.random() * planets.length);
        return planets[num];
    }
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
