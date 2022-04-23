import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import Home from './components/Home'
import BookFlight from './components/BookFlight'
import Reservation from './components/Reservation'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book-flight' element={<BookFlight />} />
          <Route path='/reservation/:id' element={<Reservation />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
