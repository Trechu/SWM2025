import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './Routes.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function RoutesComponent() {

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


    return (
        <Form className='form-component'>
            <h1>
                No current route found
            </h1>
            <fieldset>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control id="locationInput" placeholder="Your location" />
                        <InputGroup.Text id="basic-addon1" >
                                <Button onClick={locationHandler} variant="transparent">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </Button>
                            </InputGroup.Text>
                    </InputGroup>
                    
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="transportSelect" style={{ "color": "white" }}>Form of transport</Form.Label>
                    <Form.Select id="transportSelect">
                        <option>On foot</option>
                        <option>Bicycle</option>
                        <option>Car</option>
                        <option>Bus</option>
                        <option>Train/Metro</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" variant="light">Start new route</Button>
            </fieldset>
        </Form>
    );
};

export default RoutesComponent; 