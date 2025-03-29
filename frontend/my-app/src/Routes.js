import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './Routes.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react';

function RoutesComponent() {

    const [route, setRoute] = useState('');
    const [transportForm, setTransportForm] = useState('WALK');

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }

      function error() {
        console.log("Unable to retrieve your location");
      }

    function locationHandler(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            console.log("Geolocation not supported");
          }
    }

    function handleFormChoice(event){
        setTransportForm(event.target.value);
        console.log(event.target.value);
    }

    if(route == ''){
        return (
            <Form className='form-component'>
                <h1>
                    No current route found
                </h1>
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="locationStartInput" style={{ "color": "white" }} >Select starting location</Form.Label>
                        <InputGroup>
                            <Form.Control id="locationStartInput" className="bg-transparent" style={{"color":"white"}} />
                            <InputGroup.Text id="basic-addon1" className="bg-light" >
                                    <Button onClick={locationHandler} variant="transparent">
                                        <i class="bi bi-geo-alt-fill"></i>
                                    </Button>
                                </InputGroup.Text>
                        </InputGroup>
                        
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="transportStartSelect" style={{ "color": "white" }} >Select form of transport</Form.Label>
                        <Form.Select id="transportStartSelect" className="bg-transparent" style={{"color":"white", "fontWeight":"500"}} onChange={handleFormChoice}>
                            <option value="WALK">ON FOOT</option>
                            <option value="BICYCLE">BICYCLE</option>
                            <option value="CAR">CAR</option>
                            <option value="BUS">BUS</option>
                            <option value="TRAIN/METRO">TRAIN/METRO</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="light" style={{"fontWeight":"500"}}>Start new route</Button>
                </fieldset>
            </Form>
        );
    } else {
        return (
            <Form className='form-component'>
                <h1>
                    A route has been started
                </h1>
                <h2>
                    Finish previous route
                </h2>
                <fieldset>
                    <Form.Group className="mb-3">
                        <InputGroup>
                            <Form.Control id="locationEndInput" placeholder="End location" className="bg-transparent" style={{"color":"white"}}/>
                            <InputGroup.Text id="basic-addon1" >
                                    <Button onClick={locationHandler} variant="transparent">
                                        <i class="bi bi-geo-alt-fill"></i>
                                    </Button>
                                </InputGroup.Text>
                        </InputGroup>
                        
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="transportEndSelect" style={{ "color": "white" }}>Confirm form of transport</Form.Label>
                        <Form.Select id="transportEndSelect">
                            <option value="ON FOOT">ON FOOT</option>
                            <option value="BICYCLE">BICYCLE</option>
                            <option value="CAR">CAR</option>
                            <option value="BUS">BUS</option>
                            <option value="TRAIN/METRO">TRAIN/METRO</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="light">End route</Button>
                </fieldset>
            </Form>
        );
    }

};

export default RoutesComponent; 