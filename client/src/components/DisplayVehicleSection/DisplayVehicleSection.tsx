import { useEffect } from "react";
import "./DisplayVehicleSection.css";
import backend from "../../constants/backend";

const { apiUrl, clientUrl } = backend;

function DisplayVehicleSection() {

    useEffect(() => {

        fetch(`${apiUrl}/vehicles`)
            .then(response => response.json())
            .then(vehicles => {

                const params = new URLSearchParams(window.location.search);
                const step = params.get("step");
                const stockNumber = params.get("stockNumber");
                const make = params.get("make");
                const model = params.get("model");
                const series = params.get("series");
                const year = params.get("year");

                const main = document.getElementsByTagName("main")[0];
                main.innerHTML = "";

                for (const vehicle of vehicles) {

                    if (step != null && step != vehicle.step.toLowerCase()) {
                        continue;
                    }
                    if (stockNumber != null && stockNumber != vehicle.stockNumber.toLowerCase()) {
                        continue;
                    }
                    if (make != null && make != vehicle.make.toLowerCase()) {
                        continue;
                    }
                    if (model != null && model != vehicle.model.toLowerCase()) {
                        continue;
                    }
                    if (series != null && series != vehicle.series.toLowerCase()) {
                        continue;
                    }
                    if (year != null && Number(year) != vehicle.year) {
                        continue;
                    }

                    var section = document.createElement("section");

                    for (const src of vehicle.imageUrls) {
                        var img = document.createElement("img");
                        img.src = src;
                        section.appendChild(img);
                    }

                    var names = ["Step", "Stock #", "Make", "Model", "Series", "Year", "Notes"];
                    var keys = ["step", "stockNumber", "make", "model", "series", "year", "notes"];
                    var table = document.createElement("table");

                    for (var i = 0; i < keys.length; i ++) {
                        var tr = document.createElement("tr");
                        var key = document.createElement("td");
                        var value = document.createElement("td");

                        key.innerHTML = names[i] + ":";
                        value.innerHTML = vehicle[keys[i]];
                        tr.appendChild(key);
                        tr.appendChild(value);
                        table.appendChild(tr);
                    }

                    section.appendChild(table);
                    main.appendChild(section);
                }

            });
    });

    return (
        <div className = "DisplayVehicleSection">

            <header>
                <a href = "/portal">&#8592; Portal</a>
                <br /><br /><br />
                <h2>Filter:</h2>
                
                <form onSubmit = {search}>
                    <table><tbody>
                        <tr>
                            <td>Step: </td>
                            <td><input id = "step" type = "text"/></td>
                        </tr>
                        <tr>
                            <td>Stock #: </td>
                            <td><input id = "stockNumber" type = "text"/></td>
                        </tr>
                        <tr>
                            <td>Make: </td>
                            <td><input id = "make" type = "text"/></td>
                        </tr>
                        <tr>
                            <td>Model: </td>
                            <td><input id = "model" type = "text"/></td>
                        </tr>
                        <tr>
                            <td>Series: </td>
                            <td><input id = "series" type = "text"/></td>
                        </tr>
                        <tr>
                            <td>Year: </td>
                            <td><input id = "year" type = "number"/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type = "submit">Search</button>
                                <br /><br />
                                <button type = "button" onClick = {reset}>Reset</button>
                                </td>
                        </tr>
                    </tbody></table>
                    
                </form>
                  
            </header>

            <h1>Vehicles</h1>
            
            <main>
            </main>
        
        </div>
    )

}

function search(event: any) {
    event.preventDefault();
    var step = getInput("step");
    var stockNumber = getInput("stockNumber");
    var make = getInput("make");
    var model = getInput("model");
    var series = getInput("series");
    var year = getInput("year");
    
    const params = new URLSearchParams();
    if (step.value != "") params.append("step", step.value.toLowerCase());
    if (stockNumber.value != "") params.append("stockNumber", stockNumber.value.toLowerCase());
    if (make.value != "") params.append("make", make.value.toLowerCase());
    if (model.value != "") params.append("model", model.value.toLowerCase());
    if (series.value != "") params.append("series", series.value.toLowerCase());
    if (year.value != "") params.append("year", year.value);
    window.location.href = `${clientUrl}/portal/vehicles?${params.toString()}`;
}

function reset(event: any) {
    event.preventDefault();
    window.location.href = `${clientUrl}/portal/vehicles`;
}

function getInput(id: string): HTMLInputElement {
    return document.getElementById(id) as HTMLInputElement;
}

export default DisplayVehicleSection;