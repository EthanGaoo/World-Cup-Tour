import { Modal,Form,Nav,Button } from "react-bootstrap"
import { useState} from "react";
import Alert from 'react-bootstrap/Alert';
const Register = ({handleSubmitRegister,handleLoginSubmit,datamsg})=>{
     // login state
     const [showLogIn, setShowLogIn] = useState(false);
     const handleLogInClose = () =>setShowLogIn(false);
     const handleLogInShow = () => {
         return (
             setShowLogIn(true),
             handleRegisterClose()
         )
     };
     const [logInFields, setLogInFields] = useState({username: "", password: ""})
     const handleLogInChange = (e) => {
        setLogInFields({
          ...logInFields,
          [e.target.name]: e.target.value
        })
      }
      const handleLogInSubmit = (e) => {
        e.preventDefault()
        handleLoginSubmit(logInFields)
        setLogInFields({username: "", password: ""})
      }
     // register state
     const [showRegister, setShowRegister] = useState(false);
     const handleRegisterClose = () => setShowRegister(false);
     const handleRegisterShow = () =>  {
        return(
            setShowRegister(true),
            handleLogInClose()
        )
       };
     const [registerFields,setRegisterFields]=useState({username: "", password: ""})
     const handleRegisterChange = (event) => {
        setRegisterFields({
          ...registerFields,
          [event.target.name]: event.target.value,
        })
      }
      const handleRegisterSubmit = (e) => {
        e.preventDefault()
        handleSubmitRegister(registerFields)
        setRegisterFields({username: "", password: ""})
        }
    return (
        <div>
            <Nav.Link className="navlink" onClick={handleLogInShow}>Log In</Nav.Link>
            <Modal show={showLogIn} onHide={handleLogInClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogInSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={handleLogInChange} value={logInFields.username}   name="username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter password" onChange={handleLogInChange} value={logInFields.password} name="password" />
                            <Form.Text>
                                <Nav.Link onClick={handleRegisterShow}> No account yet ? Register here</Nav.Link>
                            </Form.Text>
                        </Form.Group>
                        <div>
                        {datamsg==='Username or password is incorrect'&& <div>{['danger',].map((variant) => (<Alert key={variant} variant={variant}>Username or password is incorrect</Alert> ))}</div>}
                        <Button variant="primary" type="submit">Log In</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showRegister} onHide={handleRegisterClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Register</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleRegisterSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value={registerFields.username} onChange={handleRegisterChange} name="username" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="text" placeholder="Enter password" value={registerFields.password} onChange={handleRegisterChange} name="password"/>
                                        <Form.Text>
                                            <Nav.Link onClick={handleLogInShow}> Already have an account? Log In here</Nav.Link>
                                        </Form.Text>
                                    </Form.Group>
                                    {datamsg==='Username already taken'&& <div>{['danger',].map((variant) => (<Alert key={variant} variant={variant}>Username Already Token</Alert> ))}</div>}
                                    <Button variant="primary" type="submit">Log In</Button>
                                </Form>
                            </Modal.Body>
            </Modal>
        </div>
    )

}

export default Register
