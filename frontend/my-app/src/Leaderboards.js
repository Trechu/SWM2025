import { useEffect, useState } from 'react';
import './Leaderboards.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_URL } from './consts';

function PositionComponent({ positionEntry }) {

    

    return (
        <Row className='entry entry-border'>
            <Col xs="1" lg="2">{positionEntry.position}</Col>
            <Col xs="2" lg="2">{positionEntry.username}</Col>
            <Col xs="3" lg="2">{(parseInt(positionEntry.distance)/1000).toFixed(2) + " km"}</Col>
            <Col xs="3" lg="2">{(parseInt(positionEntry.co2)/1000000).toFixed(2) + " kg"}</Col>
            <Col xs="3" lg="2">{(positionEntry.co2PerKilometer).toFixed(2) + " g/km"}</Col>
        </Row>
    );
};



function LeaderboardsComponent() {

    const [date, setDate] = useState('today');
    const [leaderboard, setLeaderboard] = useState({leaderboard: []});

    function fetchLeaderboards(){
        fetch(API_URL + "/users/" + sessionStorage.getItem('id') + "/leaderboard?time=today", {
            method: "GET",
        }).then(res => res.json()).then(data => {
            console.log(data);
            setLeaderboard(data);
        })
    }

    function handleFormChoice(event) {
        setDate(event.target.value);
        console.log(event.target.value);
    }

    useEffect(() => {
        fetchLeaderboards();
    }, [date])

    return (
        <div className="leaderboard-body">
            <Form>
                <Form.Group>
                    <Form.Label><h3>Select leaderboard timeline</h3></Form.Label>
                    <Form.Select style={{ "color": "white", "fontWeight":"500" }} className="bg-transparent" onChange={handleFormChoice}>
                        <option value="today">Today</option>
                        <option value="week">This week</option>
                        <option value="month">This month</option>
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
                {leaderboard.leaderboard.map((entry) => {return <PositionComponent positionEntry={entry}/>})}
            </Container>
        </div>
    );
};

export default LeaderboardsComponent;