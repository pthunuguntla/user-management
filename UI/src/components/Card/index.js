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
    }

    static defaultProps = {
        users: [],
        onCardClick: noop,
    }

    onDeleteCard = (e, user) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onCardClick(user, 'DELETE')
    }

    arrayBufferToBase64(buffer) {
        const base64Flag = 'data:image/jpeg;base64,';
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag+ window.btoa(binary);
    };


    renderDisplayCard = (user) => {
        const { onCardClick } = this.props;
        return ( 
            <div onClick={() => onCardClick(user, 'UPDATE')}>
                <Card style={{ width: '18rem', margin: '10px', padding: '10px' }}>
                    <Card.Img variant="top" src={this.arrayBufferToBase64(user.img.data.data)} />
                    <Card.Body>
                        <Card.Title>Name : {user.name}</Card.Title>
                        <Card.Title>Email : {user.email}</Card.Title>
                        <Card.Title>Age : {moment().diff(user.dob, 'years')}</Card.Title>
                    </Card.Body>
                    <Button variant="primary" onClick={(e) => this.onDeleteCard(e, user)}>Delete User</Button>
                </Card>
            </div>
        )
    }

    render(){
        const { users } = this.props;
        return (
            <div className = "DisplayCard">
                {users.map(this.renderDisplayCard)}
            </div>
        )
    }
}

export default DisplayCard;
