import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormLabel from 'react-bootstrap/FormLabel';
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonToolbar, ProgressBar } from 'react-bootstrap';
import {EditUserModal} from './components/EditUserModal';
import Container from 'react-bootstrap/Container';


class App extends React.Component{

// function App() {
  state = {
    users: [],
    user: {
      id: '',
      name: 'none',
      email: 'none',
      age: '' ,
      gender: '/',
      description: 'none'
    },
    addModalShow : false
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

  deleteUser = _ => {
    const { user } = this.state;
    fetch(`http://localhost:4000/users/delete?id=${user.id}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
    window.location.reload(false);
    // alert("Deleted");
  }
 
  renderUsers = ({id, name, email, age, gender, description}) => 
  <div>{id} {name} {email} {age} {gender} {description}</div>  

  render() {
    const { users, user } = this.state;
    let addModalClose = () => this.setState({addModalShow:false});
    return (
      <div className="App">
        <br/>
        <Card className="card">
            <Navbar expand="lg" variant="dark" bg="dark" className="nav">
              <Container>
                <Navbar.Brand href="#">Add User to DB</Navbar.Brand>
              </Container>
            </Navbar>
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
            <Button variant="dark" 
              id="submit_btn" 
              onClick={this.createUser}>Submit
            </Button>
          </Card.Body>
        </Card>
        <Card className="card">
            <Navbar expand="lg" variant="dark" bg="dark" className="nav">
              <Container>
                <Navbar.Brand href="#">Display by Table</Navbar.Brand>
              </Container>
            </Navbar>
          <Card.Body>
            {/* <Navbar className="bg-light justify-content-between"> */}
              <Form inline className="incardnav">
                <ButtonToolbar>
                    <Button className="navbtn" 
                    variant="dark"
                    onClick={()=>this.setState({addModalShow: true})}>Edit User
                    </Button>
                    <EditUserModal
                    show = {this.state.addModalShow}
                    onHide = {addModalClose}
                    />
                </ButtonToolbar>
                <div className="dluser">
                  <input type="text" value={user.id}
                    placeholder="Enter user_id" className="duserid"
                    required="required"
                    onChange={e => this.setState({ user: { ...user, id: e.target.value }})}/>
                  
                    <Button className="dbtn" 
                      variant="dark"
                      onClick={this.deleteUser}>Delete</Button>
                </div>
                  
              </Form>
            <Card.Title>Users DB</Card.Title>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>user_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>
                    {users.map(({id}) => <div>{id}</div>)}
                  </td>
                  <td>
                    {users.map(({name}) => <div>{name}</div>)}
                  </td>
                  <td>
                    {users.map(({email}) => <div>{email}</div>)}
                  </td>
                  <td>
                    {users.map(({age}) => <div>{age}</div>)}
                  </td>
                  <td>
                    {users.map(({gender}) => <div>{gender}</div>)}
                  </td><td>
                    {users.map(({description}) => <div>{description}</div>)}
                  </td>
                </tr>
                <tr className="countid">
                  <td colSpan="6">Total User: {users.length}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div className="disChart">
        <Card>
            <Navbar expand="lg" variant="dark" bg="dark" className="nav">
              <Container>
                <Navbar.Brand href="#">Display by Chart</Navbar.Brand>
              </Container>
            </Navbar>
            <Card.Body>
              <Table striped bordered hover className="disChatyTable">
              <thead class="w-100">
                <td>
                  Name
                </td>
                <td class="col-9">
                  Age
                </td>
              </thead>
              <tbody>
                <td>
                  {users.map(({name}) => <div>{name}</div>)} 
                </td>
                <td>
                  {users.map(({age}) => <div className="probar">{<ProgressBar animated now={age} label={`${age}`}/>}</div>)}
                </td>
              </tbody>
              </Table>
            </Card.Body>
        </Card>
        </div>
        {/* {users.map(this.renderUsers)} */}
        <br/>
      </div>
    );
  }
}

export default App;
