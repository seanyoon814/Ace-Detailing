import "./PortalVehiclesForm.css";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function PortalVehiclesForm() {

    const [files, setFiles] = useState([]);

    function handleChange(fileList) {
        setFiles([...Array.from(files), ...Array.from(fileList)]);
        console.log(files);
    }

    return (
        <div>
            <div>
                <h3>Create New Vehicle</h3>
            </div>
            <form className="vehicles-form">
                <h3>Vehicle Information</h3>
                <div>
                    <div>
                        <label>Stock Number</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Make</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Model</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Series</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" />
                    </div>
                </div>
                <h3>Uploaded Images</h3>
                <div className="images-container">
                    {
                        files.map(file => 
                            <div>
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
        </div>
    );
}

export default PortalVehiclesForm;