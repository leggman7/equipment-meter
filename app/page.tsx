"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Equipment {
  id: string;
  name: string;
  hours: number;
}

export default function Home() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [updateValues, setUpdateValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const stored = localStorage.getItem("equipment");
    if (stored) {
      setEquipment(JSON.parse(stored));
    }
  }, []);

  const saveEquipment = (newEquipment: Equipment[]) => {
    setEquipment(newEquipment);
    localStorage.setItem("equipment", JSON.stringify(newEquipment));
  };

  const addEquipment = () => {
    if (!newEquipmentName.trim()) return;

    const newItem: Equipment = {
      id: Date.now().toString(),
      name: newEquipmentName.trim(),
      hours: 0,
    };

    saveEquipment([...equipment, newItem]);
    setNewEquipmentName("");
    setShowAddForm(false);
  };

  const updateHours = (id: string) => {
    const value = updateValues[id];
    if (!value) return;

    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue < 0) {
      alert("Please enter a valid positive number");
      return;
    }

    const currentEquipment = equipment.find((e) => e.id === id);
    if (currentEquipment && numericValue < currentEquipment.hours) {
      const confirmed = confirm(
        "The new value is lower than the current reading. Hour meters typically only increase. Continue anyway?"
      );
      if (!confirmed) return;
    }

    const updated = equipment.map((e) =>
      e.id === id ? { ...e, hours: numericValue } : e
    );

    saveEquipment(updated);
    setUpdateValues({ ...updateValues, [id]: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-zinc-900 px-3 py-2 text-sm font-medium border-b-2 border-zinc-900"
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900">
            Equipment Hour Meters
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Add Equipment
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">
              Add New Equipment
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={newEquipmentName}
                onChange={(e) => setNewEquipmentName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEquipment()}
                placeholder="Equipment name"
                className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
              <button
                onClick={addEquipment}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewEquipmentName("");
                }}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {equipment.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-12 text-center">
            <p className="text-zinc-600">
              No equipment added yet. Click &quot;Add Equipment&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-zinc-600 mt-1">
                      Current Hours: {item.hours.toLocaleString()} hrs
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={updateValues[item.id] || ""}
                      onChange={(e) =>
                        setUpdateValues({
                          ...updateValues,
                          [item.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => e.key === "Enter" && updateHours(item.id)}
                      placeholder="New hours"
                      className="w-32 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    />
                    <button
                      onClick={() => updateHours(item.id)}
                      className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
