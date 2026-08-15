import React, { useEffect, useState } from "react";
import { getmyurls } from "../../api/shorturl.api";

const Dashboard = () => {
  const [urls, seturls] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchurls = async () => {
      try {
        const data = await getmyurls();
        seturls(data.urls);
      } catch (err) {
        // ignore
      } finally {
        setloading(false);
      }
    };
    fetchurls();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">My URLs</h1>
      <div className="max-w-2xl mx-auto space-y-3">
        {urls.length === 0 && (
          <p className="text-center text-gray-500">No urls yet</p>
        )}
        {urls.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 rounded-md shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{u.short_url}</p>
              <p className="text-sm text-gray-500 truncate max-w-xs">
                {u.full_url}
              </p>
            </div>
            <span className="text-sm text-gray-600">{u.clicks} clicks</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
