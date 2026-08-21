import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getmyurls } from "../../api/shorturl.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [urls, seturls] = useState([]);
  const [loading, setloading] = useState(true);

  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

  useEffect(() => {
    const fetchurls = async () => {
      try {
        const data = await getmyurls();
        seturls(data.urls || []);
      } catch (err) {
        // ignore
      } finally {
        setloading(false);
      }
    };
    fetchurls();
  }, []);

  const handleCopy = (fullShortUrl) => {
    navigator.clipboard.writeText(fullShortUrl);
    toast.success("Short URL copied!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 font-medium">Loading your URLs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <ToastContainer position="bottom-right" />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Shortened URLs</h1>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition"
          >
            + Create New Link
          </Link>
        </div>

        {urls.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">You haven't shortened any URLs yet.</p>
            <Link
              to="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Shorten your first URL
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {urls.map((u) => {
              const fullShortLink = `${apiBase}/${u.short_url}`;
              return (
                <div
                  key={u._id}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
                >
                  <div className="space-y-1 overflow-hidden max-w-full">
                    <div className="flex items-center gap-2">
                      <a
                        href={fullShortLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:underline break-all"
                      >
                        {fullShortLink}
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-md" title={u.full_url}>
                      Original: {u.full_url}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
                      {u.clicks} {u.clicks === 1 ? "click" : "clicks"}
                    </span>
                    <button
                      onClick={() => handleCopy(fullShortLink)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded transition cursor-pointer"
                    >
                      Copy
                    </button>
                    <a
                      href={fullShortLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded transition"
                    >
                      Visit ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
