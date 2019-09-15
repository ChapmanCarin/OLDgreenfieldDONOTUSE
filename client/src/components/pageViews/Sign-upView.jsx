import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Axios from "axios";

class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            varifyPass: '',
            email: '',
            business: '',
        };
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    }

    onSignUpSubmit(event) {
        event.preventDefault();
        const user = this.state;
        // axios.post('/signUp', user)
        if (user.password === user.varifyPass) {
            return axios.post('/signUp', user)
            .then(() => {
                return axios.post(`/login`, { username: user.username, password: user.password })
            })
            .then((response) => {
                const newUser = {
                    username: user.username,
                    email: user.email,
                    business: user.business,
                    userId: response.data.userId
                }
                // alert(newUser.userId)
                this.props.changeUser(newUser);
            })
        } else {
            // props.changeView('sign-up');
            alert("Your passwords don't match!")
        }
    }

    render() {
        const state = this.state;
        return (
            // <div>
            <Form onSubmit={(e) => {preventDefault(e)}}>
                <FormGroup>
                    <Label style={{ color: 'white' }} >Create User Name</Label>
                    <Input type='text' name='username' id='user-registration' value={state.username} onChange={e => this.setState({ username: e.target.value })}></Input>
                </FormGroup>
                <FormGroup>
                    <Label style={{ color: 'white' }} >Create Password</Label>
                    <Input type='password' name='password' id='password-registration' value={state.password} onChange={e => this.setState({ password: e.target.value })}></Input>
                    <FormText color="muted">password must be between 6 and 16 characters only using numbers and alphabetical characters</FormText>
                </FormGroup>
                <FormGroup>
                    <Label style={{ color: 'white' }} >Varify Password</Label>
                    <Input type='password' name='password-verify' id='password-registration-verify' value={state.varifyPass} onChange={e => this.setState({ varifyPass: e.target.value })}></Input>
                </FormGroup>
                <FormGroup>
                    <Label style={{ color: 'white' }} >Enter Email</Label>
                    <Input type='email' name='email' id='email-registration' value={state.email} onChange={e => this.setState({ email: e.target.value })}></Input>
                </FormGroup>
                <FormGroup>
                    <Label style={{ color: 'white' }} >Enter Place of Business(Optional)</Label>
                    <Input type='text' name='business' id='business-registration' value={state.business} onChange={e => this.setState({ business: e.target.value })}></Input>
                </FormGroup>
                <Button type="button" color="primary" block onClick={(e) => this.onSignUpSubmit(e)} block>Submit</Button>
            </Form>
            // </div>
        );
    }
};

export default SignUpView;
