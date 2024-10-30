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
    <main>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Téléverser" />
      </form>
    </main>
  );
}
