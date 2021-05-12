import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

import { Button, Form, FormControl, FormGroup, FormLabel, 
     FormFile } from 'react-bootstrap';
import { addUser, getAllUsers, fetchAllCountries, updateUserDetails, deleteExistingUser } from '../../actions/userAction';
import './Users.css';


import countriesData from '../../mockdata/countries';

import DisplayCard from '../Card'
import Message from '../Message';



const buttonMap = {
    'CREATE' : 'Add User',
    'UPDATE' : 'Update User',
    'DELETE' : 'Delete User'
}


const formMap = {
    'CREATE': 'Create an User',
    'UPDATE': 'Edit an User',
}


const mapStateToProps = state => {
    const userObj = state.userreducer.userObj;
    const users = state.userreducer.users;
    const noOfUsers = state.userreducer.noOfUsers;
    const countries = countriesData;
    const isError = state.userreducer.isError;
    const errorMessage = state.userreducer.message;    
    return {
        userObj,
        users,
        noOfUsers,
        countries,
        isError,
        errorMessage
    }
};

const mapDispatchToProps = dispatch => ({
    createUser: (name, email, country, dob, image) => {
        addUser(name, email, country, dob, image, dispatch)
    },
    updateUser: (userInfo) => {
        updateUserDetails(userInfo, dispatch)
    },
    deleteUser: (userInfo) => {
        deleteExistingUser(userInfo, dispatch)
    },
    getUsers: () => {
        getAllUsers(dispatch)
    },
    getAllCountries: () => {
        fetchAllCountries(dispatch)
    }
});

class Users extends PureComponent {

    static propTypes = {
        createUser: PropTypes.func,
        getUsers: PropTypes.func,
        updateUser: PropTypes.func,
        deleteUser: PropTypes.func,
        userObj: PropTypes.object,
        users: PropTypes.array,
        noOfUsers: PropTypes.number,
        errorMessage: PropTypes.string,
        isError: PropTypes.bool,
    }

    static defaultProps = {
        serviceType: '',
        userObj: {},
        users: [],
        countries: []
    }

    state = {
        name: '',
        email: '',
        image: '',
        country: '',
        dob: '',
        renderForm : false,
        userInfo: {},
        action: 'CREATE',
        isLoading: false,
    }

    onChange = (e, stateLabel) => {
        const { userInfo } = this.state;

        const newUserInfo = cloneDeep(userInfo);
        newUserInfo[stateLabel] = stateLabel !== 'image' ? e.target.value : e.target.files[0];
        

        this.setState({
            [stateLabel]: e.target.value,
            userInfo: newUserInfo,
        })
    }


    componentDidMount(){
        this.props.getUsers();
        this.props.getAllCountries();
    }


    onClick = async (userInfo) => {
        const { name, email, country, dob, action, userInfo: { image } } = this.state;
        if(action === 'CREATE') {
            this.setState({
                isLoading: true
            })
            await this.props.createUser(name, email, country, dob, image);
            this.setState({
                isLoading: false
            })
        }
        if(action === 'UPDATE') {
            await this.props.updateUser(userInfo);
        }
        this.setState({
            renderForm: false,
            dob: ''
        })
    }

    onCardClick = async (userInfo, action) => {
        if(action === 'DELETE') {
            await this.props.deleteUser(userInfo);
            this.setState({
                userInfo: {},
                action: 'CREATE'
            })
        } else {
            this.setState({
                renderForm: true,
                userInfo,
                action
            })
        }       
    }

    onCancelClick = () => {
        this.setState({
            renderForm: false,
        })
    }

    onAddUser = (user) => {
        this.setState({
            renderForm: true,
            userInfo: {},
            action: 'CREATE'
        })
    }

    renderCountries = (country) => {
        return(
            <option>{country.name}</option>
        )
    }

    renderFormComponent = () => {
        const { dob, userInfo, action, image } = this.state;
        const { countries } = this.props;

        const { name, email, country } = userInfo

        const buttonName = buttonMap[action];

        return(
            <Fragment >
                <h2>{formMap[action]}</h2>
                <Form>
                    <FormGroup controlId="formBasicName">
                        <FormLabel>Name</FormLabel>
                        <FormControl type="name" placeholder="Enter Name" value={name} onChange={(e) => this.onChange(e, 'name')} />
                    </FormGroup>
                    <FormGroup controlId="formBasicEmail">
                        <FormLabel>Email address</FormLabel>
                        <FormControl type="email" placeholder="Enter email" onChange={(e) => this.onChange(e, 'email')} value={email} />
                    </FormGroup>
                    <FormGroup>
                        <FormFile id="selfPic" label="Upload Image" value={image.name} onChange={(e) => this.onChange(e, 'image')}/>
                    </FormGroup>
                    <FormGroup controlId="exampleFormControlSelect1">
                        <FormLabel>Country</FormLabel>
                        <FormControl as="select" onChange={(e) => this.onChange(e, 'country')}
                            onSelect={(e) => this.onChange(e, 'country')} value={country}>
                            {countries.map(this.renderCountries)}
                        </FormControl>
                    </FormGroup>
                    <div className="form-group row">
                        <label for="example-date-input" className="col-2 col-form-label">Date Of Birth</label>
                        <div className="col-10">
                            <input className="form-control" type="date" value={userInfo.dob || dob} id="example-date-input"
                                onChange={(e) => this.onChange(e, 'dob')} onSelect={(e) => this.onChange(e, 'dob')} />
                        </div>
                    </div>
                    <Button variant="primary" onClick={() =>this.onClick(userInfo)}>{buttonName}</Button>
                    {action === 'UPDATE' && <Button className="CancelButton" variant="secondary" 
                    onClick={this.onCancelClick}>Cancel</Button>}
                </Form>
            </Fragment>
           
        )
    }


   renderUserCard = () => {
        return ( <DisplayCard />)
   }

 
   render() {
       const { userObj, users, isError, errorMessage } = this.props;
       const { renderForm, isLoading } = this.state;
       const type = isError ? 'danger' : 'success';

        return (
            <Fragment>
                <div className="User">
                    {errorMessage ? <Message type={type} message={errorMessage} /> : <div/>}
                    {users.length && !renderForm ? <Button variant="primary" onClick={this.onAddUser}>
                        Add User
                    </Button> : <div/>} 
                    {(isEmpty(userObj) && !users.length) || renderForm || type === 'danger' ? (this.renderFormComponent()) : 
                        <DisplayCard onCardClick={(user, action) => this.onCardClick(user, action)} users={users} isLoading={isLoading}/> }
                </div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
