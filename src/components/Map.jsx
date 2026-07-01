import {MapContainer, Marker, Polyline, Popup, TileLayer, ZoomControl} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function Map(props) {

    const result = props.result

    return (
        <>
            <MapContainer
                center={[52.517037, 13.388860]}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl= {false}
                style={{height: '100vh', width: '100%'}}
            >
                <ZoomControl position={"bottomright"}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {result && (
                    result.resultRouteWayPoints.map((waypoint, index) => (
                        <Marker key={index} position={[waypoint.latitude, waypoint.longitude]}  />
                    ))
                )}
                {result && (
                    <Polyline positions={[
                        ...result.resultRouteWayPoints.map((wp) => [wp.latitude, wp.longitude]),
                        [result.resultRouteWayPoints[0].latitude, result.resultRouteWayPoints[0].longitude]
                    ]} />
                )}
            </MapContainer>
        </>
    )
}

export default Map