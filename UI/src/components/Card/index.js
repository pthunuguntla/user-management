import React, { PureComponent } from 'react';
import moment from 'moment';
import noop from 'lodash/noop';


import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';
import './Card.css'


class DisplayCard extends PureComponent {

    static propTypes = {
        getUsers: PropTypes.func,
        users: PropTypes.array,
        noOfUsers: PropTypes.number,
        onCardClick: PropTypes.func,
        isLoading: PropTypes.bool
    }

    static defaultProps = {
        users: [],
        onCardClick: noop,
        isLoading: false
    }

    onDeleteCard = (e, user) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onCardClick(user, 'DELETE')
    }

    arrayBufferToBase64(user) {
        if(user.img && user.img.data && user.img.data.data){
            const buffer = user.img.data.data;
            const base64Flag = 'data:image/jpeg;base64,';
            let binary = '';
            const bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            return base64Flag + window.btoa(binary);
        } else {
            return 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png'
        }
       
    }


    renderDisplayCard = (user) => {
        const { onCardClick } = this.props;
        if(user){
            return (
                <div onClick={() => onCardClick(user, 'UPDATE')} key={user._id}>
                    <Card style={{ width: '18rem', margin: '10px', padding: '10px' }}>
                        <Card.Img variant="top" src={this.arrayBufferToBase64(user)} />
                        <Card.Body>
                            <Card.Title>Name : {user.name}</Card.Title>
                            <Card.Title>Email : {user.email}</Card.Title>
                            <Card.Title>Age : {moment().diff(user.dob, 'years')}</Card.Title>
                        </Card.Body>
                        <Button variant="primary" onClick={(e) => this.onDeleteCard(e, user)}>Delete User</Button>
                    </Card>
                </div>
            )
        } else {
            return(<div/>)
        }
        
    }

    render(){
        const { users, isLoading } = this.props;
        return (
            <div className = "DisplayCard">
                {!isLoading && users.length? users.map(this.renderDisplayCard) : <div/> }
            </div>
        )
    }
}

export default DisplayCard;
