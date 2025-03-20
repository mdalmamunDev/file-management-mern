import React, { useState } from "react";
import { ChevronLeft, ChevronRight, FileEarmark, FileText,  Folder, Plus, Upload, Image, Film, MusicNote, House, Person, Clock, Lock, ThreeDots, ThreeDotsVertical, Heart, HeartFill} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handleMonthChange = (step) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + step);
        setCurrentDate(newDate);
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const totalDays = firstDayOfMonth + daysInMonth;
    const nextMonthDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

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

    return (
        <div className="container mt-4">

            <div className="bg-light mx-auto mb-3" style={{maxWidth: 400}}>
                {/* Calendar Header */}
                <h4 className="text-center">Calendar</h4>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <ChevronLeft onClick={() => handleMonthChange(-1)} role="button" />
                    <span>{monthNames[month]} {year}</span>
                    <ChevronRight onClick={() => handleMonthChange(1)} role="button" />
                </div>
                {/* Week Days */}
                <div className="d-flex text-center fw-bold border-bottom pb-2">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="flex-fill">{day}</div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="d-flex flex-wrap">
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={index} className="flex-fill text-muted" style={{ width: "14.2%" }}></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => (
                        <div
                            key={index}
                            className="flex-fill text-center py-2"
                            style={{ width: "14.2%" }}
                        >
                            {index + 1}
                        </div>
                    ))}
                      {Array.from({ length: nextMonthDays }).map((_, index) => (
                        <div key={index} className="flex-fill text-muted text-center py-2" style={{ width: "14.2%" }}>
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Items */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
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
        </div>
    );
};