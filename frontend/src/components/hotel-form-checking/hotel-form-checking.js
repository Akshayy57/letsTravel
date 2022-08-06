import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useForm } from 'react-hook-form';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getCities, getHotels } from '../../api-service/api-service';
import { useHistory } from 'react-router-dom';
import ContextApi from '../../context-api/context-api';
import { ToastContainer, toast } from 'react-toastify';

const HotelFormChecking = () => {

    const { dispatchUserEvent } = useContext(ContextApi);
    const history = useHistory();
    const schema = yup.object({
        destinationBudget: yup.number().typeError('Please enter valid budget').min(500, 'Min value 500'),
        location: yup.string().required('Please select location'),
        room: yup.string().required('Please select room'),
        numberOfPeople: yup.number().typeError('Please enter number of people').required(),
        checkIn: yup.string().typeError('Please select check-in date').required('Please select check-in date'),
        checkOut: yup.string().typeError('Please select check-out date').required('Please select check-out date')
    }).required();

    const [selectedDate, setSelectedDate] = useState({
        checkIn: null,
        checkOut: null
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const [selectedValue, setSelectedValue] = useState({
        location: [],
        room: []
    });
    const [options, setOptions] = useState([]);
    const roomOptions = [
        { id: 0, room: 'Family', },
        { id: 1, room: 'Couples' },
        { id: 2, room: 'Newly Married Couples' },
        { id: 3, room: 'Personal' }
    ];

    // Getting Cities
    const getAllCities = async () => {
        let response = await getCities();
        if (response.status === 200) {
            setOptions(response.data);
        } else {
            setOptions([])
        }
    }

    const handleCountry = data => {
        setSelectedValue({ ...selectedValue, location: data });
    }

    const handleDateChange = (dateCheck, date) => {
        console.log(dateCheck, date);
        if (dateCheck === 'checkIn') {
            setSelectedDate({ ...selectedDate, checkIn: date });
        } else {
            setSelectedDate({ ...selectedDate, checkOut: date });
        }
    }

    const [Formvalue, setFormValue] = useState(
        localStorage.getItem('hotelForm') || ''
    );

    useEffect(() => {
        localStorage.setItem('hotelForm', Formvalue);
    }, [Formvalue]);

    // Submiting Data
    const onSubmit = async (data) => {

        let payload = {
            "city": data.location,
            "budget": data.destinationBudget,
            "checkin": data.checkIn,
            "checkout": data.checkOut,
            "rooms": data.room,
            "persons": data.numberOfPeople,
            "hotelName": data.hotelName ? data.hotelName : ""
        };

        setFormValue(JSON.stringify(payload));
        
        let response = await getHotels(payload);

        if (response) {
            if (response.status === 200) {
                dispatchUserEvent('ADD_HOTEL', { addHotel: response.data });
                history.push('/hotels');
            }   
        } else {
            toast.error("Facing some error");
        }

    }

    useEffect(() => {
        getAllCities();
        reset({
            location: selectedValue.location.length > 0 ? selectedValue.location[0].id : '',
            room: selectedValue.room.length > 0 ? selectedValue.room[0].id : '',
            checkIn: selectedDate.checkIn ? selectedDate.checkIn : null,
            checkOut: selectedDate.checkOut ? selectedDate.checkOut : null,
        })
    }, [selectedValue, selectedDate])

    return (
        <div className="banner-tabs shadow-sm p-3 mb-5 bg-body rounded">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="tabs">
                            <div className="tab-content bg-custom-white bx-wrapper padding-20">
                                <div className="tab-pane active" id="hotel">
                                    <div className="tab-inner">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-3">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            {...register("destinationBudget")}
                                                            className="form-control form-control-custom"
                                                            placeholder="Enter Budget per room"
                                                            />
                                                        <p className={errors.destinationBudget && 'log-error'}>{errors.destinationBudget?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-3">
                                                    <div className='form-group'>
                                                        <Typeahead
                                                            {...register("location")}
                                                            id="basic-typeahead-single"
                                                            labelKey={option => `${option.city}, ${option.state}`}
                                                            onChange={handleCountry}
                                                            options={options}
                                                            placeholder="Enter Location"
                                                            selected={selectedValue.location}
                                                        />
                                                        <p className={errors.location && 'log-error'}>{errors.location?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-3">
                                                    <div className='form-group'>
                                                        <Typeahead
                                                            {...register("room")}
                                                            id="basic-typeahead-single"
                                                            labelKey="room"
                                                            onChange={(data) => setSelectedValue({ ...selectedValue, room: data })}
                                                            options={roomOptions}
                                                            placeholder="Choose Room"
                                                            selected={selectedValue.room}
                                                        />
                                                        <p className={errors.room && 'log-error'}>{errors.room?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-3">
                                                    <div className="form-group">
                                                        <input type="text" {...register("numberOfPeople")}
                                                            className="form-control form-control-custom"
                                                            placeholder="Enter No of People" />
                                                        <p className={errors.numberOfPeople && 'log-error'}>{errors.numberOfPeople?.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row align-items-end my-2'>
                                                <div className="col-lg-3 col-md-3">
                                                    <div className="form-group">
                                                        <input type="text" {...register("hotelName")}
                                                            className="form-control form-control-custom"
                                                            placeholder="Enter Hotel Name"
                                                        />
                                                    </div>
                                                </div>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <div className="col-lg-3 col-md-3">
                                                        <KeyboardDatePicker
                                                            {...register("checkIn")}
                                                            autoOk
                                                            fullWidth
                                                            value={selectedDate.checkIn}
                                                            placeholder="00-00-0000"
                                                            onChange={(date, e) => handleDateChange('checkIn', e)}
                                                            minDate={new Date()}
                                                            format="MM-dd-yyyy"
                                                        />
                                                        {
                                                            errors.checkIn &&
                                                            <p className={errors.checkIn && 'log-error'}>{errors.checkIn?.message}</p>
                                                        }

                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <KeyboardDatePicker
                                                            {...register("checkOut")}
                                                            autoOk
                                                            fullWidth
                                                            value={selectedDate.checkOut}
                                                            placeholder="00-00-0000"
                                                            onChange={(date, e) => handleDateChange('checkOut', e)}
                                                            minDate={new Date()}
                                                            format="MM-dd-yyyy"
                                                        />
                                                        {
                                                            errors.checkOut &&
                                                            <p className={errors.checkOut && 'log-error'}>{errors.checkOut?.message}</p>
                                                        }
                                                    </div>
                                                </MuiPickersUtilsProvider>
                                                <div className='col-md-3'>
                                                    <div className='d-flex justify-content-end'>
                                                        <Button type='submit' variant="contained" color='primary' size='small' disableElevation>
                                                            Check Availability
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelFormChecking