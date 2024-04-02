import "./PortalVehicles.css";

function PortalVehicles() {

    return (
        <>
            <div>
                <h3>Vehicles</h3>
                <button>CREATE NEW</button>
            </div>
            <section className="vehicle-filter">
                <div>
                    <label>Stock Number</label>
                    <input id="stockNumber" placeholder="Search for stock number"></input>
                </div>
                <div>
                    <label>Vehicle</label>
                    <input id="vehicle" placeholder="Search for make, model, year, etc."></input>
                </div>
                <div>
                    <label>Status</label>
                    <select id="status">
                        <option selected>All</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div>
                    <label>Placeholder</label>
                    <button>FILTER</button>
                </div>
            </section>
            <section>
                <table>

                </table>
            </section>
            +
        </>
    );
}

export default PortalVehicles;