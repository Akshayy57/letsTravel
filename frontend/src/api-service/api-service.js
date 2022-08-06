import axios from 'axios';

let URL = 'http://localhost:5000/'
let headers = {
    token: localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')).token : ''
}

const checkingToken = () => {
    headers = {
        token: localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')).token : ''
    }
}

export const getCities = async () => {
    checkingToken();
    return await axios.get(`${URL}getCities`)
        .then(response => response)
        .catch(err => console.log(err))
}

// Getting Hotel
export const getHotels = async (data) => {
    return await axios.post(`${URL}hotels`, data)
        .then(response => response)
        .catch(err => console.log(err))
}

// Getting Login
export const Credslogin = async (data) => {
    return await axios.post(`${URL}user/login`, data)
        .then(response => response)
        .catch(err => console.log(err))
}

// Register
export const CredsRegister = async (data) => {
    return await axios.post(`${URL}user/register`, data)
        .then(response => response)
        .catch(error => error.response);
}

// Getting Hotel
export const BookHotel = async (data) => {
    checkingToken();
    return await axios.post(`${URL}hotels/book`, data, { headers: headers })
        .then(response => response)
        .catch(err => console.log(err))
}

//add whislist
export const addWhislist = async (data) => {
    checkingToken();
    return await axios.post(`${URL}wishlist/add`, data, { headers: headers })
        .then(response => response)
        .catch(err => console.log(err))
}

//Get Wishlist
export const getWhislist = async () => {
    checkingToken();
    return await axios.get(`${URL}wishlist/get`, { headers: headers })
        .then(response => response)
        .catch(err => console.log(err))
}

//delete wishlist
export const deleteWhislist = async (data) => {
    checkingToken();
    return await axios.post(`${URL}wishlist/delete`, data, { headers: headers })
        .then(response => response)
        .catch(err => console.log(err))
}

//Get booking history
export const getBookingHistory = async () => {
    checkingToken();
    return await axios.get(`${URL}hotels/getHistory`, { headers: headers })
        .then(response => response)
        .catch(err => console.log(err))
}
