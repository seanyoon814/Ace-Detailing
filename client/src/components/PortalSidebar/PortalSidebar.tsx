import { useEffect, useState } from "react";
import "./PortalSidebar.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import checkAdmin from "../../features/auth/checkAdmin";

function PortalSidebar({ page, setPage, setSubPage }: { page: string, setPage: Function, setSubPage: Function }) {
    const browseItems = ["Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users", "Blog"];
    
    const [isMounted, setIsMounted] = useState(false);
    const navigate = useNavigate();
    
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            console.log("Logged out successfully");
            navigate('/user');
        }
    },[isSuccess, navigate]);

    // prevent checking admin when refreshing
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    })

    useEffect(() => {
        if (isMounted) {
            checkAdmin(() => {
                console.log(Array.from(document.getElementsByClassName("adminItems")));
                for (var item of Array.from(document.getElementsByClassName("adminItems"))) {
                    (item as HTMLElement).style.visibility = "visible";
                }
            }, ()=> {})
        }
    }, [isMounted])

    const onLogout = () => {
        toast.info("Logging out...");
        sendLogout()
    };
    
    // if (isLoading) return toast.info("Logging out...");

    if(isError){
        console.log("Error:", error);
        return <p>Error:{error.data?.message}</p>
    }
    // todo: add icons to left of buttons

    function updatePage(page: string) {
        setPage(page);
        setSubPage("");
    }

    return (
        <nav className="portal-sidebar">
            <div>
                <header>Ace Detailing</header>
                <div>Browse</div>
                {
                    browseItems.map(item =>
                        <button
                            className={page.includes(item) ? "selected" : ""}
                            onClick = {() => updatePage(item)}
                        >
                            {item}
                        </button>
                    )
                }
                <div className = "adminItems">Administration</div>
                {
                    adminItems.map(item =>
                        <button
                            className={page.includes(item) ? "selected adminItems" : "adminItems"}
                            onClick = { () => {
                                updatePage(item);
                            }}
                        >
                            {item}
                        </button>
                    )
                }
            </div>
            <button onClick={onLogout}>Log out</button> 
        </nav>
    );
}

export default PortalSidebar;