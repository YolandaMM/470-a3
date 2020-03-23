import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import { App } from './App';

class InputArea extends React.Component{
    render(){
        state = {
            users: [],
            user: {
              name: 'none',
              email: 'none',
              age: '' ,
              gender: '/',
              description: 'none'
            }
          }
        
          componentDidMount() {
            this.getUsers();
          }
        
          getUsers = _ => {
            fetch(`http://localhost:4000/users`)
              .then(response => response.json())
              .then(response => this.setState({ users: response.data}))
              .catch(err => console.error(err))
          }
        
          createUser = _ => {
            const { user } = this.state;
            fetch(`http://localhost:4000/users/create?name=${user.name}&email=${user.email}&age=${user.age}&gender=${user.gender}&description=${user.description}`)
              .then(this.getUsers)
              .catch(err => console.error(err))
            window.location.reload(false);
          }
        return (
            <div>
                <Card className="inputarea">
                    <Card.Img variant="top" scr=""/>
                    <Card.Body>
                        <div className="inputid" id="inputid">
                        <Form>
                            <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="textbox" placeholder="Enter name"
                            required="required"
                            onChange={e => this.setState({ user: { ...user, name: e.target.value }})}/>
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                            required="required"
                            onChange={e => this.setState({ user: { ...user, email: e.target.value }})}/>  
                            </Form.Group>

                            <p>Age</p>
                            <input id="formAge" className="formAge" 
                            value={user.age} 
                            placeholder="Please enter age"
                            required="required"
                            onChange={e => this.setState({ user: { ...user, age: e.target.value }})}/>
                            <br/><br/>

                            <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" custom
                            required="required"
                            onChange={e => this.setState({ user: { ...user, gender: e.target.value }})}>
                                <option>/</option>
                                <option onClick={e => this.setState({ user: { ...user, gender: e.target.value }})}>Male</option>
                                <option onClick={e => this.setState({ user: { ...user, gender: e.target.value }})}>Female</option>
                            </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter further information..."
                            onChange={e => this.setState({ user: { ...user, description: e.target.value}})}/>
                            </Form.Group>
                        </Form>
                        </div>
                        <Button variant="outline-dark" 
                        id="submit_btn" 
                        onClick={this.createUser}>Submit
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default InputArea;