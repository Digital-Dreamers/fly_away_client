import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Reservation() {
  const [data, setData] = useState('')

  const reservationId = useParams()
  console.log(reservationId.id)

  const API_URL = `http://localhost:3000/customers/reservations/${reservationId.id}`
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const resData = await response.json()
      // console.log(resData)
      console.log(resData.flightNumberId)
      console.log(resData.seatNumber)
      console.log(resData.passenger)
      console.log(resData)
      setData(resData)
    }
    fetchData()
  }, [reservationId.id])

  function upperCase(word) {
    let upper = word.charAt(0).toUpperCase() + word.slice(1)
    return upper
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
            Depature Date -{' '}
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
          {/* <p className="col-6">
            Seat Number - {!data ? null : data.seatNumber.seatnumber}
          </p>
          <p className="col-6">
            Seat Class - {!data ? null : upperCase(data.seatNumber.seatclass)}
          </p> */}
        </div>
      </main>
    </>
  )
}

export default Reservation
