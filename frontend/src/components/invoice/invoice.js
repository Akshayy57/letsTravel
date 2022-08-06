import React, { useState, useEffect, useContext } from 'react';
import ContextApi from '../../context-api/context-api';
import './loader.css';

const Invoice = () => {

    const { state } = useContext(ContextApi);
    const currDate = new Date();
    const [invoiceDate, setInvoiceDate] = useState(currDate.toDateString());
    const [invoiceData, setInvoiceData] = useState([]);
    const [uniqueNum, setUniqueNum] = useState(new Date().valueOf());
    const [isLoading, setIsLoading] = useState(true);

    const downloadInvoice = () => {
        window.print();
    }

    const gettingData = () => {
        const hotelForm = JSON.parse(localStorage.getItem('hotelForm'));
        const hotelSelected = JSON.parse(localStorage.getItem('HotelSelected'));
        const userData = JSON.parse(localStorage.getItem('user_data'));

        if (hotelForm, hotelSelected, userData) {
            setInvoiceData({ ...invoiceData, ...hotelForm, ...hotelSelected, ...userData, subTotal: state.subTotal });
        }
    }
    useEffect(() => {
        setTimeout(() => {
            gettingData();
            setIsLoading(false);
        }, 2000);
    }, [state]);


    return (
        <div className="container">
            {isLoading ?
                <div style={{ textAlign : "center"}}>
                    <div className='loader'></div>
                    <p>Please Wait ....</p>
                </div>
                :
                <div className="card">
                    <div className="card-header d-flex align-items-center">
                        <p className='my-0 d-flex'>
                            <span className="fw-bolder mr-2">Invoice </span>#{uniqueNum}
                        </p>
                        <p className='mb-0 w-100 d-flex justify-content-end'>
                            <strong>
                                {invoiceDate}
                            </strong>
                        </p>
                    </div>
                    <div className="card-body">
                        <div className="row mb-4">
                            <div className="col-sm-6">
                                <h6 className="mb-3">From:</h6>
                                <div>
                                    <strong>Lets Travel</strong>
                                </div>
                                <div>Email: support@letstravel.com</div>
                                <div>Phone: +22 2222 4444 22</div>
                            </div>
                            <div className="col-sm-6">
                                <h6 className="mb-3">To:</h6>
                                <div>
                                    <strong>
                                        {invoiceData.full_name}
                                    </strong>
                                </div>
                                <div>Email: {invoiceData.email}</div>
                                <div>Phone: {invoiceData.phone}</div>
                            </div>
                        </div>
                        <div className="table-responsive-sm">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="center">#</th>
                                        <th>Hotel Name</th>
                                        <th className="right">Unit Cost</th>
                                        <th className="right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="center">1</td>
                                        <td className="left strong">{invoiceData.hotel_name}</td>
                                        {/* <td className="left">{invoiceData.budget}</td> */}
                                        <td className="left">{invoiceData.rent}</td>
                                        <td className="right">{invoiceData.subTotal && invoiceData.subTotal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='my-3 dwn-invoice'>
                            <button className='btn btn-primary' onClick={downloadInvoice}>
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Invoice;