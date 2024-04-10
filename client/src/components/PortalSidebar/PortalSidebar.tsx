import { useEffect, useState } from "react";
import "./PortalSidebar.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
// import checkAdmin from "../../features/auth/checkAdmin";
import useAuth from '../../hooks/useAuth';
function PortalSidebar({ page, setPage, setSubPage }: { page: string, setPage: Function, setSubPage: Function }) {
    const browseItems = ["Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users", "Blog"];
    const {name, admin} = useAuth();
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
        // if(isMounted) {
            if(admin){
                // console.log(Array.from(document.getElementsByClassName("adminItems")));
                for (var item of Array.from(document.getElementsByClassName("adminItems"))) {
                    (item as HTMLElement).style.visibility = "visible";
                }
            }
        // }
            // checkAdmin(() => {
            //     console.log(Array.from(document.getElementsByClassName("adminItems")));
            //     for (var item of Array.from(document.getElementsByClassName("adminItems"))) {
            //         (item as HTMLElement).style.visibility = "visible";
            //     }
            // }, ()=> {})
        
    }, [])

    const onLogout = () => {
        toast.info("Logging out...");
        sendLogout();
        navigate('/user');
    };
    
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
                <header>
                    Ace Detailing<br/>
                </header>
                <div>Browse</div>
                {
                    browseItems.map(item =>
                        <button
                            key={item}
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
                            key={item}
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
            <div>
                <p style={{"color":"white", "margin": 0}}>Signed in as {name}</p>
                <button onClick={onLogout}>Log out</button> 
            </div>
        </nav>
    );
}

export default PortalSidebar;