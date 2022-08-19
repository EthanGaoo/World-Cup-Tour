import "./Main.css"
import React  from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from "react-router-dom";


const Main=()=>{


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
                                 <i class="flag flag-qatar"></i> <Link to={'/Qatar'}>Qatar</Link>
                            </Card.Text>
                            <Card.Text>
                                 <i class="flag flag-ecuador"></i> <Link to={'/Ecuador'}>Ecuador</Link>
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
                                <i class="flag flag-senegal"></i> <Link to={'/Senegal'}>Senegal</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-netherlands"></i> <Link to={'/Netherlands'}>Netherlands</Link>
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
                                <i class="flag flag-england"></i><Link to={'/England'}>England</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-iran"></i> <Link to={'/Iran'}>Iran</Link>
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
                                <i class="flag flag-united-states"></i> <Link to={'/USA'}>USA</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-wales"></i> <Link to={'/Wales'}>Wales</Link>
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
                                <i class="flag flag-argentina"></i> <Link to={'/Argentina'}>Argentina</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-saudi-arabia"></i> <Link to={'/Saudi Arabia'}>Saudi Arabia</Link>
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
                                <i class="flag flag-mexico"></i> <Link to={'/Mexico'}>Mexico</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-poland"></i> <Link to={'/Poland'}>Poland</Link>
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
                                <i class="flag flag-denmark"></i><Link to={'/Denmark'}>Denmark</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-tunisia"></i> <Link to={'/Tunisa'}>Tunisia</Link>
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
                                <i class="flag flag-france"></i> <Link to={'/France'}>France</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-australia"></i> <Link to={'/Australia'}>Australia</Link>
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
                                <i class="flag flag-morocco"></i> <Link to={'/Morocco'}>Morocco</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-croatia"></i> <Link to={'/Crotia'}>Croatia</Link>
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
                                <i class="flag flag-spain"></i> <Link to={'/Spain'}>Spain</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-costa-rica"></i> <Link to={'/Costa Rica'}>Costa Rica</Link>
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
                                <i class="flag flag-germany"></i><Link to={'/Germany'}>Germany</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-japan"></i> <Link to={'/Japan'}>Japan</Link>
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
                                <i class="flag flag-belgium"></i> <Link to={'/Belgium'}>Belgium</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-canada"></i> <Link to={'/Canada'}>Canada</Link>
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
                                <i class="flag flag-switzerland"></i> <Link to={'/Swizerland'}>Swizerland</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-cameroon"></i> <Link to={'/Cameroon'}>Cameroon</Link>
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
                                <i class="flag flag-portugal"></i><Link to={'/Portugal'}>Portugal</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-ghana"></i> <Link to={'/Ghana'}>Ghana</Link>
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
                                <i class="flag flag-uruguay"></i><Link to={'/Uruguay'}>Uruguay</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-south-korea"></i> <Link to={'/South Korea'}>South Korea</Link>
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
                                <i class="flag flag-brazil"></i> <Link to={'/Brazil'}>Brazil</Link>
                            </Card.Text>
                            <Card.Text>
                                <i class="flag flag-serbia"></i> <Link to={'/Serbia'}>Serbia</Link>
                            </Card.Text>
                        </Card.Body>
                     </Card>
                </CardGroup>
            </Row>
        </Container>
    )
}
export default Main
