import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  onClose?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  className,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(
    selectedDate
  );

  // Sync with external value changes
  useEffect(() => {
    const newDate = value ? new Date(value) : null;
    setSelectedDate(newDate);
    setTempSelectedDate(newDate);
  }, [value]);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  // Update currentMonth when tempSelectedDate changes (for navigation)
  useEffect(() => {
    if (tempSelectedDate) {
      setCurrentMonth(tempSelectedDate);
    }
  }, [tempSelectedDate]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    setTempSelectedDate(date);
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false); // Close calendar when date is selected
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month to fill the first week
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={clsx("relative", className)} ref={containerRef}>
      {/* Input Button */}
      <button
        type="button"
        onClick={() => {
          setTempSelectedDate(selectedDate);
          setIsOpen(!isOpen);
        }}
        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-primary-background placeholder-primary-background/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 flex items-center justify-between"
      >
        <span
          className={
            selectedDate || tempSelectedDate
              ? "text-primary-background"
              : "text-primary-background/50"
          }
        >
          {(isOpen ? tempSelectedDate : selectedDate)
            ? formatDisplayDate(isOpen ? tempSelectedDate : selectedDate)
            : placeholder}
        </span>
        <CalendarDaysIcon className="h-5 w-5 text-primary-background/70" />
      </button>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute z-[100] bottom-full mb-2 w-full bg-black/80 backdrop-blur-[5px] rounded-2xl border border-white/50 shadow-2xl p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 transition-all duration-200"
            >
              <ChevronLeftIcon className="h-4 w-4 text-primary-background" />
            </button>

            <h3 className="text-lg font-semibold text-primary-background">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>

            <button
              type="button"
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 transition-all duration-200"
            >
              <ChevronRightIcon className="h-4 w-4 text-primary-background" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-primary-background/70 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelected =
                tempSelectedDate &&
                day.toDateString() === tempSelectedDate.toDateString();
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={clsx(
                    "h-9 w-9 text-sm rounded-lg transition-all duration-200 flex items-center justify-center border",
                    {
                      "text-primary-background/30 border-transparent":
                        !isCurrentMonth,
                      "text-primary-background hover:bg-white/20 border-white/20":
                        isCurrentMonth && !isSelected,
                      "bg-blue-500/20 text-blue-100 border-blue-400/50 font-semibold":
                        isSelected,
                      "ring-2 ring-blue-400/50 border-blue-400/50":
                        isToday && !isSelected,
                    }
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Today Button */}
          <div className="mt-4 pt-4 border-t border-white/30">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setTempSelectedDate(today);
                setSelectedDate(today);
                onChange(formatDate(today));
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 text-sm font-medium text-primary-background bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
