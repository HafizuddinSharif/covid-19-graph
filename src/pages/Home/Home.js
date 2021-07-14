import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Bar } from 'react-chartjs-2';

function Home() {

    const [data, setData] = useState('')

    // For graph x axis (Time)
    const [dates, setDates] = useState([])
    const [confirmed, setConfirmed] = useState([])
    const [recovered, setRecovered] = useState([])
    const [deaths, setDeaths] = useState([])

    const [country, setCountry] = useState('malaysia')
    const handleCountryChange = ({ target }) => {
        setCountry(target.value)
    }

    const currTime = new Date()
    const prevTime = new Date(currTime)

    prevTime.setDate(prevTime.getDate() - 1)

    // dateFormat is a helper function to format the datetime to 'YYYY-MM-DD'
    const today = dateFormat(currTime)
    const yesterday = dateFormat(prevTime)


    const [firstDate, setFirstDate] = useState(today)
    const onFirstDateChange = ({ target }) => {
        setFirstDate( target.value )
    }

    const [secondDate, setSecondDate] = useState(yesterday)
    const onSecondDateChange = ({ target }) => {
        setSecondDate( target.value )
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(`https://api.covid19api.com/country/${country}?from=${secondDate}T00:00:00Z&to=${firstDate}T00:00:00Z`)

        if (response.ok) {
            const jsonResponse = await response.json()

            setDates(jsonResponse.map( elem => elem.Date.slice(0, 10) ))
            // casesPerDay is a helper function
            setConfirmed(casesPerDay(jsonResponse.map( elem => elem.Confirmed )))

            setShow(true)
        }

    }

    const [show, setShow] = useState(false)

    const dataChart = {
        labels: dates,
        datasets: [
          {
            label: '# of Confirmed cases',
            data: confirmed,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        title: {
            display: true,
            text: 'This is a title',
            fontSize: 20
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      

    return (
        <div className="d-flex w-100 flex-column m-auto mb-5" style={{ maxWidth: '900px' }}>
            <h1 className="py-5 text-center" style={{ fontFamily: 'Pacifico' }}>COVID-19 Data go pew pew 📊</h1>

            <div className="mx-5">
                <Form onSubmit={handleSubmit} >

                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <select value={country} onChange={handleCountryChange} className="w-100 p-2 rounded" style={{ border: '1px solid #ced4da' }} required>
                            <option value="" disabled >Select country</option>
                            <option value="malaysia" selected >Malaysia</option>
                            <option value="south-africa">South Africa</option>
                            <option value="singapore">Singapore</option>
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>From</Form.Label>
                        <Form.Control type="date" max={firstDate} value={secondDate} onChange={onSecondDateChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="date" max={today} value={firstDate} onChange={onFirstDateChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">Fetch Data</Button>

                </Form>
            </div>

            <div className="mx-5 my-5 text-center"> 
                { !show && <h6>Your graph will appear here. <br />Please pick a country 🌍 and a span of time ⌛</h6> }
                { show && <Bar data={dataChart} options={options} /> }
            </div>
        </div>
    )
}

const dateFormat = (time) => {

    const dd = String(time.getDate()).padStart(2, '0');
    const mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = time.getFullYear();

    return yyyy + '-' + mm + '-' + dd;

}

const casesPerDay = (cumulativeCases) => {

    const casesPerDay = []

    for (let i = 1; i < cumulativeCases.length; i++) {
        const numOfCase = cumulativeCases[i] - cumulativeCases[i-1]
        casesPerDay.push(numOfCase)
    }

    return casesPerDay
}

export default Home
