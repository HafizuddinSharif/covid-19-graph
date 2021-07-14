import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Chart from 'chart.js/auto'

function Home() {

    const [data, setData] = useState('')

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

        const response = await fetch(`https://api.covid19api.com/country/${country}/status/confirmed?from=${secondDate}T00:00:00Z&to=${firstDate}T00:00:00Z`)

        if (response.ok) {
            const jsonResponse = await response.json()

            const number = jsonResponse.map(snaps => snaps.Cases)

            console.log(jsonResponse[0].Country)
            
            setData(number)
        }

    }

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

            <div className="mx-5"> 
                <p>Homepage</p>
                { data && data.map( (element, index) => <p key={index} >{element}</p>)}
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

export default Home
