import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Reservation() {
  const [data, setData] = useState('')
  const [seat, setSeat] = useState('')
  const [seatId, setSeatId] = useState('')
  const [passenger, setPassenger] = useState('')
  const [seatAvailable] = useState(true)
  const reservationId = useParams()
  const navigate = useNavigate()
  const API_URL = `http://localhost:3000/customers/reservations/${reservationId.id}`
  const API_URL_DELETE = ` http://localhost:3000/customers/reservations/cancellation/${data._id}/${passenger._id}`
  const API_URL_UPDATE_SEAT = `http://localhost:3000/customers/update-old-seat`

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const resData = await response.json()

      setSeatId(resData.seatNumberId)
      setSeat(resData.seatNumberId.seatNumber)
      setData(resData)
      setPassenger(resData.passengerId)
    }
    fetchData()
  }, [reservationId.id, API_URL, API_URL_DELETE])

  const handleDelete = (e) => {
    const deleteData = async () => {
      const response = await fetch(API_URL_DELETE, { method: 'DELETE' })
      return response
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldSeatId: seatId, available: seatAvailable }),
    }
    const updateSeat = async () => {
      const response = await fetch(API_URL_UPDATE_SEAT, requestOptions)
      return response
    }
    updateSeat()
    deleteData()
    console.log('Deleted')
    navigate('/')
  }

  const handleUpdate = (e) => {
    console.log('Updated')
  }

  return (
    <>
      <h4 className="mt-5">Reservation Number</h4>
      <h6>{!data ? null : data._id}</h6>
      <main className="container">
        <h5 className="mt-5">Flight Infomation</h5>
        <div className="row g-3 mt-3">
          <p className="col-12">
            {!data
              ? null
              : `Flight Number - ${data.flightNumberId.flightNumber}`}
          </p>
          <p className="col-6">
            Departing From - {!data ? null : data.flightNumberId.departure}
          </p>
          <p className="col-6">
            Arriving At - {!data ? null : data.flightNumberId.destination}
          </p>
          <p className="col-6">
            Departure Date -{' '}
            {!data ? null : data.flightNumberId.departureDate.slice(0, 7)}
          </p>
          <p className="col-6">
            Arrival Date -{' '}
            {!data ? null : data.flightNumberId.arrivalDate.slice(0, 7)}
          </p>
          <p className="col-6">
            Depature Time - {!data ? null : data.flightNumberId.departureTime}
          </p>
          <p className="col-6">
            Arrival Time - {!data ? null : data.flightNumberId.arrivalTime}
          </p>
          <p className="col-6">Seat Number - {!seat ? null : seat}</p>
          <p className="col-6">Seat Class - Coach</p>
        </div>
      </main>
      <h5 className="mt-5">Passenger Information</h5>
      <section className="container mb-5">
        <div className="row g-3 mt-3">
          <p className="col-6">
            First Name - {!passenger ? null : passenger.firstName}{' '}
          </p>
          <p className="col-6">
            Last Name - {!passenger ? null : passenger.lastName}{' '}
          </p>
          <p className="col-6">Age - {!passenger ? null : passenger.age} </p>
          <p className="col-6">
            Address - {!passenger ? null : passenger.address}{' '}
          </p>
          <p className="col-6">City - {!passenger ? null : passenger.city} </p>
          <p className="col-6">
            State - {!passenger ? null : passenger.state}{' '}
          </p>
        </div>
      </section>
      <div className="container">
        {' '}
        <button
          onClick={(e) => handleDelete(e)}
          className="btn btn-dark col-5 m-3"
        >
          Delete
        </button>{' '}
      </div>
    </>
  )
}

export default Reservation
