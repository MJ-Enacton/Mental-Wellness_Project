import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import toast, { Toaster } from "react-hot-toast";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { editJournal, newJournal } from "../features/JournalMoodSlice";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

const AddJournal = () => {
  const params = useParams();
  const [thought, setThought] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: "Grateful", value: "Grateful" },
    { label: "Stressful", value: "Stressful" },
  ];

  const dispatch = useDispatch();

  const data = useSelector((state) => state.Journal);

  const fetchData = () => {
    if (params.id) {
      const filter = data.find((d) => d.id == params.id);

      if (filter) {
        setThought(filter.text);
        setSelectedCategory(filter.category);
        console.log(filter);
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      console.log(params.id);

      fetchData();
    }
  }, []);

  const handleJournalAdd = () => {
    if (selectedCategory !== null && thought !== undefined && thought !== "") {
      dispatch(
        newJournal({
          category: selectedCategory,
          text: thought,
        }),
      );

      setThought("");
      setSelectedCategory(null);

      toast.success("Journal Added", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleJournalEntry = () => {
    if (params.id) {
      dispatch(
        editJournal({
          id: params.id,
          category: selectedCategory,
          text: thought,
        }),
      );

      setThought("");
      setSelectedCategory(null);
    } else {
      handleJournalAdd();
    }

    navigate("/journals");
  };

  return (
    <div className="mx-auto max-w-4xl p-8 mt-17 min-h-screen transition-colors duration-300">
      <div
        className="
          rounded-3xl p-8
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          shadow-2xl shadow-slate-200/50
          dark:shadow-black/30
        "
      >
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate("/journals")}
            className="
              inline-flex items-center gap-2
              text-md cursor-pointer mb-5 p-2 rounded-lg
              duration-200
              text-slate-500 dark:text-slate-400
              hover:bg-slate-100 dark:hover:bg-slate-800
              hover:text-slate-700 dark:hover:text-slate-200
            "
          >
            <FaArrowLeftLong />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-light text-slate-700 dark:text-slate-100">
            {params.id ? "Edit Journal" : "Journal Entry"}
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {params.id
              ? "Edit your thoughts"
              : "Take a moment to capture your thoughts."}
          </p>
        </div>

        {/* Category */}
        <div className="w-full my-4 flex flex-col justify-between">
          <p className="mb-2 text-slate-700 dark:text-slate-300">Categories</p>

          <Dropdown
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
            options={categories}
            placeholder="Select a Category"
            className="w-full"
            pt={{
              root: {
                className:
                  "p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200",
              },
              panel: {
                className:
                  "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
              },
              item: {
                className:
                  "p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700",
              },
            }}
            highlightOnSelect={false}
          />
        </div>

        {/* Editor */}
        <div
          className="
            overflow-hidden rounded-2xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            shadow-sm
          "
        >
          <Editor
            value={thought}
            onTextChange={(e) => setThought(e.htmlValue)}
            style={{ height: "320px" }}
          />
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleJournalEntry}
            className="
              rounded-full
              bg-emerald-500
              px-8 py-3
              text-sm font-medium text-white
              transition-all duration-300
              hover:bg-emerald-600
              hover:shadow-lg
              active:scale-95
            "
          >
            Save Entry
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default AddJournal;
