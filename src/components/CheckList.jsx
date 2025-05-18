import { useState, useEffect } from "react";
import { defaultTemplates, emojis } from '../data/mockChecklist'

function Checklist() {
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [tripType, setTripType] = useState("Business Trip");
  const [items, setItems] = useState({});

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(savedTrips);
  }, []);

  useEffect(() => {
    if (selectedTripId) {
      const savedChecklist = localStorage.getItem(`checklist_${selectedTripId}`);
      setItems(savedChecklist ? JSON.parse(savedChecklist) : defaultTemplates[tripType]);
    }
  }, [selectedTripId]);

  useEffect(() => {
    if (selectedTripId) {
      localStorage.setItem(`checklist_${selectedTripId}`, JSON.stringify(items));
    }
  }, [items, selectedTripId]);

  const handleCheck = (category, index) => {
    const updated = { ...items };
    updated[category][index].checked = !updated[category][index].checked;
    setItems(updated);
  };

  const handleAddItem = (category) => {
    const name = prompt("Enter item name:");
    if (name) {
      const updated = { ...items };
      updated[category].push({ name, checked: false });
      setItems(updated);
    }
  };

  const handleAddCategory = () => {
    const category = prompt("Enter new category name:");
    if (category && !items[category]) {
      const updated = { ...items, [category]: [] };
      setItems(updated);
    } else if (items[category]) {
      alert("Category already exists!");
    }
  };

  const handleSaveTemplate = () => {
    if (!selectedTripId) {
      alert("Please select a trip first.");
      return;
    }

    // Save checklist
    localStorage.setItem(`checklist_${selectedTripId}`, JSON.stringify(items));

    // Calculate progress
    const total = Object.values(items).flat().length;
    const done = Object.values(items).flat().filter(i => i.checked).length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    // Update trip progress
    const updatedTrips = trips.map(trip =>
      trip.id === selectedTripId ? { ...trip, progress } : trip
    );

    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));

    alert("Checklist and trip progress saved!");
  };

  const getProgress = () => {
    if (!items || Object.keys(items).length === 0) return 0;
    const total = Object.values(items).flat().length;
    const done = Object.values(items).flat().filter((i) => i.checked).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };




  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-6 my-6">
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <label className="font-semibold">Select a Trip:</label>
            <select
              value={selectedTripId || ''}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm mt-1"
            >
              <option value="" disabled>Select Trip</option>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.name} ({trip.date})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSaveTemplate} className="bg-blue-500 text-white px-3 py-1 rounded">
              Save
            </button>
          </div>
        </div>


        <div className="mb-4 space-y-2">
          {trips.length === 0 ? (
            <p className="text-center text-gray-500">🚫 You need to add new trip.</p>
          ) :
              trips.map((trip) => {
                const progress = trip.progress ?? 0;

                const handleDeleteTrip = (e) => {
                  e.stopPropagation(); // Prevent triggering trip selection

                  // Remove checklist from localStorage
                  localStorage.removeItem(`checklist_${trip.id}`);

                  // Update trips list
                  const updatedTrips = trips.filter(t => t.id !== trip.id);
                  setTrips(updatedTrips);

                  localStorage.setItem("trips", JSON.stringify(updatedTrips));

                  // Clear selection if needed
                  if (selectedTripId === trip.id) {
                    setSelectedTripId(null);
                    setItems({});
                  }
                };

                return (
                  <div
                    key={trip.id}
                    className={`relative p-2 border rounded cursor-pointer ${trip.id === selectedTripId ? "bg-blue-50" : ""}`}
                    onClick={() => setSelectedTripId(trip.id)}
                  >
                    <button
                      onClick={handleDeleteTrip}
                      className="absolute top-1 right-2 text-red-600 text-xs hover:underline"
                    >
                      Delete
                    </button>

                    <div>
                      <div className="font-medium">{trip.name}</div>
                      <div className="text-sm text-gray-500">{trip.date} • {trip.location}</div>
                      <div className="w-full bg-gray-200 h-2 rounded mt-1">
                        <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })
            }
        </div>


        {Object.keys(items).map((category) => (
          <div key={category}>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {emojis[category]} {category}
            </h2>
            <div className="pl-6 space-y-1">
              {items[category].map((item, index) => (
                <label className="flex items-center gap-2" key={index}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(category, index)}
                  />
                  {item.name}
                </label>
              ))}
              <button
                onClick={() => handleAddItem(category)}
                className="text-blue-600 text-sm"
              >
                + Add item
              </button>
            </div>
          </div>
        ))}

        {selectedTripId && (
          <button
            onClick={handleAddCategory}
            className="w-full bg-purple-600 text-white py-2 rounded mt-4 hover:cursor-alias"
          >
            + Add Category
          </button>
        )}


        <div>
          <h2 className="text-md font-semibold flex items-center gap-2">
            🗓 Packing Progress:
            <span className="ml-auto">{getProgress()}%</span>
          </h2>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="h-3 rounded transition-all duration-300"
              style={{
                width: `${getProgress()}%`,
                backgroundColor:
                  getProgress() === 100
                    ? 'green'
                    : getProgress() >= 50
                      ? 'orange'
                      : 'blue',
              }}
            />
          </div>
        </div>

      </main>
    </div>
  );
}

export default Checklist;
