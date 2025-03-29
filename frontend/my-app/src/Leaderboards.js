import { useState } from 'react';
import './Leaderboards.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PositionComponent({ positionEntry }) {
    return (
        <Row className='entry entry-border'>
            <Col xs="1" lg="2">{positionEntry.position}</Col>
            <Col xs="3" lg="2">{positionEntry.username}</Col>
            <Col xs="2" lg="2">{positionEntry.distance + " km"}</Col>
            <Col xs="2" lg="2">{positionEntry.co2 + " kg"}</Col>
            <Col xs="3" lg="2">{positionEntry.co2PerKilometer + " kg/km"}</Col>
        </Row>
    );
};

function LeaderboardsComponent() {

    const [date, setDate] = useState('today');

    const mockData = {
        "leaderboard": [
            {
                "position": 1,
                "id": 1,
                "username": "franek123",
                "distance": 5.2, // kilometers?
                "co2": 123, // kilograms?
                "co2PerKilometer": 23.65,
            },
            {
                "position": 2,
                "id": 17,
                "username": "epic",
                "distance": 4.2, //  kilometers?
                "co2": 123, // kilograms?
                "co2PerKilometer": 29.28,
            },

        ]
    }

    return (
        <div className="leaderboard-body">
            <Form>
                <Form.Group>
                    <Form.Label><h3>Select leaderboard timeline</h3></Form.Label>
                    <Form.Select style={{ "color": "white", "fontWeight":"500" }} className="bg-transparent">
                        <option>Today</option>
                        <option>This week</option>
                        <option>This month</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <Container style={{"marginTop":"5%"}}>
                <Row className='entry' style={{"marginTop":"3%", "marginBottom":"3%"}}>
                    <Col xs="1" lg="2"></Col>
                    <Col xs="3" lg="2">Username</Col>
                    <Col xs="2" lg="2">Distance</Col>
                    <Col xs="2" lg="2">CO2 emission</Col>
                    <Col xs="3" lg="2">CO2 per km</Col>
                </Row>
                {mockData.leaderboard.map((entry) => {return <PositionComponent positionEntry={entry}/>})}
            </Container>
        </div>
    );
};

export default LeaderboardsComponent;