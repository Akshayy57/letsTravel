import React from 'react';
import ReactLoading from 'react-loading';
 
export const Loader = ({ type, color }) => (
    <ReactLoading type={type} color="primary" height={'100vh'} width={80} className="loader-design" />
);