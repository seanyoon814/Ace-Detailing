import "./Portal.css";

import PortalSidebar from "../PortalSidebar/PortalSidebar";
import PortalVehicles from "../PortalVehicles/PortalVehicles";
import PortalVehiclesForm from "../PortalVehiclesForm/PortalVehiclesForm";
import PortalUsers from "../PortalUsers/PortalUsers";
import PortalBlog from "../PortalBlog/PortalBlog";
import PortalReports from "../PortalReports/PortalReports";
import { useState } from "react";

function Portal() {

    const browseItems = ["Dashboard", "Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users", "Blog"];
    const [page, setPage] = useState(browseItems[0]);
    const [subPage, setSubPage] = useState("");


    function getPageComponent(): JSX.Element {
        switch (page) {
            case "Blog":
                return (<PortalBlog />)
            case "Reports":
                return (<PortalReports setPage={setPage} />)
            case "Users":
                return (<PortalUsers />)
            case "Vehicles":
                return <PortalVehicles setPage={setPage} />
            case "Vehicles-Create":
                return <PortalVehiclesForm />
            default:
                return (<></>);
        }
    }

    function getPageHeader(): string {
        let header;

        if (page.includes("-")) {
            const [selectedPage, subPage] = page.split("-");
            const category = browseItems.includes(selectedPage) ? "Browse" : "Admin";
            header = `${category} > ${selectedPage} > ${subPage}`
        }
        else {
            const category = browseItems.includes(page) ? "Browse" : "Admin";
            header = `${category} > ${page}`;
        }

        return header;
    }
    
    return (
        <div className="portal instrument-sans">
            <PortalSidebar
                page={page}
                setPage={setPage}
                setSubPage={setSubPage}
                browseItems={browseItems}
                adminItems={adminItems}
            />
            <main>
                <header>{getPageHeader()}</header>
                { getPageComponent() }
            </main>
        </div>
    );
}

export default Portal;