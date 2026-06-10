import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { changeSelectedDate } from "../features/JournalMoodSlice";
import { useDispatch } from "react-redux";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate date parameters
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeSelectedDate(format(selectedDate, "yyyy-MM-dd")));
  }, [selectedDate]);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition"
          >
            &larr;
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center font-medium text-xs text-gray-400 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <button
              key={idx}
              onClick={() => isCurrentMonth && setSelectedDate(day)}
              disabled={!isCurrentMonth}
              className={`
                h-10 w-10 mx-auto flex items-center justify-center text-sm rounded-full transition-all
                ${!isCurrentMonth ? "text-gray-200 cursor-not-allowed" : ""}
                ${isCurrentMonth && !isSelected ? "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600" : ""}
                ${isSelected ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-200" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
