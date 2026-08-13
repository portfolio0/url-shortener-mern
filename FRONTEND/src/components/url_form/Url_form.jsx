import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createshorturl } from "../../api/shorturl.api";
const Url_form = () => {
  const [url, seturl] = useState("");

  const [shorturl, setshorturl] = useState("");

  const handlesubmit = async () => {
    const createdshorturl = await createshorturl(url);
    // console.log(url);
    // // console.log("hello");
    setshorturl(createdshorturl);
  };

  const notify = () => toast("URL Copied To Clipboard");
  return (
    <>
      <div className="space-y-4">
        <ToastContainer />
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
