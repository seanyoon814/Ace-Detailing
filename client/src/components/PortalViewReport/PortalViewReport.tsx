import "./PortalViewReport.css";
import React, { useEffect } from "react";
import backend from "../../constants/backend";
import axios from "axios";
import { store } from "../../store";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const { apiUrl, clientUrl } = backend;
// const token = selectCurrentToken(store.getState());

function PortalViewReport( { reportId } : { reportId: string }) {

    const token = useSelector(selectCurrentToken);
    var loaded = false;
    var report: any;

    useEffect(() => { if (loaded) return;
        getReport();
        loaded = true;
    })

    async function getReport() {
        const result = await axios.get(`${apiUrl}/reports/${reportId}`, { headers : { Authorization : `Bearer ${token}`}});
        console.log(result.data);
        report = result.data;
        (getE("status")! as HTMLSelectElement).value = report.status;
        getE("stockNumber")!.innerHTML = report.stockNumber;
        getE("updatedAt")!.innerHTML = report.updatedAt;

        var services = getE("services");
        for (var i = 0; i < report.services.length; i ++) {
            var service = report.services[1];
            var span = document.createElement("span");
            var select = (document.createElement("select") as HTMLSelectElement);
            var option1 = (document.createElement("option") as HTMLOptionElement);
            var option2 = (document.createElement("option") as HTMLOptionElement);
            var option3 = (document.createElement("option") as HTMLOptionElement);

            option1.value = "PENDING";
            option2.value = "ACCEPTED";
            option3.value = "REJECTED";
            option1.innerHTML = "PENDING";
            option2.innerHTML = "ACCEPTED";
            option3.innerHTML = "REJECTED";
            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);
            select.value = service.status;
            select.id = `service${i+1}`;
            span.innerHTML = `${i+1}.  &nbsp;&nbsp;  Name: ${service.name}  &nbsp;&nbsp;  Price: ${service.price}  &nbsp;&nbsp;  Status: `;

            services!.appendChild(span);
            services!.appendChild(select);
            services!.appendChild(document.createElement("br"));
        }

        var images = getE("images");
        for (var url of report.imageUrls) {
            var img = document.createElement("img");
            img.src = url;
            images!.appendChild(img);
        }
    }

    async function change() {
        report.status = (getE("status") as HTMLSelectElement).value;
        if (getE("service1")) report.services[0].status = (getE("service1") as HTMLSelectElement).value;
        if (getE("service2")) report.services[1].status = (getE("service2") as HTMLSelectElement).value;
        if (getE("service3")) report.services[2].status = (getE("service3") as HTMLSelectElement).value;
        
        const result = await axios.post(`${apiUrl}/reports/change`, JSON.stringify(report), { headers : { Authorization : `Bearer ${token}`, "Content-Type" : "application/json"}});
        if (result.status == 204) {
            alert("Changed Report.");
        }
    }

    return (
        <>
            <div id = "PortalViewReport">
                <span>Status: </span>
                <select id = "status">
                    <option value = "PENDING">PENDING</option>
                    <option value = "ACCEPTED">ACCEPTED</option>
                    <option value = "REJECTED">REJECTED</option>
                </select><br></br>
                <span>Stock Number: </span><span id = "stockNumber"></span><br></br>
                <section id = "services">
                    <h3>Services:</h3>
                </section>
                <section id = "images"></section>
                <span>Updated At: </span><span id = "updatedAt"></span>

                <button onClick = {change}>Change</button>
            </div>
        </>
    )
}

function getE(id: string) {
    return document.getElementById(id);
}

export default PortalViewReport;