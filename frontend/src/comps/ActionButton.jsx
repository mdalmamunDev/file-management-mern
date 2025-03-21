import React, { useRef } from "react";
import { Plus } from "react-bootstrap-icons";
import axios from "axios";
import { useGlobal } from "../context/GlobalProvider";
import { useState } from "react";

export default function FloatingActionButton() {
    const { urlGenerate } = useGlobal();

    const [showCF, setShowCF] = useState(false);
    const [folderName, setFolderName] = useState("New Folder");

    const fileInputRef = useRef(null);

    // Function to trigger the hidden file input
    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    // Function to handle file selection and upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        // formData.append("user_id", null); // Replace with actual user ID
        formData.append("type", file.type);
        formData.append("size", file.size);

        try {
            const token = localStorage.getItem('token'); // Retrieve token
            const response = await axios.post(urlGenerate('api/items'), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}` // Attach token for authentication
                }
            });

            console.log("Upload successful:", response.data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload file.");
        }
    };

    // Function to handle file selection and upload
    const createFolder = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", folderName);
        formData.append("type", folderName);

        try {
            const token = localStorage.getItem('token'); // Retrieve token
            const response = await axios.post(urlGenerate('api/items/folders'), 
            {
                name: folderName,
            }
            , {
                headers: {
                    Authorization: `Bearer ${token}` // Attach token for authentication
                }
            });

            alert("Folder created");
        } catch (error) {
            alert("Failed to create folder.");
        }
    };

    return (
        <div className="position-fixed" style={{ bottom: 20, right: 20 }}>
            <details className="dropdown" style={{ position: "relative" }}>
                <summary
                    className="btn btn-secondary rounded-circle p-2"
                    style={{ cursor: "pointer" }}
                >
                    <Plus size={30} className="text-white" title="Add File" />
                </summary>

                {/* Dropdown menu */}
                <div className="dropdown-menu show" style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 40,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    {showCF &&
                        <form className="d-flex" onSubmit={createFolder}>
                            <input
                                className="form-control"
                                placeholder="Create Folder"
                                style={{ width: 200 }}
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit" >
                                Ok
                            </button>
                        </form>
                    }
                    {!showCF &&
                        <button className="dropdown-item" onClick={() => setShowCF(true)}>
                            Create Folder
                        </button>
                    }
                    <button className="dropdown-item" onClick={handleFileClick}>
                        Upload File
                    </button>
                </div>
            </details>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="d-none"
                onChange={handleFileChange}
            />
        </div>
    );
}
