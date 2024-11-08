import { ChangeEvent, useEffect, useState } from "react";
import Toast from "./Toast";
import { useRouter } from "next/navigation";
import { URLS } from "../../utils/urls";

export default function FileUpload() {
  const [file, setFile] = useState<File>();
  const [canTriggerRedirection, setCanTriggerRedirection] =
    useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/upload/",
        {
          method: "POST",
          body: data,
        }
      );

      if (res.ok) {
        const response = await res.json();
        Toast.fire({
          icon: "success",
          title: response.detail,
        });
        setCanTriggerRedirection(true);
      } else {
        const error = await res.json();
        let message = error.detail;
        message = message.replaceAll("[", "");
        message = message.replaceAll("]", "");
        message = message.replaceAll("\\n", "\n\n");
        message = message.replaceAll("\\'", "'");
        message = message.replaceAll("NaN", "???");
        Toast.fire({
          icon: "error",
          title: message,
        });
      }
    } catch (e: unknown) {
      console.log(e);
      Toast.fire({
        icon: "error",
        title: "Une erreur est survenue lors de l'envoie du fichier",
      });
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const router = useRouter();

  useEffect(() => {
    if (canTriggerRedirection) {
      router.push(URLS.INVOICES);
    }
  }, [router, canTriggerRedirection]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sélectionner votre fichier
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
                  <span className="font-semibold">Cliquez</span>
                </p>
                <p className="text-xs text-gray-500">CSV, XLSX</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".csv, .xlsx"
                name="file"
                onChange={handleFileChange}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
