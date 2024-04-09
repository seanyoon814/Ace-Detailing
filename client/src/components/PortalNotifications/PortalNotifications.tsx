import "./PortalNotifications.css";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import httpClient from "../../features/httpClient";
import backend from "../../constants/backend";

const { apiUrl, clientUrl } = backend;

function PortalNotifications() {

    const user = useAuth();

    useEffect(() => {
        console.log("use")
        // getReports();
        if (user.admin) {
            getVehicles();
        }
    }, [])

    async function getVehicles(){
        const result: any = await httpClient.get(`${apiUrl}/vehicles`);
        var div = document.getElementById("PortalNotifications");


        for (var vehicle of result.data) {
            if (vehicle.approved == false) {
                var button = document.createElement("button");
                button.innerHTML = `${vehicle.vehicle}`;
                div!.appendChild(button);
            }
        }
    }

    async function getReports() {
        const result1: any = await httpClient.get(`${apiUrl}/reports`);
        const result2: any = await httpClient.get(`${apiUrl}/user/api/getObjectId/${user.id}`);
        const reports = result1.data;
        const userId = result2.data;
        console.log(userId);
        console.log(reports);
        for (var report of reports) {
            if (report.userId == userId) {
                console.log(report);
            }
        }
    }

    return (
        <div id = "PortalNotifications">
        </div>
    )
}

export default PortalNotifications;