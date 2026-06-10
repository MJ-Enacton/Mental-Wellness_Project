import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteQuote } from "../features/JournalMoodSlice";
import { FaQuoteLeft, FaCopy, FaCheck } from "react-icons/fa";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState({
    id: null,
    quote: "",
    author: "",
  });

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.FavoriteQuotes || []);

  const getQuotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/quotes/random");

      setCurrentQuote({
        id: res.data.id,
        quote: res.data.quote,
        author: res.data.author,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const isFavorited = favorites.some((q) => q.quote === currentQuote.quote);

  const handleToggleFavorite = () => {
    if (!currentQuote.quote) return;
    dispatch(toggleFavoriteQuote(currentQuote));
  };

  const handleRemoveFavorite = (favQuote) => {
    dispatch(toggleFavoriteQuote(favQuote));
  };

  const handleSelectFavorite = (favQuote) => {
    setCurrentQuote(favQuote);
  };

  const handleCopyQuote = () => {
    if (!currentQuote.quote) return;

    navigator.clipboard.writeText(
      `"${currentQuote.quote}" — ${currentQuote.author}`,
    );

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="
        w-full min-h-screen pt-24 pb-8 flex items-center justify-center
        bg-linear-to-br
        from-slate-50 via-indigo-50/30 to-slate-100/40
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl w-full mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-light text-slate-800 dark:text-slate-100 tracking-wide">
            Daily Inspiration
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Reflect, pause, and carry these thoughts with you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Quote Card */}
          <div className="lg:col-span-2">
            <div
              className="
                bg-white/60 dark:bg-slate-900/70
                backdrop-blur-md
                border border-slate-200/50 dark:border-slate-800
                shadow-md dark:shadow-black/40
                rounded-3xl
                p-8 md:p-12
                relative
                flex flex-col justify-between
                min-h-87.5
                transition-all duration-300
                hover:shadow-lg
              "
            >
              {loading ? (
                <div className="flex flex-col justify-center items-center min-h-62.5 w-full">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-indigo-300"></div>
                    <div
                      className="h-3 w-3 animate-bounce rounded-full bg-indigo-400"
                      style={{ animationDelay: "0.10s" }}
                    ></div>
                    <div
                      className="h-3 w-3 animate-bounce rounded-full bg-indigo-500"
                      style={{ animationDelay: "0.20s" }}
                    ></div>
                  </div>

                  <span className="text-slate-400 dark:text-slate-500 text-xs mt-4 font-light">
                    Finding inspiration...
                  </span>
                </div>
              ) : (
                <>
                  {/* Actions */}
                  <div className="absolute top-6 right-6 flex items-center gap-3">
                    {/* Copy */}
                    <button
                      onClick={handleCopyQuote}
                      className="
                        p-2.5 rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-white/80 dark:bg-slate-800
                        text-slate-400 dark:text-slate-300
                        hover:text-indigo-600 dark:hover:text-indigo-400
                        hover:bg-slate-50 dark:hover:bg-slate-700
                        transition-all duration-300
                        cursor-pointer
                      "
                      title="Copy"
                    >
                      {copied ? (
                        <FaCheck className="text-emerald-500 text-sm" />
                      ) : (
                        <FaCopy className="text-sm" />
                      )}
                    </button>

                    {/* Favorite */}
                    <button
                      onClick={handleToggleFavorite}
                      className={`
                        p-2.5 rounded-xl border
                        transition-all duration-300 cursor-pointer
                        ${
                          isFavorited
                            ? `
                              bg-rose-50 dark:bg-rose-950/40
                              border-rose-200 dark:border-rose-800
                              text-rose-500
                              scale-105
                            `
                            : `
                              bg-white/80 dark:bg-slate-800
                              border-slate-200 dark:border-slate-700
                              text-slate-400 dark:text-slate-300
                              hover:text-indigo-600 dark:hover:text-indigo-400
                              hover:bg-slate-50 dark:hover:bg-slate-700
                              hover:scale-105
                            `
                        }
                      `}
                      title={isFavorited ? "Unpin" : "Pin"}
                    >
                      {isFavorited ? (
                        <BsPinAngleFill className="text-lg" />
                      ) : (
                        <BsPinAngle className="text-lg" />
                      )}
                    </button>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 flex flex-col justify-center mt-4">
                    <div className="text-slate-300 dark:text-slate-600 text-4xl mb-6">
                      <FaQuoteLeft />
                    </div>

                    <p className="text-slate-700 dark:text-slate-200 font-serif italic text-xl md:text-2xl font-light leading-relaxed mb-6 pr-4">
                      {currentQuote.quote}
                    </p>

                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base text-right pr-2">
                      — {currentQuote.author}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <button
                      onClick={getQuotes}
                      className="
                        cursor-pointer
                        rounded-xl
                        bg-indigo-600/80 dark:bg-indigo-500
                        hover:bg-indigo-600 dark:hover:bg-indigo-400
                        px-5 py-2.5
                        font-medium text-white
                        transition-all duration-300
                        hover:shadow-md
                        active:scale-95
                        text-sm
                      "
                    >
                      New Quote
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="
                bg-white/50 dark:bg-slate-900/70
                backdrop-blur-md
                border border-slate-200/50 dark:border-slate-800
                shadow-md dark:shadow-black/40
                rounded-3xl
                p-6
                flex flex-col
                min-h-87.5 max-h-120
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800 mb-4">
                <h2 className="text-md font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <BsPinAngleFill className="text-indigo-500" />
                  Pinned Quotes
                </h2>

                <span
                  className="
                    text-xs font-semibold px-2 py-0.5 rounded-full
                    bg-slate-200 dark:bg-slate-800
                    text-slate-600 dark:text-slate-300
                  "
                >
                  {favorites.length}
                </span>
              </div>

              {/* Empty */}
              {favorites.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="text-4xl mb-3 opacity-40">📌</div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                    No pinned quotes yet
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                    Pin quotes to save them here.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {favorites.map((fav) => (
                    <div
                      key={fav.id || fav.quote}
                      onClick={() => handleSelectFavorite(fav)}
                      className={`
                        p-4 rounded-2xl border
                        transition-all duration-300 cursor-pointer
                        group flex flex-col justify-between
                        ${
                          currentQuote.quote === fav.quote
                            ? `
                              bg-indigo-50/60 dark:bg-indigo-950/40
                              border-indigo-200 dark:border-indigo-800
                            `
                            : `
                              bg-white/40 dark:bg-slate-800/50
                              border-slate-100 dark:border-slate-700
                              hover:bg-white/80 dark:hover:bg-slate-700
                            `
                        }
                      `}
                    >
                      <p className="text-slate-700 dark:text-slate-200 font-serif italic text-xs line-clamp-3 mb-2 pr-6">
                        "{fav.quote}"
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium">
                          — {fav.author}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(fav);
                          }}
                          className="
                            opacity-0 group-hover:opacity-100
                            p-1 rounded-lg
                            text-slate-400 dark:text-slate-500
                            hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30
                            transition-all duration-200 cursor-pointer
                          "
                        >
                          <BsPinAngleFill className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
