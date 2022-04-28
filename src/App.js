import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// contexts
import { GlobalContext } from './components/helpers/GlobalContext'

// Components
import Home from './components/Home'
import Results from './components/Results'
import BookFlight from './components/BookFlight'
import Reservation from './components/Reservation'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [flights, setFlights] = useState('')
  const [selectedFlight, setSelectedFlight] = useState('')

  return (
    <div className="App ">
      <Router>
        <Header />
        <div className="fill-page">
          <GlobalContext.Provider
            value={{ flights, setFlights, selectedFlight, setSelectedFlight }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
              <Route path="/book-flight" element={<BookFlight />} />
              <Route path="/reservation/:id" element={<Reservation />} />
              {/* <Route path="/reservation/*" element={<Reservation />} /> */}
            </Routes>
          </GlobalContext.Provider>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
