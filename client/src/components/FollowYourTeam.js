import { useParams,useNavigate} from "react-router-dom"
import { useState,useEffect} from "react"
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { Outlet } from "react-router-dom";
import Register from "./Register"
const FollowYourTeam=({teams})=>{
    const navigate=useNavigate()
    // datamsg
    const [datamsg,setDatamsg]=useState(null)
      // navbar state
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
     //user
     const [user, setUser] = useState(null)
     useEffect(() => {
        const checkLoggedIn = async () => {
          const res = await fetch('/is-authenticated')
          const data = await res.json()
          setUser(data.user)
        }
        if (!user) checkLoggedIn()
      }, [])
    const handleSubmit = (whichForm) => {
        return async (fields) => {
          const res = await fetch(`/${whichForm}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields)
          })
          const data = await res.json()
          setUser(data.user)
          setDatamsg(data.msg)

        }
    }
  const handleLogout = async () => {
    const res = await fetch('/logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) setUser(null)
    navigate('/')
  }
    const {nation}=useParams()
    const Team= teams.find((team)=>{
        return team.name===nation
    })

    return (
        <Container >
            <Row>
                <Offcanvas show={show} onHide={handleClose} >
                    <Offcanvas.Header className="oh" closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="ob">
                        {user &&<Nav.Link className="navlink">Welcome Back {user.username} </Nav.Link>}
                        <Nav.Link className="navlink" href="/">Home</Nav.Link>
                        {!user&&<Register  handleSubmitRegister={handleSubmit('register')} handleLoginSubmit={handleSubmit('login')} datamsg={datamsg} />}
                        {user&&<Nav.Link className="navlink" href="/newDiscovery" >New Discovery</Nav.Link>}
                        {user&&<Nav.Link className="navlink" onClick={handleLogout} >Log Out</Nav.Link>}
                    </Offcanvas.Body>
                </Offcanvas>
            </Row>
             <Row className="header">
                <div className="logoTitle" id="FUT" style={{backgroundImage:`url(${Team.image})`}} >
                    <h1>Follow Your Team</h1>
                    <h2>{Team.name}</h2>
                    <img src="https://www.qatar2022.qa/sites/default/files/styles/medium/public/hero_video_countdown/hero_logo/FIFA-World-Cup-Qatar-2022-emblem.webp?itok=9yCFW66G"></img>
                    <Button variant="primary" onClick={handleShow} className='mt-3'>Explore</Button>
                </div>
            </Row>
            <Row className="mt-3">
                <h1 style={{color:'#343c60'}}>
                Socceroos Group Tour
                </h1>
                <p>
                Join this special Follow The Socceroos tour and support Team {Team.name} together with hundreds of your fellow travelers In Dubai.
                </p>
            <Row className="hr"></Row>
            </Row>
            <Row>
                <Outlet/>
            </Row>
        </Container>

    )
}

export default FollowYourTeam
