import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedData = localStorage.getItem("journalmood");
const parsedData = savedData ? JSON.parse(savedData) : null;

const initialState = {
  Journal: parsedData?.Journal || [
    {
      id: 1,
      category: "Grateful",
      text: "<p>Good Day</p>",
      createdAt: new Date().toISOString().split("T")[0],
    },
  ],
  Mood: parsedData?.Mood || [
    {
      id: 1,
      emoji: "😟",
      addedAt: new Date().toISOString()
    },
  ],
  FavoriteQuotes: parsedData?.FavoriteQuotes || [],
  selectedDate: new Date().toISOString().split("T")[0],
  theme: parsedData?.theme || "light",
};

const JournalMoodSlice = createSlice({
  name: "JournalMood",
  initialState,
  reducers: {
    newJournal: (state, action) => {
      state.Journal.push({
        id: nanoid(),
        category: action.payload.category,
        text: action.payload.text,
        createdAt: new Date().toISOString().split("T")[0],
      });

      localStorage.setItem("journalmood", JSON.stringify(state));
    },

    deleteJournal: (state, action) => {
      state.Journal = state.Journal.filter((j) => j.id !== action.payload);
      localStorage.setItem("journalmood", JSON.stringify(state));
    },

    editJournal: (state, action) => {
      state.Journal = state.Journal.map((j) =>
        j.id === action.payload.id ? action.payload : j,
      );
      localStorage.setItem("journalmood", JSON.stringify(state));
    },

    toggleFavoriteQuote: (state, action) => {
      const quote = action.payload; // { id, quote, author }
      const index = state.FavoriteQuotes.findIndex(
        (q) => q.quote === quote.quote,
      );
      if (index >= 0) {
        state.FavoriteQuotes = state.FavoriteQuotes.filter(
          (q) => q.quote !== quote.quote,
        );
      } else {
        state.FavoriteQuotes.push(quote);
      }
      localStorage.setItem("journalmood", JSON.stringify(state));
    },

    changeSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      localStorage.setItem("journalmood", JSON.stringify(state));
    },

    newMood: (state, action) => {
      state.Mood.push({
        id: nanoid(),
        emoji: action.payload.emoji,
        addedAt: action.payload.addedAt,
      });

      localStorage.setItem("journalmood", JSON.stringify(state));
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("journalmood", JSON.stringify(state));
    },
    deleteMood: (state, action) => {
      state.Mood = state.Mood.filter((mood) => mood.id !== action.payload);

      localStorage.setItem("journalmood", JSON.stringify(state));
    },
  },
});

export const {
  newJournal,
  deleteJournal,
  editJournal,
  toggleFavoriteQuote,
  changeSelectedDate,
  newMood,
  toggleTheme,
  deleteMood,
} = JournalMoodSlice.actions;

export default JournalMoodSlice.reducer;
