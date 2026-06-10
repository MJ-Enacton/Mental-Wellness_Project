import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ViewJournal = () => {
  const data = useSelector((state) => state.Journal);
  const params = useParams();
  const [thought, setThought] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: "Grateful", value: "Grateful" },
    { label: "Stressful", value: "Stressful" },
  ];

  const fetchData = () => {
    if (params.id) {
      const filter = data.find((d) => d.id == params.id);

      if (filter) {
        setThought(filter.text);
        setSelectedCategory(filter.category);
      }
    }
  };
  useEffect(() => {
    if (params.id) {
      fetchData();
    }
  }, []);
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
            View Journal
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review your journal entry.
          </p>
        </div>

        {/* Category */}
        <div className="w-full my-4 flex flex-col justify-between">
          <p className="mb-2 text-slate-700 dark:text-slate-300">Category</p>

          <Dropdown
            value={selectedCategory}
            options={categories}
            disabled
            className="w-full"
            pt={{
              root: {
                className:
                  "p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 opacity-100",
              },
              panel: {
                className:
                  "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
              },
            }}
            highlightOnSelect={false}
          />
        </div>

        {/* Journal Content */}
        <div
          className="
            overflow-hidden rounded-2xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            shadow-sm
          "
        >
          <Editor value={thought} readOnly style={{ height: "320px" }} />
        </div>
      </div>
    </div>
  );
};

export default ViewJournal;
