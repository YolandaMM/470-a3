import React, {Component} from 'react';
import {Modal, Button, Card, Form} from 'react-bootstrap';
import './EditUserModal.css';

export class EditUserModal extends Component{
    constructor(props){
        super(props);
    }

    state = {
        euser: {
          id: '',
          name: 'none',
          email: 'none',
          age: '' ,
          gender: '/',
          description: 'none'
        }    
    }
    
    editUser = _ => {
        const { euser } = this.state;
        fetch(`http://localhost:4000/users/change?id=${euser.id}&name=${euser.name}&email=${euser.email}&age=${euser.age}&gender=${euser.gender}&description=${euser.description}`)
            .catch(err => console.error(err))
        this.props.onHide();
        // alert("Changed")
        window.location.reload(false);
    }

    render(){
        const {euser} = this.state;
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="eusercontainer">
                    <Card className="inputarea">
                    <Card.Body>
                        <div className="inputid" id="inputid">
                        <Form>
                            <p>Edit User</p>
                            <input id="formAge" className="formId" 
                            value={euser.id} 
                            placeholder="Please enter user's id"
                            required="required"
                            onChange={e => this.setState({ euser: { ...euser, id: e.target.value }})}/>
                            <br/><br/>

                            <Form.Group controlId="formName">
                            <Form.Label>New Name</Form.Label>
                            <Form.Control type="textbox" placeholder="Enter name"
                            required="required"
                            onChange={e => this.setState({ euser: { ...euser, name: e.target.value }})}/>
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                            <Form.Label>New Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                            required="required"
                            onChange={e => this.setState({ euser: { ...euser, email: e.target.value }})}/>  
                            </Form.Group>

                            <p>New Age</p>
                            <input id="formAge" className="formAge" 
                            value={euser.age} 
                            placeholder="Please enter age"
                            required="required"
                            onChange={e => this.setState({ euser: { ...euser, age: e.target.value }})}/>
                            <br/><br/>

                            <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" custom
                            required="required"
                            onChange={e => this.setState({ euser: { ...euser, gender: e.target.value }})}>
                                <option>/</option>
                                <option onClick={e => this.setState({ euser: { ...euser, gender: e.target.value }})}>Male</option>
                                <option onClick={e => this.setState({ euser: { ...euser, gender: e.target.value }})}>Female</option>
                            </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter further information..."
                            onChange={e => this.setState({ euser: { ...euser, description: e.target.value}})}/>
                            </Form.Group>
                        </Form>
                        </div>
                        </Card.Body>
                    </Card>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={this.editUser}>Change and Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}