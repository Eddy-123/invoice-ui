"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const response = await res.json();
        alert(response.detail);
      } else {
        const error = await res.json();
        alert(error.detail);
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Upload Your File
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* File Input */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16v-4a4 4 0 118 0v4m-5 4h2m-1-12h.01M5 16h14"
                  ></path>
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">CSV, XLSX</p>
              </div>
              <input
                id="file-upload"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* File Preview */}
          {file && (
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-700">
                Selected File: <strong>{file.name}</strong>
              </p>
            </div>
          )}

          {/* Progress Bar (optional) */}
          <div className="relative w-full h-2 bg-gray-200 rounded">
            <div className="absolute top-0 left-0 h-2 w-1/3 bg-blue-500 rounded animate-pulse"></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
}
