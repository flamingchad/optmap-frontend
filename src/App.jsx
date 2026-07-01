import { useState } from 'react'
import './App.css'
import Map from "./components/Map.jsx";
import Button from '@mui/material/Button';
import {Box, Divider, TextField, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StraightenIcon from '@mui/icons-material/Straighten';

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
           <div className={"app-container"}>
               <div className={"side-panel"}>
                   <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                       Route Planner
                   </Typography>
                   {
                       waypoints.map((waypoint, index) => (
                           <Box key={index} sx={{ mb: 1.5 }}>
                               <Typography variant="body2" sx={{ mb: 0.5 }}>
                                   Stop {index + 1}
                               </Typography>
                               <Box sx={{display: 'flex', gap: 1, mb: 1.5}}
                                    component={"form"} key={index} autoComplete={"off"}>
                                   <TextField
                                       variant={"outlined"}
                                       label={"Latitude"}
                                       type={"text"}
                                       size={"small"}
                                       onChange={(e) => handleInputChange(index, "latitude", e.target.value )}
                                   />
                                   <TextField
                                       variant={"outlined"}
                                       label={"Longitude"}
                                       type={"text"}
                                       size={"small"}
                                       onChange={(e) => handleInputChange(index, "longitude", e.target.value )}/>
                               </Box>
                           </Box>
                       ))
                   }
                   <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                       <Button variant={"outlined"} onClick={addStops} fullWidth>add stop</Button>
                       <Button variant={"contained"} onClick={handleSubmit} fullWidth>submit</Button>
                   </Box>


                   {result && (
                       <div>
                           <Divider sx={{ my: 2 }} />
                           <Typography variant={"h5"}>Optimised Route:</Typography>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                               <StraightenIcon sx={{ fontSize: 18 }} />
                               <Typography>{(result.distance / 1000).toFixed(1)} km</Typography>
                           </Box>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                               <AccessTimeIcon sx={{ fontSize: 18 }} />
                               <Typography>{(result.duration / 60).toFixed(1)} min</Typography>
                           </Box>
                       </div>)}
               </div>
               <Map result={result} />
           </div>
        </>
    )
}

export default App
