import "./PortalSidebar.css"

function PortalSidebar({ page, setPage }: { page: string, setPage: Function}) {

    const browseItems = ["Dashboard", "Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users"];

    // todo: add icons to left of buttons

    return (
        <nav className="portal-sidebar">
            <div>
                <header>User</header>
                <div>Browse</div>
                {
                    browseItems.map(item =>
                        <button
                            className={page === item ? "selected" : ""}
                            onClick={() => setPage(item)}
                        >
                            {item}
                        </button>
                    )
                }
                <div>Administration</div>
                {
                    adminItems.map(item =>
                        <button
                            className={page === item ? "selected" : ""}
                            onClick={() => setPage(item)}
                        >
                            {item}
                        </button>
                    )
                }
            </div>
            <button>Log out</button> 
        </nav>
    );
}

export default PortalSidebar;