import "./Main.css"
import React,{useState,useEffect} from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Register from "./Register"
import { useNavigate } from "react-router-dom"
const Main=()=>{
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
    // time counter
    let countDownDate = new Date("Nov 21, 2022 02:30:00").getTime()
    let myfunc = setInterval(function() {
      let now = new Date().getTime()
      let timeleft = countDownDate - now
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000)
      document.getElementById("days").innerHTML = days
      document.getElementById("hours").innerHTML = hours
      document.getElementById("mins").innerHTML = minutes
      document.getElementById("secs").innerHTML = seconds
      if (timeleft < 0) {
        clearInterval(myfunc)
        document.getElementById("days").innerHTML = ""
        document.getElementById("hours").innerHTML = ""
        document.getElementById("mins").innerHTML = ""
        document.getElementById("secs").innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!"
      }
    }, 1000)
    return(
        <Container fluid>
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
                <video  autoPlay loop muted>
                    <source
                        src="https://www.qatar2022.qa/sites/default/files/hero_video_countdown/files/Destinations%20Film%20Website.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="logoTitle">
                    <img  className="logo" src="https://www.qatar2022.qa/themes/custom/sc/dist/img/svg/qatar-hero-shadow.svg"></img>
                    <h2>World Cup of Discovery</h2>
                    <img src="https://www.qatar2022.qa/sites/default/files/styles/medium/public/hero_video_countdown/hero_logo/FIFA-World-Cup-Qatar-2022-emblem.webp?itok=9yCFW66G"></img>
                    <Button variant="primary" onClick={handleShow} className='mt-3'>Explore</Button>
                </div>
            </Row>
            <Row className="time-Counter">
                <Col className="timeHeader">Countdown to Qatar 2022</Col>
                <Col>
                <div className="timeHeader" id="days"></div>
                <p>DAYS</p>
                </Col>
                <Col>
                <div className="timeHeader" id="hours"></div>
                <p>HOURS</p>
                </Col>
                <Col>
                <div className="timeHeader" id="mins"></div>
                <p>MINUTES</p>
                </Col>
                <Col>
                <div className="timeHeader" id="secs"></div>
                <p>SECONDS</p>
                </Col>
                <h2 id="end"></h2>
            </Row>
            <Row className="matchTable">
                <CardGroup className="mb-3">
                    <Card>
                         <Card.Header>
                            <small className="text-muted">Group A Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>21 Nov 22  2:30 am</Card.Title>
                            <Card.Text>
                                 <i className="flag flag-qatar"></i> <Link to={'/teams/Qatar/events'}>Qatar</Link>
                            </Card.Text>
                            <Card.Text>
                                 <i className="flag flag-ecuador"></i> <Link to={'/teams/Ecuador/events'}>Ecuador</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group A Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>21 Nov 22  2:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-senegal"></i> <Link to={'/teams/Senegal/events'}>Senegal</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-netherlands"></i> <Link to={'/teams/Netherlands/events'}>Netherlands</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group B Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>21 Nov 22  11:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-england"></i><Link to={'/teams/England/events'}>England</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-iran"></i> <Link to={'/teams/Iran/events'}>Iran</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group B Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>22 Nov 22  5:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-united-states"></i> <Link to={'/teams/USA/events'}>USA</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-wales"></i> <Link to={'/teams/Wales/events'}>Wales</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                </CardGroup>
                <CardGroup className="mb-3">
                    <Card>
                         <Card.Header>
                            <small className="text-muted">Group C Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>22 Nov 22  8:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-argentina"></i> <Link to={'/teams/Argentina/events'}>Argentina</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-saudi-arabia"></i> <Link to={'/teams/Saudi Arabia/events'}>Saudi Arabia</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group C Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>22 Nov 22  2:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-mexico"></i> <Link to={'/teams/Mexico/events'}>Mexico</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-poland"></i> <Link to={'/teams/Poland/events'}>Poland</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group D Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>22 Nov 22  11:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-denmark"></i><Link to={'/teams/Denmark/events'}>Denmark</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-tunisia"></i> <Link to={'/teams/Tunisia/events'}>Tunisia</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group D Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>23 Nov 22  5:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-france"></i> <Link to={'/teams/France/events'}>France</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-australia"></i> <Link to={'/teams/Australia/events'}>Australia</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                </CardGroup>
                <CardGroup className="mb-3">
                    <Card>
                         <Card.Header>
                            <small className="text-muted">Group F Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>23 Nov 22  8:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-morocco"></i> <Link to={'/teams/Morocco/events'}>Morocco</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-croatia"></i> <Link to={'/teams/Croatia/events'}>Croatia</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group E Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>24 Nov 22  2:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-spain"></i> <Link to={'/teams/Spain/events'}>Spain</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-costa-rica"></i> <Link to={'/teams/Costa Rica/events'}>Costa Rica</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group E Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>23 Nov 22  11:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-germany"></i><Link to={'/teams/Germany/events'}>Germany</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-japan"></i> <Link to={'/teams/Japan/events'}>Japan</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group F Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>24 Nov 22  5:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-belgium"></i> <Link to={'/teams/Belgium/events'}>Belgium</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-canada"></i> <Link to={'/teams/Canada/events'}>Canada</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                </CardGroup>
                <CardGroup>
                    <Card>
                         <Card.Header>
                            <small className="text-muted">Group G Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>24 Nov 22  8:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-switzerland"></i> <Link to={'/teams/Swizerland/events'}>Swizerland</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-cameroon"></i> <Link to={'/teams/Cameroon/events'}>Cameroon</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group H Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>25 Nov 22  2:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-portugal"></i><Link to={'/teams/Portugal/events'}>Portugal</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-ghana"></i> <Link to={'/teams/Ghana/events'}>Ghana</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group H Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>24 Nov 22  11:30 pm</Card.Title>
                            <Card.Text>
                                <i className="flag flag-uruguay"></i><Link to={'/teams/Uruguay/events'}>Uruguay</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-south-korea"></i> <Link to={'/teams/South Korea/events'}>South Korea</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                     <Card>
                         <Card.Header>
                            <small className="text-muted">Group G Matchday 1 of 3</small>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>25 Nov 22  5:30 am</Card.Title>
                            <Card.Text>
                                <i className="flag flag-brazil"></i> <Link to={'/teams/Brazil/events'}>Brazil</Link>
                            </Card.Text>
                            <Card.Text>
                                <i className="flag flag-serbia"></i> <Link to={'/teams/Serbia/events'}>Serbia</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                </CardGroup>
            </Row>
        </Container>
    )
}
export default Main
