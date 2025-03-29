import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './Routes.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { use, useEffect, useState } from 'react';
import { API_URL } from './consts';
import { data } from 'react-router-dom';

function RoutesComponent() {

    const [route, setRoute] = useState('');
    const [transportForm, setTransportForm] = useState('WALK');
    const apiUrl = "http://127.0.0.1:8000";
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    function findActiveRoute() {
        console.log(sessionStorage.getItem('id'))
        fetch(API_URL + "/users/" + sessionStorage.getItem('id') + "/active_route", {
            method: 'GET'
        }).then(res => {
            if (res.status == 200) {
                return res.json()
            }
            if (res.status == 404) {
                return '';
            }
        }).then(data => {
            console.log(data);
            setRoute(data);
        })
    }

    function startRoute(event) {
        event.preventDefault();
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        fetch(API_URL + "/users/" + sessionStorage.getItem('id') + "/routes", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                "startLocation": {
                    "latitude": latitude,
                    "longitude": longitude
                },
                "transportationMode": transportForm
            })
        }).then(res => res.json()).then(data => console.log(data))
        window.location.reload();
    }

    function finishRoute(event) {
        event.preventDefault();
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        fetch(API_URL + "/users/" + sessionStorage.getItem('id') + "/routes/" + route.id, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                "endLocation": {"latitude": latitude,"longitude": longitude}
            })
        }).then(res => res.json()).then(data => console.log(data))
        // window.location.reload();
    }

    function success(position) {
        const selectedLatitude = position.coords.latitude;
        const selectedLongitude = position.coords.longitude;
        setLatitude(selectedLatitude);
        setLongitude(selectedLongitude);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    function locationHandler() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    function handleFormChoice(event) {
        setTransportForm(event.target.value);
        console.log(event.target.value);
    }

    useEffect(() => {
        findActiveRoute();
    }, []);

    if (route == '') {
        return (
            <Form className='form-component' onSubmit={startRoute}>
                <h1>
                    No current route found
                </h1>
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="locationStartInput" style={{ "color": "white" }} >Select starting location</Form.Label>
                        <InputGroup>
                            <Form.Control id="locationStartInput" className="bg-transparent" style={{ "color": "white" }} value={latitude + ", " + longitude} />
                            <InputGroup.Text id="basic-addon1" className="bg-light" >
                                <Button onClick={locationHandler} variant="transparent">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="transportStartSelect" style={{ "color": "white" }} >Select form of transport</Form.Label>
                        <Form.Select id="transportStartSelect" className="bg-transparent" style={{ "color": "white", "fontWeight": "500" }} onChange={handleFormChoice}>
                            <option value="WALK">ON FOOT</option>
                            <option value="BICYCLE">BICYCLE</option>
                            <option value="CAR">CAR</option>
                            <option value="BUS">BUS</option>
                            <option value="TRAIN/METRO">TRAIN/METRO</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="light" style={{ "fontWeight": "500" }}>Start new route</Button>
                </fieldset>
            </Form>
        );
    } else {
        return (
            <Form className='form-component' onSubmit={finishRoute}>
                <h1>
                    A route has been started
                </h1>
                <h2>
                    Finish previous route
                </h2>
                <fieldset>
                    <Form.Group className="mb-3">
                        <InputGroup>
                            <Form.Control id="locationEndInput" className="bg-transparent" style={{ "color": "white" }} value={latitude + ", " + longitude}/>
                            <InputGroup.Text id="basic-addon1" >
                                <Button onClick={locationHandler} variant="transparent">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="transportEndSelect" style={{ "color": "white" }}>Confirm form of transport</Form.Label>
                        <Form.Select id="transportEndSelect" className="bg-transparent" style={{ "color": "white", "fontWeight": "500" }}>
                            <option value="ON FOOT">ON FOOT</option>
                            <option value="BICYCLE">BICYCLE</option>
                            <option value="CAR">CAR</option>
                            <option value="BUS">BUS</option>
                            <option value="TRAIN/METRO">TRAIN/METRO</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="light" style={{ "fontWeight": "500" }}>End route</Button>
                </fieldset>
            </Form>
        );
    }

};

export default RoutesComponent; 