import "./PortalSidebar.css"

function PortalSidebar(
        props: {
                page: string,
                setPage: Function,
                browseItems: string[],
                adminItems: string[] 
        }
    ) {

    const { page, setPage, browseItems, adminItems } = props;

    // todo: add icons to left of buttons

    return (
        <nav className="portal-sidebar">
            <div>
                <header>Ace Detailing</header>
                <div>Browse</div>
                {
                    browseItems.map(item =>
                        <button
                            className={page === item ? "selected" : ""}
                            onClick = {() => setPage(item)}
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
                            onClick = { () => setPage(item) }
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