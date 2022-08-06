import React, { useState } from 'react'
// import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HotelFormChecking from '../../components/hotel-form-checking/hotel-form-checking';

function Banner() {
    const history = useHistory();

    return (
        <div className='banner'>
            <div className='banner__info'>
                <h1>Find your Hotels here..</h1>
                <h6>
                   We have got you covered with amazing deals at thousands of top hotels in different cities.
                </h6>
            </div>
            <div className="hotel-form-checker">
                <HotelFormChecking />
            </div>
        </div>
    )
}

export default Banner
