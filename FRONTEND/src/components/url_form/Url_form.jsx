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
            className="block text-sm font-medium text-gray-50"
          >
            Enter Your URL
          </label>
          <input
            type="url"
            id="url"
            placeholder="https://yourlink.com"
            required
            value={url}
            onChange={(e) => seturl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="customalias"
            className="block text-sm font-medium text-gray-50"
          >
            Custom Alias (optional)
          </label>
          <input
            type="text"
            id="customalias"
            placeholder="my-custom-link"
            value={customalias}
            onChange={(e) => setcustomalias(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handlesubmit}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-300 cursor-pointer"
        >
          Shorten URL
        </button>
      </div>
      {shorturl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your Shortend URL</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shorturl}
              className="flex-1 py-1.5 px-1 border border-gray-300 rounded-l-md bg-white outline-0"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shorturl);
                notify();
                // alert("URL copied to clipboard");
              }}
              className="bg-gray-200 px-4  py-1.5 rounded-r-md hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Url_form;
