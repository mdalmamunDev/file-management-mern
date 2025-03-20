import React from "react";
import { Plus } from "react-bootstrap-icons";


export default () => {
    return (
        <div className="position-fixed" style={{ bottom: 20, right: 20 }}>
            <button className="btn btn-primary rounded-circle p-2">
                <Plus size={30} className="text-white" title="Add File" />
            </button>
        </div>
    );
};