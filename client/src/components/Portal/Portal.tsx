import "./Portal.css";

import PortalSidebar from "../PortalSidebar/PortalSidebar";
import { useState } from "react";

function Portal() {
    
    const [page, setPage] = useState("Dashboard");
    
    return (
        <div className="portal">
            <PortalSidebar page={page} setPage={setPage} />
            <main>
                { /* conditionally display pages */ }
            </main>
        </div>
    );
}

export default Portal;