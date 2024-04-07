import { useEffect } from "react";
import "./PortalSidebar.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
function PortalSidebar({ page, setPage }: { page: string, setPage: Function}) {
    const browseItems = ["Dashboard", "Vehicles", "Notifications"];
    const adminItems = ["Reports", "Users"];
    
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
                            className={page === item ? "selected" : ""}
                            onClick = { () => {
                                setPage(item);
                                switch (item) {
                                    case "Users":
                                        // window.location.href = "/portal/user/register";
                                        // break;
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