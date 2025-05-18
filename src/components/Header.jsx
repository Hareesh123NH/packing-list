import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🧳 Packing Checklist</h1>
      <nav>
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/checklist" className="mr-4 hover:underline">PackList</Link>
        <Link to="/new-trip" className="hover:underline">Add New Trip</Link>
      </nav>
    </header>
  );
}
