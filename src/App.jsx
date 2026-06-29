import { useState } from 'react'
import './App.css'
import Map from "./components/Map.jsx";

function App() {
    const [waypoints, setWaypoints] = useState([])
    const [result, setResult] = useState(null)

    function addStops() {
        setWaypoints([...waypoints, {latitude: "", longitude: ""}])
    }

    function handleInputChange(index, field, value) {
        const newWaypoints = [...waypoints]
        newWaypoints[index][field] = value
        setWaypoints(newWaypoints)
    }

    async function handleSubmit() {
        const response = await fetch("http://localhost:8080/api/v1/route", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ routeWayPoints: waypoints})
        })
        const data = await response.json()
        setResult(data)
    }

    return (
        <>
            {
                waypoints.map((waypoint, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="latitude"
                            onChange={(e) => handleInputChange(index, "latitude", e.target.value )}
                        />
                        <input type="text" placeholder="longitude" onChange={
                            (e) => handleInputChange(index, "longitude", e.target.value )}/>
                    </div>
                ))
            }
            <button type={"button"} onClick={addStops}>add stop</button>
            <button type={"submit"} onClick={handleSubmit}>submit</button>

            {result && (
                <div>
                    <p>Total distance = {result.distance} meters</p>
                    <p>Total duration = {result.duration} seconds</p>
                    {
                        result.resultRouteWayPoints.map((coordinates, index) => (
                            <div key={index} className="result">
                                latitude: {coordinates.latitude}, longitude: {coordinates.longitude}
                            </div>
                        ))}
                </div>)}
            <Map result={result} />
        </>
    )
}

export default App
