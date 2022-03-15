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
    pilotStatus.innerHTML = `
        <li id="pilotStatus" data-testid="pilotStatus">Pilot (${pilot}) Ready</li>
    `;
    let copilotStatus = document.getElementById("copilotStatus");
    copilotStatus.innerHTML = `
        <li id="copilotStatus" data-testid="copilotStatus">Co-pilot (${copilot}) Ready</li>
    `;

    let launchStatusText = document.getElementById("launchStatus");
    let launchStatusStyle = document.querySelector("#launchStatus");
    
    if(fuelLevel < 10000 && cargoLevel > 10000) {
        launchStatusText.innerText = "Shuttle not ready for launch";
        launchStatusStyle.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        list.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot <b>${pilot}</b> Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot <b>${copilot}</b> Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus" style="color:rgb(199, 37, 78);">Fuel level (${fuelLevel} L) insufficient for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus" style="color:rgb(199, 37, 78);">Cargo mass (${cargoLevel} kg) too high for launch</li>
            </ol>
        `;
        return false;
    } else if(fuelLevel < 10000) {
        launchStatusText.innerText = "Shuttle not ready for launch";
        launchStatusStyle.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        list.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot <b>${pilot}</b> Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot <b>${copilot}</b> Ready</li>    
                <li id="fuelStatus" data-testid="fuelStatus" style="color:rgb(199, 37, 78);">Fuel level (${fuelLevel} L) insufficient for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
            </ol>
        `;
        return false;
    } else if(cargoLevel > 10000) {
        launchStatusText.innerText = "Shuttle not ready for launch";
        launchStatusStyle.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        list.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot <b>${pilot}</b> Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot <b>${copilot}</b> Ready</li>     
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
                <li id="fuelStatus" data-testid="fuelStatus" style="color:rgb(199, 37, 78);">Cargo mass (${cargoLevel} kg) too high for launch</li>
            </ol>
        `;
        return false;
    } else {
        launchStatusText.innerText = "Shuttle is ready for launch";
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
