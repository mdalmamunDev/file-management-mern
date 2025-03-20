import React, { useState } from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import ActionButton from "../comps/ActionButton";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";


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


    return (
        <div>
            {/* Header */}
            <Header />

            <div className="container-fluid p-4">
                {/* Breadcrumb Navigation */}
                <BreadcrumbNavigation item="Calander" />


                <div className="bg-light mx-auto mb-3" style={{ maxWidth: 400 }}>
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
                <ItemList />

                {/* Action Button */}
                <ActionButton />
            </div>
        </div>
    );
};