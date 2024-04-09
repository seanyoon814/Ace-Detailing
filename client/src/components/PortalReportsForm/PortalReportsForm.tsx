import "./PortalReportsForm.css";

import axios from "axios";
import backend from "../../constants/backend";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useCheckTokenMutation } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"; 
import { store } from "../../store";

const { apiUrl } = backend;

function PortalReportsForm() {

    const navigate = useNavigate();

    const token = useSelector(selectCurrentToken);
    const [sendCheckToken] = useCheckTokenMutation();
    const [sendLogout, { isError }] = useSendLogoutMutation();
    const maxRetryAttempts = 1;

    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState(1);

    const [files, setFiles] = useState<File[]>([]);

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const services = getServices();

        formData.append("services", JSON.stringify(services));
        files.map((file) => formData.append("images", file));

        if (!isValidForm(formData)) {
            return;
        }

        authRequest(
            formData,
            token,
            0, 
            async (formData, token) => {
                await axios.post(`${apiUrl}/reports`, formData, {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });

                toast.success("Report added successfully.");
            }
        );
    }

    function getServices(): any[] {
        return [...Array(services).keys()].map((i) => {
            return {
                name: document.getElementById(`name-${i}`).value,
                price: document.getElementById(`price-${i}`).value,
                reason: document.getElementById(`reason-${i}`).value,
            }
        });
    }

    function isValidForm(formData: FormData): boolean {
        let valid = true;

        if (!formData.get("vehicleId")) {
            valid = false;
            toast.error("Please select a vehicle.");
        }
        if (!formData.has("userId") || !formData.get("userId")) {
            valid = false;
            toast.error("Please select a user.");
        }

        return valid;
    }

    function handleChange(fileList: FileList) {
        const newFiles = Array.from(fileList);
        setFiles([...Array.from(files), ...newFiles]);
    }

    function removeFile(e: Event, file: File) {
        e.preventDefault();

        const index = files.indexOf(file);
        setFiles([...files.slice(0, index), ...files.slice(index + 1, files.length)]);
    }

    useEffect(() => {
        authRequest(
            null,
            token,
            0, 
            async (formData, token) => {
                const res = await axios.get(`${apiUrl}/user/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setUsers(res.data);
                setUser(res.data[0]._id);
            }
        );
    }, []);

    useEffect(() => {
        if (!user) return;

        authRequest(
            null,
            token,
            0, 
            async (formData, token) => {
                const res = await axios.get(`${apiUrl}/vehicles?userId=${user}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setVehicles(res.data);
            }
        );
    }, [user]);

    async function authRequest(formData: FormData , token: string, retries: number, cb: Promise<boolean>) {
        try {
            await sendCheckToken(token);
            cb(formData, token);
        }
        catch (error) {
            if (error.response && error.response.status === 403 && retries < maxRetryAttempts){
                const newToken = selectCurrentToken(store.getState());
                authRequest(formData, newToken, retries + 1, cb);
            } else {
                toast.error("Login Expired. Redirecting to login page...")
                sendLogout();
                navigate('/user');
            }
        }
    }

    return (
        <>
            <div>
                <h3>Create New Report</h3>
            </div>
            <form className="create-form reports-form" onSubmit={submitForm}  encType="multipart/form-data">
                <h3>Vehicle Information</h3>
                <div>
                    <div>
                        <label>User</label>
                        <select name="userId" onChange={(e) => setUser(e.target.value)}>
                            {
                                users.map((user) => <option value={user._id}>{user.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label>Stock Number</label>
                        <select name="vehicleId">
                            {
                                vehicles.map((vehicle) => <option value={vehicle._id}>{`${vehicle.stockNumber} (${vehicle.vehicle})`}</option>)
                            }
                        </select>
                    </div>
                </div>
                <h3>Services</h3>
                <div id="services">
                    {
                        [...Array(services).keys()].map((i) => (
                            <div className="service-row" key={i}>
                                <div>
                                    <label>Name</label>
                                    <input type="text"id={`name-${i}`} />
                                </div>
                                <div>
                                    <label>Price</label>
                                    <input type="number" id={`price-${i}`} />
                                </div>
                                <div>
                                    <label>Reason</label>
                                    <input type="text" id={`reason-${i}`} />
                                </div>
                            </div>
                        ))
                    }
                    <button type="button" onClick={() => setServices(services + 1)}>+ Click here to add another service</button>
                </div>
                <h3>Upload Images</h3>
                <div className="images-container">
                    {
                        files.map(file => 
                            <div key={file.name}>
                                <button onClick={(e) => removeFile(e, file)}>x</button>
                                {file.name}
                            </div>
                        )
                    }
                </div>
                <FileUploader
                    id="upload"
                    handleChange={handleChange}
                    types={["JPG", "PNG"]}
                    multiple
                    children
                >
                    <span>Click to select a file or drag it</span>
                </FileUploader>
                <button>Create</button>
            </form>
        </>
    );
}

export default PortalReportsForm;