import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {
    Button, Form, FormControl, FormGroup, FormLabel,
    FormFile
} from 'react-bootstrap';

export default class UserForm extends PureComponent {

    static propTypes = {
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        countries: PropTypes.array,
        dob: PropTypes.string,
    }

    static defaultProps = {
        onClick: noop,
        onChange: noop,
        countries: [],
        dob: '',
    }

    render() {

        const { onChange, onClick, countries, dob } = this.props;

        return(
            <Form>
                <FormGroup controlId="formBasicName">
                    <FormLabel>Name</FormLabel>
                    <FormControl type="name" placeholder="Enter Name" onChange={(e) => onChange(e, 'name')} />
                </FormGroup>
                <FormGroup controlId="formBasicEmail">
                    <FormLabel>Email address</FormLabel>
                    <FormControl type="email" placeholder="Enter email" onChange={(e) => onChange(e, 'email')} />
                </FormGroup>
                <FormGroup>
                    <FormFile id="selfPic" label="Upload Image" />
                </FormGroup>
                <FormGroup controlId="exampleFormControlSelect1">
                    <FormLabel>Country</FormLabel>
                    <FormControl as="select" onChange={(e) => onChange(e, 'country')}
                        onSelect={(e) => onChange(e, 'country')}>
                        {countries.map(this.renderCountries)}
                    </FormControl>
                </FormGroup>
                <div className="form-group row">
                    <label for="example-date-input" className="col-2 col-form-label">Date Of Birth</label>
                    <div className="col-10">
                        <input className="form-control" type="date" value={dob} id="example-date-input"
                            onChange={(e) => onChange(e, 'dob')} onSelect={(e) => onChange(e, 'dob')} />
                    </div>
                </div>
                <Button variant="primary" onClick={onClick}>
                    Submit
                    </Button>
            </Form>
        )
    }
}