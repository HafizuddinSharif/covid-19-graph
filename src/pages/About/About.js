import React from 'react'

function About() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1 className="py-5" style={{ fontWeight: '700' }}>About</h1>
            <div className="mx-5">
                <p>This website is built with React, Bootstrap, and using <a href="https://covid19api.com/">covid-19 api</a></p>
                <p>This website is just my pet-project to practice React and API integration 😎</p>
            </div>
        </div>
    )
}

export default About
