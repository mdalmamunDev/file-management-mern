import React, { useState } from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export default () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today.getDate());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    
    const handleMonthChange = (step) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + step);
        setCurrentDate(newDate);
        setSelectedDate(null);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const nextMonthDays = (firstDayOfMonth + daysInMonth) % 7 === 0 ? 0 : 7 - ((firstDayOfMonth + daysInMonth) % 7);
    
    return (
        <div>
            <Header />
            <div className="container-fluid p-4">
                <BreadcrumbNavigation item="Calendar" />
                <div className="bg-light mx-auto mb-3" style={{ maxWidth: 400, minHeight: 400 }}>
                    <h4 className="text-center">Calendar</h4>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <ChevronLeft onClick={() => handleMonthChange(-1)} role="button" />
                        <span>{monthNames[month]} {year}</span>
                        <ChevronRight onClick={() => handleMonthChange(1)} role="button" />
                    </div>
                    <div className="d-flex text-center fw-bold border-bottom pb-2">
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className="flex-fill">{day}</div>
                        ))}
                    </div>
                    <div className="d-flex flex-wrap">
                        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                            <div key={index} className="flex-fill text-muted" style={{ width: "14.2%" }}></div>
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, index) => (
                            <div
                                key={index}
                                className={`flex-fill text-center py-2 ${selectedDate === index + 1 ? "bg-primary text-white" : ""}`}
                                style={{ width: "14.2%", cursor: "pointer" }}
                                onClick={() => setSelectedDate(index + 1)}
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

                <div className="mt-5 d-flex justify-content-between align-items-center">
                    <h5 className="mt-4">Items From:</h5>
                    <span>{year}-{String(month + 1).padStart(2, '0')}-{String(selectedDate).padStart(2, '0')}</span>
                </div>
                <ItemList query={`?group=calendar&date=${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`} />
            </div>
        </div>
    );
};
