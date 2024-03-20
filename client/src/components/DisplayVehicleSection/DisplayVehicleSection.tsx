import { useEffect } from "react";
import "./DisplayVehicleSection.css";

function DisplayVehicleSection() {

    useEffect(() => {

        fetch("http://localhost:5000/vehicles")
            .then(response => response.json())
            .then(vehicles => {
                const main = document.getElementsByTagName("main")[0];
                main.innerHTML = "";

                for (const vehicle of vehicles) {

                    var section = document.createElement("section");

                    for (const src of vehicle.imageUrls) {
                        var img = document.createElement("img");
                        img.src = src;
                        section.appendChild(img);
                    }

                    var elements = ["Make", "Model", "Series", "Year", "Notes"];
                    var table = document.createElement("table");

                    for (var field of elements) {
                        var tr = document.createElement("tr");
                        var key = document.createElement("td");
                        var value = document.createElement("td");

                        key.innerHTML = field + ":";
                        value.innerHTML = vehicle[field.toLowerCase()];
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
                <a href = "/portal">&#8592;Portal</a>
            </header>

            <h1>Vehicles</h1>
            
            <main>
            </main>
        
        </div>
    )

}

export default DisplayVehicleSection;