import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Alert } from 'react-bootstrap';
import './Message.css'

class Message extends PureComponent {
    static propTypes = {
        type: PropTypes.string,
        message: PropTypes.string,

    }
    static defaultProps = {
        type: 'success',
        message: 'Action Performed Succesfully',
    }

    render(){
        const { message, type } = this.props;
        return(
            <Alert variant={type}>
                {message}
            </Alert>
        )
    }
}

export default Message;