import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import './Events.css'
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import {MarkerF} from '@react-google-maps/api'
import  { useRef} from 'react'
import { useNavigate } from 'react-router-dom';
const  geolocation = require('geolocation')

const containerStyle = {
  width: '100%',
  height: '100%'
};


function OffCanvasExample({destination,name, ...props}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        return(
            setShow(true)
            )
        };
      // User location state   geolocation
  const [userLat,setUserLat]=useState(null)
  const [userLng,setUserLng]=useState(null)
  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err
    setUserLat(position.coords.latitude)
    setUserLng(position.coords.longitude)
  })
  const center = {
    lat: userLat,
    lng: userLng
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries: ['places'],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })
// google map state
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const originRef = useRef()
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <div></div>
  }
  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }


  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
    return (
      <div>
        <Button variant="primary" onClick={handleShow}  className="me-2">
          Route
        </Button>
        <Offcanvas className='contain' show={show} onHide={handleClose} {...props}>
          <Offcanvas.Body>
            <div className='googleMap'>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
              >
                <MarkerF  position={center} />
                {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                    )}
              </GoogleMap>
            </div>
            <div className='info'>
              <Autocomplete className='origin'>
                        <input type='text' placeholder='Origin' ref={originRef} />
              </Autocomplete>
              <Autocomplete className='destination'>
                        <input type='text' value={destination} ref={destiantionRef}/>
              </Autocomplete>
              <Button className='calculateButton' type='submit' onClick={calculateRoute}>Calculate Route</Button>
              <Button className='clearButton'  onClick={clearRoute}>
                <FaTimes/>
              </Button>
              <div className='distance'>Distance: {distance} </div>
              <div className='duration'>Duration: {duration} </div>
              <Button className='centerButton' onClick={() => {
                  map.panTo(center)
                  map.setZoom(15)
                }}>
                <FaLocationArrow/>
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }

  function Detail({ name,event,handleDelete, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate=useNavigate()
    return (
      <div>
        <Button variant="primary" onClick={handleShow} className="me-2">
          Detail
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props} style={{backgroundColor:'#8a1538'}}>
          <Offcanvas.Body style={{textAlign:"center"}}>
            <Card style={{marginTop:"250px"}}>
                <Card.Img variant="top" src={event.image} style={{height:'192px'}}/>
                  <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>Category:</Card.Text>
                    <Card.Text>{event.category}</Card.Text>
                    <Card.Text>Location:</Card.Text>
                    <Card.Text>{event.location}</Card.Text>
                    <Card.Text>Description:</Card.Text>
                    <Card.Text>{event.description}</Card.Text>
                  </Card.Body>
              </Card>
          </Offcanvas.Body>
          <Button variant="primary" onClick={()=>{navigate(`/edit/${event.id}`)}}>Edit Info</Button>
          <Button variant="danger" onClick={()=>{handleDelete(event.id)}}>Delete</Button>
        </Offcanvas>
      </div>
    );
  }

const Events=({events,handleDelete})=>{
    const EventsList=events.map((event)=>{
        return(
            <Col key={event.id} style={{backgroundColor:'#8a1538',display:"flex",justifyContent:"center",textAlign:"center"}}>
              <Card style={{width:'18rem',margin:"20px"}}>
                <Card.Img variant="top" src={event.image} style={{height:'192px'}}/>
                  <Card.Body >
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>{event.category}</Card.Text>
                    <Row>
                      <Col>
                        {['end'].map((placement, idx) => (
                          <Detail key={idx} placement={placement} name={placement} event={event} handleDelete={handleDelete} />
                        ))}
                      </Col>
                      <Col>
                        {['bottom'].map((placement, idx) => (
                          <OffCanvasExample key={idx} placement={placement} name={placement} destination={event.location} />
                        ))}
                      </Col>
                    </Row>
                  </Card.Body>
              </Card>
            </Col>
        )
    })
    return(
        <Container>
            <Row >
                {EventsList}
            </Row>
        </Container>
    )
}

export default Events
