import React, { useRef } from "react";
import { Plus } from "react-bootstrap-icons";
import axios from "axios";

export default function FloatingActionButton() {
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
            const response = await axios.post("http://localhost:3000/api/items", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            console.log("Upload successful:", response.data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload file.");
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
                    <a className="dropdown-item" href="#">Create Folder</a>
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
