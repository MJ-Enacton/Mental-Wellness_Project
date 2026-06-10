import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const prompts = [
  "What is something you're looking forward to today?",
  "What brought you a sense of peace recently?",
  "What is one small win you've had lately?",
  "What is taking up most of your thoughts right now?",
  "What is something you're proud of today?",
  "What gave you energy this week?",
  "What is one challenge you're working through?",
  "What is something kind you did for yourself recently?",
  "What are you learning about yourself these days?",
  "What is one thing you wish you had more of today?",
  "What helped you feel supported recently?",
  "What is something you'd like to celebrate today?",
  "What is one thing that surprised you this week?",
  "What are you hoping for right now?",
  "What is something that made you feel connected to others?",
  "What is one thought you'd like to revisit later?",
  "What is something you appreciate about yourself today?",
  "What is one habit you'd like to strengthen?",
  "What is something that feels important to you right now?",
  "What would make today feel meaningful?",
  "What's on your mind today?",
  "What lifted your mood today?",
  "What challenged you today?",
  "What inspired you recently?",
  "What are you avoiding right now?",
  "What feels good today?",
  "What do you need most today?",
  "What are you curious about today?",
  "What energized you recently?",
  "What would help you feel lighter today?",
];

const Home = () => {
  const [filteredJournal, setFilteredJournal] = useState([]);
  const [prompt, setPrompt] = useState(prompts[0]);

  const selectedDate = useSelector((state) => state.selectedDate);
  const journal = useSelector((state) => state.Journal);

  useEffect(() => {
    setFilteredJournal(journal.filter((j) => j.createdAt === selectedDate));
  }, [selectedDate, journal]);

  const refreshPrompt = () => {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(random);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 mt-10 text-slate-800 dark:text-slate-100 transition-colors duration-300 w-8/10 mx-auto">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-10 items-center mb-12">
        <div className="space-y-6">
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-medium tracking-wide">
            YOUR WELLNESS JOURNAL
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Reflect.
            <br />
            Grow.
            <br />
            Find Clarity.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Capture your thoughts, track your emotions, and build a healthier
            relationship with your mind—one entry at a time.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="
                px-6 py-3 rounded-full
                bg-emerald-500 hover:bg-emerald-600
                text-white shadow-sm
                transition-all duration-300
              "
            >
              New Journal
            </button>

            <button
              className="
                px-6 py-3 rounded-full
                border border-slate-300
                text-slate-700
                hover:border-slate-400

                dark:bg-slate-800
                dark:border-slate-600
                dark:text-slate-200
                dark:hover:bg-slate-700

                transition-all duration-300
              "
            >
              Track Mood
            </button>
          </div>
        </div>

        {/* Reflection Card */}
        <div
          className="
            rounded-3xl
            p-8
            shadow-sm
            border border-white/20
            backdrop-blur-md

            dark:bg-slate-900/80
            dark:border-slate-700
          "
        >
          <h2 className="text-xl font-semibold mb-5">Daily Reflection</h2>

          <p className="text-lg italic leading-relaxed text-slate-600 dark:text-slate-300">
            "{prompt}"
          </p>

          <button
            onClick={refreshPrompt}
            className="
              mt-6
              px-4 py-2
              rounded-xl
              border border-slate-300

              dark:bg-slate-800
              dark:border-slate-700

              hover:scale-105
              transition-all
            "
          >
            New Question
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Calendar />

        {/* Recent Journals */}
        <div
          className="
            lg:col-span-2
            rounded-3xl
            p-6
            shadow-sm
            backdrop-blur-sm

            dark:bg-slate-900/80
            dark:border-slate-700
          "
        >
          <h2 className="text-xl font-semibold mb-6">Recent Journals</h2>

          {filteredJournal?.length ? (
            <div className="space-y-4">
              {filteredJournal.map((d) => (
                <div
                  key={d.id}
                  className="rounded-2xl p-5 border border-slate-200/50 dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300"
                >
                  <div
                    className="prose max-w-none text-slate-700 dark:text-slate-200 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: d.text }}
                  />

                  <Link
                    to={`/journals/${d.id}`}
                    className="
                    mt-3
                    text-sm
                    font-medium
                    text-emerald-600
                    hover:text-emerald-700
                    dark:text-emerald-400
                  "
                  >
                    View Journal →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                No journal entries found for this date.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
