import { useEffect } from "react";
import "./PortalSidebar.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
function PortalSidebar({ page, setPage, setSubPage }: { page: string, setPage: Function, setSubPage: Function }) {
    const browseItems = ["Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users", "Blog"];
    
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
                            className={page.includes(item) ? "selected" : ""}
                            onClick = { () => {
                                updatePage(item);
                                switch (item) {
                                    case "Users":
                                        window.location.href = "/portal/user/register";
                                        break;
                                }
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