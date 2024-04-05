import { useEffect } from "react";
import "./PortalSidebar.css"
import backend from "../../constants/backend";

const { apiUrl, clientUrl } = backend;

function PortalSidebar(
        props: {
                page: string,
                setPage: Function,
                browseItems: string[],
                adminItems: string[] 
        }
    ) {

    const { page, setPage, browseItems, adminItems } = props;

    // remove admin components if not
    useEffect(() => {
        fetch(`${apiUrl}/user/api/check`, {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({ email : sessionStorage.getItem("email"), password : sessionStorage.getItem("password") })
        })
            .then(response => response.json())
            .then(data => {
                if (data.admin == undefined) {
                    window.location.href = `${clientUrl}/user`;
                }
                else if (data.admin == false) {
                    for (var element of Array.from(document.getElementsByClassName("adminItems"))) {
                        (element as HTMLElement).style.visibility = "hidden";
                    }
                }
            })
    })

    function logout() {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        window.location.href = `${clientUrl}/user`;
    }

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
                <div className = "adminItems">Administration</div>
                {
                    adminItems.map(item =>
                        <button
                            className={page === item ? "selected adminitems" : "adminItems"}
                            onClick = { () => setPage(item) }
                        >
                            {item}
                        </button>
                    )
                }
            </div>
            <button onClick = {logout}>Log out</button> 
        </nav>
    );
}

export default PortalSidebar;