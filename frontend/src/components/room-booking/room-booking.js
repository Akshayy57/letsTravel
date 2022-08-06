import React, { useState, useContext, useEffect } from 'react';
import ContextApi from '../../context-api/context-api';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import {
    Form, Card, Button, Row,
    Col, Container, Stack
} from 'react-bootstrap';
import Hotel1 from '../../images/hotel1.jpg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { BookHotel } from '../../api-service/api-service';


const RoomBooking = () => {
    const [validated, setValidated] = useState(false);
    const { dispatchUserEvent } = useContext(ContextApi);
    const history = useHistory();
    let userDetails = localStorage.getItem('user_data');
    let getHotelData = localStorage.getItem('HotelSelected');
    let getHotelForm = localStorage.getItem('hotelForm');
    userDetails = JSON.parse(userDetails);
    getHotelForm = JSON.parse(getHotelForm);
    getHotelData = JSON.parse(getHotelData);
    let fromDate;
    let toDate;
    const schema = yup.object({
        rooms: yup.string().required('Please select room'),
        person: yup.number().typeError('Please enter number of people').required(),
        checkIn: yup.string().typeError('Please select check-in date').required('Please select check-in date'),
        checkOut: yup.string().typeError('Please select check-out date').required('Please select check-out date'),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
        roomNeeded: yup.string().required('Please enter No. of room needed as required')
    }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const [bkData, setBkData] = useState({
        fname: userDetails?.full_name,
        email: userDetails?.email,
        rooms: getHotelForm?.rooms,
        person: getHotelForm?.persons,
        checkIn: getHotelForm?.checkin,
        checkOut: getHotelForm?.checkout,
        roomNeeded: '',
        terms: false,
        totalPrice: getHotelData?.rent,
    });
    const roomOptions = [
        { id: 0, room: 'Family', },
        { id: 1, room: 'Couples' },
        { id: 2, room: 'Newly Married Couples' },
        { id: 3, room: 'Personal' }
    ];
    
    if (getHotelForm) {
        fromDate = getHotelForm.checkin.split('-');
        fromDate = fromDate[1] + "-" + fromDate[0] + "-" + fromDate[2];
        toDate = getHotelForm.checkout.split('-');
        toDate = toDate[1] + "-" + toDate[0] + "-" + toDate[2];
    }

    // Handle Change
    const handleDateChange = (dateCheck, date) => {
        console.log(dateCheck, date);
        if (dateCheck === 'checkIn') {
            setBkData({ ...bkData, checkIn: date });
        } else {
            setBkData({ ...bkData, checkOut: date });
        }
    }

    //handle room change
    const handleRoomChange = (e) => {
        setBkData({
            ...bkData,
            totalPrice: parseInt(getHotelData.rent) * e.target.value,
            roomNeeded: e.target.value
        });
    }

    // Submit Data
    const onSubmit = async (data) => {
        console.log('data', data);
        if (bkData.terms) {
            
            let BookingData = {
                hotel_id: getHotelData.hotel_id,
                rooms: bkData.roomNeeded,
                persons: bkData.person,
                checkin: bkData.checkIn,
                checkout: bkData.checkOut,
                totalPrice: bkData.totalPrice,
            }

            let response = await BookHotel(BookingData);
            if (response.status === 200) {
                history.push('/invoice');
                dispatchUserEvent('BOOKING', { subTotal: bkData.totalPrice });
            } else {
                history.push('/');
            }
        } else {

        }
    }

    useEffect(() => {
        if (bkData.fname && bkData.email) {
            reset({
                fname: bkData.fname,
                email: bkData.email,
                rooms: bkData.rooms,
                person: bkData.person,
                checkIn: bkData.checkIn,
                checkOut: bkData.checkOut,
                roomNeeded: bkData.roomNeeded,
                terms: bkData.terms,
                totalPrice: bkData.totalPrice,

            })
        }
    }, [bkData])

    return (
        <div className="banner-tabs shadow-sm p-3 mb-5 bg-body rounded">
            {
                userDetails ?
                    (getHotelData ?
                        <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12 mb-3">
                                <h3>Booking Summary </h3>
                            </div>
                            <Container>
                                <Row className="mb-12">
                                    <Col>
                                        <Card className="card1">
                                            <Card.Img variant="top" src={Hotel1} />
                                            <Card.Body>
                                                <Card.Title>{getHotelData.hotel_name}</Card.Title>
                                                <Card.Text>
                                                    <b className='mb-3'>₹ {getHotelData.rent} /- per room</b> <br></br>
                                                    <br></br>
                                                    <b>Address : </b>&nbsp; {getHotelData.address} <br></br>
                                                    {getHotelData.city}, {getHotelData.state}
                                                </Card.Text>
                                                {/* <Button variant="primary">Go to Hotel </Button> */}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Stack direction="horizontal" gap={3} className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail" >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    {...register("fname")}
                                                    type="text"
                                                    defaultValue="Mark"
                                                    isValid={bkData.fname && !errors.fname}
                                                    disabled />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    {...register("email")}
                                                    type="email"
                                                    defaultValue="Mark"
                                                    isValid={bkData.email && !errors.email}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Stack>
                                        <Stack direction="horizontal" gap={3} className="mb-3">
                                            <Form.Group as={Col} >
                                                <Form.Label>Choose Room</Form.Label>
                                                <Form.Select aria-label=""
                                                    {...register("rooms")}
                                                    onChange={(e) => setBkData({ ...bkData, rooms: e.target.value })}
                                                >
                                                    <option value="">Select room type</option>
                                                    {roomOptions.map((room) => {
                                                        if (room.id === parseInt(bkData.rooms)) {
                                                            return (
                                                                <option key={room.id} value={room.id} >{room.room}</option>
                                                            )
                                                        } else {
                                                            return (
                                                                <option key={room.id} value={room.id} >{room.room}</option>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </Form.Select>
                                                {
                                                    errors.rooms &&
                                                    <p className={errors.rooms && 'log-error'}>{errors.rooms?.message}</p>
                                                }
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Guests</Form.Label>
                                                <Form.Control
                                                    {...register("person")}
                                                    isInvalid={bkData.person && !!errors.person}
                                                    type="text"
                                                />
                                                {
                                                    errors.person &&
                                                    <p className={errors.person && 'log-error'}>{errors.person?.message}</p>
                                                }
                                            </Form.Group>
                                        </Stack>
                                        <Stack direction="horizontal" gap={3} className="my-4">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Form.Group as={Col} >
                                                    <KeyboardDatePicker
                                                        {...register("checkIn")}
                                                        autoOk
                                                        fullWidth
                                                        value={bkData.checkIn}
                                                        placeholder="00-00-0000"
                                                        onChange={(date, e) => handleDateChange('checkIn', e)}
                                                        minDate={new Date()}
                                                        format="MM-dd-yyyy"
                                                    />
                                                    {
                                                        errors.checkIn &&
                                                        <p className={errors.checkIn && 'log-error'}>{errors.checkIn?.message}</p>
                                                    }
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridEmail" >
                                                    <KeyboardDatePicker
                                                        {...register("checkOut")}
                                                        autoOk
                                                        fullWidth
                                                        value={bkData.checkOut}
                                                        placeholder="00-00-0000"
                                                        onChange={(date, e) => handleDateChange('checkOut', e)}
                                                        minDate={new Date()}
                                                        format="MM-dd-yyyy"
                                                    />
                                                    {
                                                        errors.checkOut &&
                                                        <p className={errors.checkOut && 'log-error'}>{errors.checkOut?.message}</p>
                                                    }
                                                </Form.Group>
                                            </MuiPickersUtilsProvider>
                                        </Stack>
                                        <Stack direction="horizontal" gap={3} className="col-md-6">
                                            <Form.Group as={Col}>
                                                <Form.Label>No. of Rooms</Form.Label>
                                                <Form.Control
                                                    {...register("roomNeeded")}
                                                    isInvalid={bkData.roomNeeded && !!errors.roomNeeded}
                                                    type="text"
                                                    onChange={(e) => handleRoomChange(e)}
                                                />
                                                {
                                                    errors.roomNeeded &&
                                                    <p className={errors.roomNeeded && 'log-error'}>{errors.roomNeeded?.message}</p>
                                                }
                                            </Form.Group>
                                        </Stack>
                                        <Stack direction="horizontal" gap={3} className="my-4">
                                            <div className='fw-bolder'>
                                                Total Price
                                            </div>
                                            <div className="fw-bolder">
                                                ₹ {bkData.totalPrice} /-
                                                <Form.Control
                                                    {...register("totalPrice")}
                                                    type="hidden"
                                                    defaultValue={bkData.totalPrice}
                                                >
                                                </Form.Control>
                                                {' '}per day.
                                            </div>
                                        </Stack>
                                        <Stack gap={2} className="mx-auto mb-3">
                                            <Form.Group className="mb-3" id="formGridCheckbox">
                                                <Form.Check
                                                    {...register("terms")}
                                                    label="Agree to terms and conditions"
                                                    onChange={(e) => setBkData({ ...bkData, terms: true })}
                                                    isInvalid={!bkData.terms && !!errors.terms}
                                                />
                                            </Form.Group>
                                        </Stack>
                                        <Button variant="primary" className="bg-success" type="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form> :
                        <div className="col-12 mb-3">
                            <h3>Please Select Hotel Again in order to Proceed</h3>
                        </div>
                    )
                    : <div className="col-12 mb-3">
                        <h3>Error </h3>
                        <p>Please login/SignUp to book a room</p>
                    </div>
            }
        </div>
    )
}

export default RoomBooking;