import React from "react";
import { Plus } from "react-bootstrap-icons";

export default () => {
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
                <div className="dropdown-menu" style={{
                    display: 'block',
                    position: 'absolute',
                    right: 30,
                    bottom: 30,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <a className="dropdown-item" href="#">Create Folder</a>
                    <a className="dropdown-item" href="#">Upload File</a>
                </div>
            </details>
        </div>
    );
};
