import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import NewTrip from './components/NewTrip';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckList from './components/CheckList';

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/checklist' element={<CheckList/>}/>
          <Route path="/new-trip" element={<NewTrip />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
