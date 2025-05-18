import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1502920917128-1aa500764b79?auto=format&fit=crop&w=1600&q=80')`, // You can replace this with your image
      }}
    >
      <div className="bg-black/60 p-10 rounded-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">🧳 Ready to Pack?</h1>
        <p className="text-lg mb-8">Create customized checklists for any kind of trip</p>
        <Link
          to="/checklist"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
