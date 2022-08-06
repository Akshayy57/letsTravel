import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Stack, Button } from 'react-bootstrap';
import Hotel1 from '../../images/hotel1.jpg';
import Hotel2 from '../../images/hotel2.jpg';
import Hotel3 from '../../images/hotel3.jpg';
import { getBookingHistory } from '../../api-service/api-service';

const BookingHistory = () => {

    const selectRandomHotel = () => {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        switch (randomNumber) {
            case 1:
                return Hotel1;
            case 2:
                return Hotel2;
            case 3:
                return Hotel3;
            default:
                return Hotel1;
        }
    }

    const [getBookings, setBooking] = useState([]);

    useEffect(() => {
        getBookingHistory().then(response => {
            console.log(response)
            setBooking(response.data);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div className="banner-tabs shadow-sm p-3 mb-5 bg-body rounded">
            <div className="col-12 mb-3">
                <h3>Booking History </h3>
            </div>
            <Container>
                {
                    getBookings.length > 0 ?
                        getBookings.map((booking, index) => {
                            return (
                                <div key={index}>
                                    <Row className='mt-5 mb-5'>
                                        <Col >
                                            <Card style={{ width: '15rem' }}>
                                                <Card.Img variant="top" src={selectRandomHotel()} />
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Stack gap={2}>
                                                <Card.Title>{booking.hotel_name}</Card.Title>
                                                <Card.Text>
                                                    <p>{booking.address}</p>
                                                    <p>{booking.city}</p>
                                                    <p>{booking.state}</p>
                                                </Card.Text>
                                            </Stack>
                                        </Col>
                                        <Col><Stack gap={2}>
                                            <Card.Title>Booking Details</Card.Title>
                                            <Card.Text>
                                                <p>Booking Amount : ₹ {booking.total_rent} /-</p>
                                                <p>{booking.checkin} To {booking.checkout}</p>
                                                <p>{booking.persons} Guest, {booking.rooms} Room</p>
                                            </Card.Text>
                                        </Stack></Col>
                                    </Row>
                                    <hr></hr>
                                </div>
                            )
                        })
                        :
                        <div className="text-center">
                            <h3>No Booking History</h3>
                        </div>
                }
            </Container>
        </div>
    )
}

export default BookingHistory