import "./Portal.css";

import PortalSidebar from "../PortalSidebar/PortalSidebar";
import PortalVehicles from "../PortalVehicles/PortalVehicles";
import PortalBlog from "../PortalBlog/PortalBlog";
import { useState } from "react";

function Portal() {

    const browseItems = ["Dashboard", "Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users", "Blog"];
    const [page, setPage] = useState(browseItems[0]);


    function getPageComponent(page: string): JSX.Element {
        switch (page) {
            case "Vehicles":
                return (<PortalVehicles />)
            case "Blog":
                return (<PortalBlog />)
            default:
                return (<></>);
        }
    }

    function getPageCategory(page: string): string {
        return browseItems.includes(page) ? "Browse" : "Admin";
    }
    
    return (
        <div className="portal instrument-sans">
            <PortalSidebar
                page={page}
                setPage={setPage}
                browseItems={browseItems}
                adminItems={adminItems}
            />
            <main>
                <header>{`${getPageCategory(page)} > ${page}`}</header>
                { getPageComponent(page) }
            </main>
        </div>
    );
}

export default Portal;