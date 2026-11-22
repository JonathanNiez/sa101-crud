"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type Student = { id: number; name: string; course: string };

export default function Home() {
  const api = axios.create({
    baseURL: "/api/students",
    headers: { "Content-Type": "application/json" },
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get<Student[]>("/");
      setStudents(data);
      setError("");
    } catch (error: any) {
      setError(
        `Error: ${error.message} - Cannot reach the database. Check .env.local and the VM.`,
      );
    }
  };

  const save = async () => {
    if (!name || !course) return;
    try {
      if (editId) {
        await api.put("/", { id: editId, name, course });
      } else {
        await api.post("/", { name, course });
      }
      setName("");
      setCourse("");
      setEditId(null);
      load();
    } catch (error: any) {
      setError(`Error: ${error.message} - Failed to save the record.`);
    }
  };

  const remove = async (id: number) => {
    try {
      await api.delete("/", { data: { id } });
      load();
    } catch (error: any) {
      setError(`Error: ${error.message} - Failed to delete the record.`);
    }
  };

  const edit = (s: Student) => {
    setEditId(s.id);
    setName(s.name);
    setCourse(s.course);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-800">Student Records</h1>
          <p className="text-sm text-slate-500">
            Next.js (host PC) to MySQL (VM)
          </p>
        </header>

        {error && (
          <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-3 font-semibold text-slate-700">
            {editId ? "Edit Student" : "Add Student"}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="text-gray-600 flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="text-gray-600 flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <button
              onClick={save}
              disabled={!name || !course}
              className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white
             enabled:cursor-pointer enabled:hover:bg-blue-600
             disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setCourse("");
                }}
                className="rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
              >
                Cancel
              </button>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="border-b last:border-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">{s.id}</td>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="space-x-2 px-4 py-3 text-right">
                    <button
                      onClick={() => edit(s)}
                      className="rounded bg-amber-400 px-3 py-1 hover:bg-amber-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(s.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    No records yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
