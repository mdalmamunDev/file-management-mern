import React from "react";
import { Folder, FileEarmark, Film, FileText, Clock, ThreeDotsVertical } from "react-bootstrap-icons";

const recentItems = [
    { name: "Presentation.pptx", time: "10 mins ago", icon: <FileEarmark size={30} className="text-primary" /> },
    { name: "Notes.txt", time: "1 hour ago", icon: <FileText size={30} className="text-secondary" /> },
    { name: "Project.zip", time: "Yesterday", icon: <Folder size={30} className="text-warning" /> },
    { name: "Movie.mp4", time: "Yesterday", icon: <Film size={30} className="text-danger" /> },
    { name: "Presentation.pptx", time: "10 mins ago", icon: <FileEarmark size={30} className="text-primary" /> },
    { name: "Notes.txt", time: "1 hour ago", icon: <FileText size={30} className="text-secondary" /> },
    { name: "Project.zip", time: "Yesterday", icon: <Folder size={30} className="text-warning" /> },
    { name: "Movie.mp4", time: "Yesterday", icon: <Film size={30} className="text-danger" /> },
    { name: "Presentation.pptx", time: "10 mins ago", icon: <FileEarmark size={30} className="text-primary" /> },
    { name: "Notes.txt", time: "1 hour ago", icon: <FileText size={30} className="text-secondary" /> },
    { name: "Project.zip", time: "Yesterday", icon: <Folder size={30} className="text-warning" /> },
    { name: "Movie.mp4", time: "Yesterday", icon: <Film size={30} className="text-danger" /> },
    { name: "Presentation.pptx", time: "10 mins ago", icon: <FileEarmark size={30} className="text-primary" /> },
    { name: "Notes.txt", time: "1 hour ago", icon: <FileText size={30} className="text-secondary" /> },
    { name: "Project.zip", time: "Yesterday", icon: <Folder size={30} className="text-warning" /> },
    { name: "Movie.mp4", time: "Yesterday", icon: <Film size={30} className="text-danger" /> },
    { name: "Presentation.pptx", time: "10 mins ago", icon: <FileEarmark size={30} className="text-primary" /> },
    { name: "Notes.txt", time: "1 hour ago", icon: <FileText size={30} className="text-secondary" /> },
    { name: "Project.zip", time: "Yesterday", icon: <Folder size={30} className="text-warning" /> },
    { name: "Movie.mp4", time: "Yesterday", icon: <Film size={30} className="text-danger" /> },
];

export default () => {
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1">
            {recentItems.map((item, index) => (
                <div key={index} className="col">
                    <div className="card p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            {item.icon}
                            <div className="ms-2">
                                <h6 className="mb-0">{item.name}</h6>
                                <small className="text-muted">
                                    <Clock size={16} className="me-1" />
                                    {item.time}
                                </small>
                            </div>
                        </div>
                        <details className="dropdown">
                            <summary className="btn p-1 border-0 bg-transparent text-black">
                                <ThreeDotsVertical size={20} />
                            </summary>
                            <div className="dropdown-menu show position-absolute end-0 mt-1 p-2 shadow-sm rounded">
                                <a className="dropdown-item" href="#">Favorite</a>
                                <a className="dropdown-item" href="#">Rename</a>
                                <a className="dropdown-item" href="#">Copy</a>
                                <a className="dropdown-item text-danger" href="#">Delete</a>
                            </div>
                        </details>
                    </div>
                </div>
            ))}
        </div>
    );
};