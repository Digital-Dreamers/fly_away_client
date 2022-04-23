import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// contexts
import { GlobalContext } from './components/helpers/GlobalContext'

// Components
import Home from './components/Home'
import BookFlight from './components/BookFlight'
import Reservation from './components/Reservation'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [flights, setFlights] = useState([])

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <GlobalContext.Provider flights={flights} setFlights={setFlights}>
            <Route path='/' element={<Home />} />
            <Route path='/book-flight' element={<BookFlight />} />
            <Route path='/reservation/:id' element={<Reservation />} />
          </GlobalContext.Provider>
        </Routes>
        <Footer />
      </Router>
    </div >
  )
}

export default App
