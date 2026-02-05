"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Equipment {
  id: string;
  name: string;
  hours: number;
}

interface Note {
  id: string;
  content: string;
  created_at: string;
}

export default function EquipmentDetail() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const fetchEquipment = async () => {
    const res = await fetch("/api/equipment");
    if (res.ok) {
      const all: Equipment[] = await res.json();
      setEquipment(all.find((e) => String(e.id) === String(id)) || null);
    }
  };

  const fetchNotes = async () => {
    const res = await fetch(`/api/equipment/${id}/notes`);
    if (res.ok) {
      setNotes(await res.json());
    }
  };

  useEffect(() => {
    fetchEquipment();
    fetchNotes();
  }, [id]);

  const addNote = async () => {
    if (!newNote.trim()) return;

    const res = await fetch(`/api/equipment/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote.trim() }),
    });

    if (res.ok) {
      await fetchNotes();
      setNewNote("");
    }
  };

  if (!equipment) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <nav className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className="text-zinc-600 hover:text-zinc-900 px-3 py-2 text-sm font-medium"
                >
                  Equipment
                </Link>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-zinc-900 px-3 py-2 text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-zinc-600">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-zinc-600 hover:text-zinc-900 px-3 py-2 text-sm font-medium"
              >
                Equipment
              </Link>
              <Link
                href="/about"
                className="text-zinc-600 hover:text-zinc-900 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          &larr; Back to Equipment List
        </Link>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-zinc-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-zinc-900">{equipment.name}</h1>
          <p className="text-zinc-600 mt-2">
            Current Hours: {Number(equipment.hours).toLocaleString()} hrs
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Notes</h2>

          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6 mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                placeholder="Add a note about this equipment..."
                className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={addNote}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Add Note
              </button>
            </div>
          </div>

          {notes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8 text-center">
              <p className="text-zinc-600">
                No notes yet. Add a note above to track issues or observations.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg shadow-sm border border-zinc-200 p-4"
                >
                  <p className="text-zinc-900 text-sm">{note.content}</p>
                  <p className="text-zinc-400 text-xs mt-2">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
