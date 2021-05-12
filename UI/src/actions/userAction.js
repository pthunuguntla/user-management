
import { url } from '../core/constant';
import countries from '../mockdata/countries';

const addUser = (name, email, country, dob, imageFile,  dispatch) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('dob', dob);

    const requestOptions = {
        method: 'POST',
        body: formData
    };
    fetch(`${url.serverUrl}create`, requestOptions)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: 'Create',
                userObj: data.data,
                message: data.message || 'Created Succesfully',
                isError: data.message !== undefined
            })
        })    
}

const getAllUsers = (dispatch) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
        },
    };
    fetch(`${url.serverUrl}userInfos`, requestOptions)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: 'Fetch',
                users: data.users,
                noOfUsers : data.numberOfUsers
            })
        });
}


const updateUserDetails = (userInfo, dispatch) => {

    const { name, email, dob, country, _id, image} = userInfo;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('dob', dob);
 
    const requestOptions = {
        method: 'PUT',
        body: formData
    };
    fetch(`${url.serverUrl}updatebyid/${_id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: 'Update',
                updatedUser: data.user,
                message: 'Updated Succesfully'
            })
        });
}


const deleteExistingUser = (userInfo, dispatch) => {
    const { _id } = userInfo;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
        },
    };
    fetch(`${url.serverUrl}deletebyid/${_id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: 'Delete',
                user: data.user,
                message: 'Deleted Succesfully'
            })
        });
}

const fetchAllCountries = dispatch => {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "Access-Control-Allow-Origin": "*",
    //         "Accept": "application/json",
    //     },
    // };
    // fetch(url.countryUrl, requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //         dispatch({
    //             type: 'FetchAllCountries',
    //             countries: data
    //         })
    //     });
    dispatch({
        type: 'FetchAllCountries',
        countries: countries
    })
}

export {
    addUser,
    getAllUsers,
    fetchAllCountries,
    updateUserDetails,
    deleteExistingUser,
}