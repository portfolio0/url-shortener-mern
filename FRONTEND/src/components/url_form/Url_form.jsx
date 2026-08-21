import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createshorturl } from "../../api/shorturl.api";
const Url_form = () => {
  const [url, seturl] = useState("");
  const [customalias, setcustomalias] = useState("");

  const [shorturl, setshorturl] = useState("");
  const [error, seterror] = useState("");

  const handlesubmit = async () => {
    try {
      seterror("");
      const data = await createshorturl(url, customalias || undefined);
      // console.log(url);
      // // console.log("hello");
      setshorturl(data.shorturl);
    } catch (err) {
      seterror(err.response?.data?.message || "something went wrong");
    }
  };

  const notify = () => toast("URL Copied To Clipboard");
  return (
    <>
      <div className="space-y-4">
        <ToastContainer />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Your Long URL
          </label>
          <input
            type="url"
            id="url"
            placeholder="https://yourlink.com"
            required
            value={url}
            onChange={(e) => seturl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="customalias"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom Alias (optional)
          </label>
          <input
            type="text"
            id="customalias"
            placeholder="my-custom-link"
            value={customalias}
            onChange={(e) => setcustomalias(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handlesubmit}
          type="button"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Shorten URL
        </button>
      </div>
      {shorturl && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Your Shortened URL:</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shorturl}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-white text-blue-600 font-medium text-sm outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shorturl);
                notify();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium transition cursor-pointer"
            >
              Copy
            </button>
            <a
              href={shorturl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 text-sm font-medium transition flex items-center"
            >
              Open ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Url_form;
