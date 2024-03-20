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
                            onClick = { () => {
                                setPage(item);
                                switch(item) {
                                    case "Vehicles":
                                        window.location.href = "/portal/vehicles";
                                        break;
                                }
                            }}
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
                            onClick = { () => {
                                setPage(item);
                                switch (item) {
                                    case "Users":
                                        window.location.href = "/user/register";
                                        break;
                                }
                            }}
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