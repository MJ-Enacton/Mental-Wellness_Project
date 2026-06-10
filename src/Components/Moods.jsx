import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import MyCalendar from "./Calendar";
import { useDispatch, useSelector } from "react-redux";
import { MoodLineChart } from "./MoodLineChart";
import "../index.css";
import { newMood, deleteMood } from "../features/JournalMoodSlice";
import toast, { Toaster } from "react-hot-toast";

const Moods = () => {
  const moods = useSelector((state) => state.Mood);
  const selectedDate = useSelector((state) => state.selectedDate);

  const [time, setTime] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);

  const dispatch = useDispatch();

  const emojis = ["😁", "😊", "😐", "😕", "😢"];

  const moodsForSelectedDate = moods
    .filter((mood) => {
      if (!mood.addedAt) return false;

      return (
        new Date(mood.addedAt).toISOString().split("T")[0] === selectedDate
      );
    })
    .sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));

  const canAddMood = () => {
    if (!selectedMood || !time) {
      toast.error("Select Time and Mood", {
        duration: 3000,
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const handleAddMood = () => {
    if (!canAddMood()) return;

    const timePart = time.toTimeString().split(" ")[0];

    const moodDateTime = new Date(`${selectedDate}T${timePart}`);

    dispatch(
      newMood({
        emoji: selectedMood,
        addedAt: moodDateTime.toISOString(),
      }),
    );

    setSelectedMood(null);
    setTime(new Date());

    toast.success("Mood Added");
  };

  return (
    <div
      className="
        mt-15
        p-3 sm:p-6
        flex items-center justify-center
        transition-colors duration-300
      "
    >
      <div
        className="
          w-full max-w-6xl dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-slate-800 p-4 sm:p-6 md:p-8
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 md:gap-8">
          {/* Mood Input Card */}
          <div
            className="
              bg-white/60 dark:bg-slate-900/60
              rounded-2xl
              p-6
              shadow-sm
              border border-emerald-100 dark:border-slate-800
            "
          >
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-2">
              How are you feeling?
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Select the mood that best matches your day.
            </p>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-5">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMood(emoji)}
                  className={`
                    aspect-square
                    rounded-2xl
                    text-3xl
                    flex items-center justify-center
                    cursor-pointer
                    transition-all duration-300

                    ${
                      selectedMood === emoji
                        ? `
                          bg-linear-to-br
                          from-emerald-400
                          to-sky-400
                          shadow-lg
                          shadow-emerald-200
                          ring-4
                          ring-emerald-100
                          scale-105
                        `
                        : `
                          bg-white dark:bg-slate-800
                          hover:bg-emerald-50 dark:hover:bg-slate-700
                          shadow-sm
                          hover:scale-105
                        `
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div>
              <p className="mb-2 text-slate-700 dark:text-slate-300">
                Select Time
              </p>

              <Calendar
                value={time}
                onChange={(e) => setTime(e.value)}
                timeOnly
                appendTo="self"
                inputClassName="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200 dark:border-slate-700
                  bg-white dark:bg-slate-800
                  text-slate-700 dark:text-slate-200
                  px-4
                  shadow-sm
                  focus:ring-4
                  focus:ring-blue-100
                  text-center
                "
                pt={{
                  panel: {
                    className:
                      "custom-time-panel dark:bg-slate-800 dark:text-slate-200",
                  },
                  timepicker: {
                    className:
                      "custom-timepicker dark:bg-slate-800 dark:text-black",
                  },
                }}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleAddMood}
                className="
                  w-full
                  cursor-pointer
                  rounded-full
                  bg-emerald-500
                  px-6
                  py-3
                  text-sm sm:text-base
                  font-medium
                  text-white
                  transition-all duration-300
                  hover:bg-emerald-600
                  hover:shadow-lg
                  active:scale-95
                "
              >
                Save Entry
              </button>
            </div>
            <div className="mt-3">
              <MyCalendar />
            </div>
          </div>

          {/* Chart Card */}
          <div
            className="
              bg-white/60 dark:bg-slate-900/60
              rounded-2xl
              p-6
              shadow-sm
              border border-sky-100 dark:border-slate-800
              flex flex-col
            "
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
                Mood Insights
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your emotional distribution over time.
              </p>
            </div>

            <div
              className="
                flex-1
                rounded-2xl
                border-2 border-dashed
                border-sky-200 dark:border-slate-700
                bg-linear-to-br
                from-sky-50/60
                to-emerald-50/60
                dark:from-slate-900
                dark:to-slate-800
              "
            >
              <div className="w-full h-75 sm:h-100 md:h-125 lg:h-120 p-2 sm:p-4">
                <MoodLineChart />
                <div className="mt-4 px-4 pb-4">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                    Mood Entries
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {moodsForSelectedDate.map((mood) => (
                      <div
                        key={mood.id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
                      >
                        <span className="text-lg">{mood.emoji}</span>

                        <span className="text-xs text-slate-600 dark:text-slate-300">
                          {new Date(mood.addedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        <button
                          onClick={() => dispatch(deleteMood(mood.id))}
                          className="text-red-500 hover:text-red-600 text-sm cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Moods;
