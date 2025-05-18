// src/pages/NewTrip.jsx
import { useState } from 'react';

export default function NewTrip() {
  const [tripName, setTripName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newTrip = {
      id: Date.now(), // unique ID
      name: tripName,
      date,
      location,
    };
  
    const existingTrips = JSON.parse(localStorage.getItem('trips')) || [];
    const updatedTrips = [...existingTrips, newTrip];
  
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    alert(`Trip "${tripName}" added!`);
  
    // Optional: Clear the form
    setTripName('');
    setDate('');
    setLocation('');
  };
  
  const today = new Date().toISOString().split('T')[0];


  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">➕ Add a New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Trip Name</label>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. Business Trip to Mumbai"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
            min={today}
          />
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. Hyderabad"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Trip
        </button>
      </form>
    </div>
  );
}
