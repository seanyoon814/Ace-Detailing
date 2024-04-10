import "./PortalNotifications.css";
import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import backend from "../../constants/backend";
import { store } from "../../store";
import { selectCurrentToken } from "../../features/auth/authSlice";

const { apiUrl, clientUrl } = backend;
const token = selectCurrentToken(store.getState());

function PortalNotifications( { setPage, setReportId } : { setPage: Function, setReportId: Function }) {

    const user = useAuth();
    var loaded = false;

    useEffect(() => { if (loaded) return;

        getReports();
        loaded = true;

    }, [])

    async function getReports() {
        const result = await axios.get(`${apiUrl}/notifications/reports/${user.id}`, { headers : { Authorization : `Bearer ${token}`}});
        var div = document.getElementById("PortalNotifications");
        for (var notification of result.data) {
            var button = document.createElement("button");
            button.innerHTML = "new Report, click to view";
            button.addEventListener("click", () => {
                setReportId(notification.reportId);
                setPage("View-Report");
            })
            div!.appendChild(button);
        }
    }

    return (
        <div id = "PortalNotifications">
        </div>
    )
}

export default PortalNotifications;