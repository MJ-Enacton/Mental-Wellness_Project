import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { deleteJournal } from "../features/JournalMoodSlice";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const AllJournals = () => {
  const data = useSelector((state) => state.Journal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteJournal(id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-12 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-end border-b border-slate-300 dark:border-slate-700 mb-6">
        <h1 className="text-3xl font-bold pb-2 text-slate-800 dark:text-slate-100">
          All Journals
        </h1>

        <Link
          to="/addjournal"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer mb-2"
        >
          + New Journal
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-slate-400 col-span-3">
            No journals found
          </div>
        ) : (
          data.map((d) => (
            <article
              key={d.id}
              className="
                border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-900
                rounded-xl p-6
                shadow-sm hover:shadow-md
                transition-all duration-300
                flex flex-row justify-between items-center
              "
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">
                  {d.category}
                </p>

                <div
                  className="
                    prose prose-sm max-w-none
                    text-gray-700 dark:text-slate-200
                    leading-relaxed
                    dark:prose-invert
                    line-clamp-4
                  "
                  dangerouslySetInnerHTML={{ __html: d.text }}
                />
              </div>

              <div className="flex flex-col items-end gap-5 ml-4">
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-xl cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                  title="Delete Journal"
                >
                  <MdDelete />
                </button>

                <Link
                  to={`/addjournal/${d.id}`}
                  className="text-xl cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
                  title="Edit Journal"
                >
                  <FaEdit />
                </Link>
                <Link
                  to={`/journals/${d.id}`}
                  className="text-xl cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
                  title="View Journal"
                >
                  <FaEye />
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default AllJournals;
