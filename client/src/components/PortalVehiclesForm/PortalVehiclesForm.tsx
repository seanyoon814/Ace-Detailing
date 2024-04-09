import "./PortalVehiclesForm.css";

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

function PortalVehiclesForm() {

    const [users, setUsers] = useState([]);
    const [files, setFiles] = useState<File[]>([]);

    const navigate = useNavigate();

    const token = useSelector(selectCurrentToken);
    const [sendCheckToken] = useCheckTokenMutation();
    const [sendLogout, { isError }] = useSendLogoutMutation();
    const maxRetryAttempts = 1;
    
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

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("vehicle", getVehicleString(formData));
        
        for (const key of ["make", "model", "series", "year"]) {
            if (!formData.has(key)) continue;

            formData.delete(key);
        }

        for (const file of files) {
            formData.append("images", file);
        }

        if (!isValidForm(formData)) {
            return;
        }

        authRequest(
            formData,
            token,
            0, 
            async (formData, token) => {
                await axios.post(`${apiUrl}/vehicles`, formData, {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });

                toast.success("Vehicle added successfully.");
            }
        );
    }

    function isValidForm(formData: FormData): boolean {
        let valid = true;

        if (!formData.get("stockNumber")) {
            valid = false;
            toast.error("Please provide a stock number.");
        }
        if (!formData.get("vehicle")) {
            valid = false;
            toast.error("Please provide a make, model, series and/or year.");
        }
        if (!formData.has("userId") || !formData.get("userId")) {
            valid = false;
            toast.error("Please select a user.");
        }

        return valid;
    }

    function getVehicleString(formData: FormData): string {
        let vehicle = ""

        for (const key of ["make", "model", "series", "year"]) {
            if (!formData.has(key) || !formData.get(key)) continue;

            vehicle += (vehicle ? " " : "") + formData.get(key);
        }

        return vehicle;
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

    useEffect(() => {authRequest(
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
        }
    );
    }, []);

    return (
        <>
            <div>
                <h3>Create New Vehicle</h3>
            </div>
            <form className="vehicles-form" onSubmit={submitForm}  encType="multipart/form-data">
                <h3>Vehicle Information</h3>
                <div>
                    <div>
                        <label>User</label>
                        <select name="userId">
                            {
                                users.map((user) => <option value={user._id}>{user.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label>Stock Number</label>
                        <input type="text" name="stockNumber" />
                    </div>
                    <div>
                        <label>Make</label>
                        <input type="text" name="make" />
                    </div>
                    <div>
                        <label>Model</label>
                        <input type="text" name="model" />
                    </div>
                    <div>
                        <label>Series</label>
                        <input type="text" name="series" />
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" name="year" />
                    </div>
                </div>
                <h3>Notes</h3>
                <textarea name="notes" />
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

export default PortalVehiclesForm;