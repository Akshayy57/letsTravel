import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import ContextApi from '../../context-api/context-api';
import DeskBell from '../../images/icons/desk-bell.svg';
import SingleBed from '../../images/icons/single-bed.svg';
import Towel from '../../images/icons/towels.svg';
import Wifi from '../../images/icons/wifi.svg';
import Hotel1 from '../../images/hotel1.jpg';
import Hotel2 from '../../images/hotel2.jpg';
import Hotel3 from '../../images/hotel3.jpg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addWhislist, getWhislist, deleteWhislist } from '../../api-service/api-service';
import { ToastContainer, toast } from 'react-toastify';


const HotelRoom = () => {

    const { state, dispatchUserEvent } = useContext(ContextApi);
    const history = useHistory();
    let userDetails = localStorage.getItem('user_data');
    userDetails = JSON.parse(userDetails);

    let [wishListData, setWishListData] = useState([]);

    // Book Room
    const handleBooking = (data) => {
        localStorage.setItem('HotelSelected', JSON.stringify(data));
        dispatchUserEvent('BOOKING', { hotel: data });
        history.push('/booking');
        // console.log(state.creds['token']);
    }

    const handleWishList = (e, hotel_id, hotel_name) => {

        let target = e.currentTarget;
        console.log(target);
        if (target.style.color === 'red') {

            //delete wishlist
            deleteWhislist({ hotel_id }).
                then(response => {
                    if (response.status === 200) {
                        target.style.color = 'rgb(176, 184, 181)';
                        toast.warn(`${hotel_name} removed from wishlist !`);
                    }
                })
                .catch(err => console.log(err));
        } else {

            //add wishlist
            addWhislist({ hotel_id })
                .then(response => {
                    if (response.status === 200) {
                        target.style.color = 'red';
                        toast.success(`${hotel_name} added to wishlist !`);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    //if user is logged in then get whislist
    useEffect(() => {
        if (userDetails) {
            getWhislist(userDetails.id).then(res => {
                setWishListData(res.data)
            }).catch(err => {
                console.log(err)
            });
            if (state.hotel && state.hotel.length > 0) toast.success('Hotel found successfully');
        }
    }, []);

    return (
        <div className="shadow-sm p-3 mb-5 bg-body rounded">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="hotel-room-title text-center">Hotel Room</h1>
                    </div>
                </div>
                {
                    state.hotel &&
                        state.hotel.length > 0 ?
                        state.hotel.map(el => (
                            <div className="row mb-3" key={el.hotel_id}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <div className="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">
                                        <div className="hotel-card_images">
                                            <div id={`boostrapCarousel${el.rent}`} className="carousel slide h-100" data-ride="carousel">
                                                <div className="carousel-inner h-100">
                                                    <div className="carousel-item active">
                                                        <img src={Hotel1} className="d-block w-100 " alt="Hotel Image" />
                                                    </div>
                                                    <div className="carousel-item ">
                                                        <img src={Hotel2} className="d-block w-100" alt="Hotel Image" />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img src={Hotel3} className="d-block w-100" alt="Hotel Image" />
                                                    </div>
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target={`#boostrapCarousel${el.rent}`} data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target={`#boostrapCarousel${el.rent}`} data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="hotel-card_info p-4">
                                            <div className="d-flex align-items-center mb-2">
                                                <h5 className="mb-0 mr-2">{el.hotel_name}</h5>
                                                <div>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                    <i className="fas fa-star text-warning"></i>
                                                </div>
                                                <a href="#!" className="text-dark ml-auto"><i className="far fa-heart fa-lg"></i></a>
                                            </div>
                                            <ul className="hotel-checklist px-0">
                                                <li className="font-weight-700">Address</li>
                                                <li className="text-muted">{el.address}</li>
                                            </ul>
                                            <div className="d-flex justify-content-between align-items-end">
                                                <div className="hotel-card_details">
                                                    <div className="text-muted mb-2">
                                                        {el.city}, {el.state}
                                                    </div>
                                                    <div className="mb-2 d-flex align-items-center">
                                                        <div>
                                                            <span className="badge bg-primary">{el.rating_clean}</span>
                                                        </div>
                                                        <ul className="hotel-checklist px-2 mb-0 d-flex">
                                                            <li className='font-weight-900'>Ratings:</li>
                                                            <li className='font-weight-500 mx-2'>Food - {el.rating_food}</li>
                                                            <li className='font-weight-500 mx-2'>Hygiene - {el.rating_clean}</li>
                                                            <li className='font-weight-500'>Safety - {el.rating_safety}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="amnities d-flex mb-3">
                                                        <img src={DeskBell} data-toggle="tooltip" data-placement="top" title="Desk bell" alt="Desk bell" />
                                                        <img src={SingleBed} data-toggle="tooltip" data-placement="top" title="Single Bed" alt="Single Bed" />
                                                        <img src={Towel} data-toggle="tooltip" data-placement="top" title="Towels" alt="Towels" />
                                                        <img src={Wifi} data-toggle="tooltip" data-placement="top" title="Wifi" alt="Wifi" />
                                                    </div>
                                                </div>
                                                <div className="hotel-card_pricing text-center">
                                                    <h3>₹{el.rent}</h3>
                                                    {/* <div className="d-flex">
                                                    <h6 className="text-striked text-muted mr-2">₹1,999</h6>
                                                    <h6 className="text-success">32% off</h6>
                                                </div> */}
                                                    {userDetails ?
                                                        (
                                                            wishListData.length > 0 ?
                                                                (
                                                                    //filter wishlist data
                                                                    wishListData.filter(
                                                                        hotel => hotel.hotel_id === el.hotel_id).length > 0 ?
                                                                        <FavoriteIcon style={{
                                                                            color: 'red',
                                                                            fontSize: '60px',
                                                                            paddingRight: '10%'
                                                                        }}
                                                                            value={el.hotel_id}
                                                                            onClick={(e) => handleWishList(e, el.hotel_id, el.hotel_name)} />
                                                                        :
                                                                        <FavoriteIcon style={{
                                                                            color: '#b0b8b5',
                                                                            fontSize: '60px',
                                                                            paddingRight: '10%'
                                                                        }}
                                                                            value={el.hotel_id}
                                                                            onClick={(e) => handleWishList(e, el.hotel_id, el.hotel_name)} />

                                                                ) : <FavoriteIcon style={{
                                                                    color: '#b0b8b5',
                                                                    fontSize: '60px',
                                                                    paddingRight: '10%'
                                                                }}
                                                                    value={el.hotel_id}
                                                                    onClick={(e) => handleWishList(e, el.hotel_id, el.hotel_name)} />
                                                        ) : ''}
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleBooking(el)}
                                                    >
                                                        Book Rooms
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :

                        <div>No Hotel Found</div>
                }
            </div>
        </div>
    )
}

export default HotelRoom