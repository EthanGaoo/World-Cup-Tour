import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row'
import{ useNavigate  } from 'react-router-dom'
import { Container } from "react-bootstrap";
const NewDiscovery=({handleCreate})=>{
    const initialState = {
        name: "",
        category: "",
        description: "",
        location:""
      };
    const [fields, setFields] = useState(initialState);
    const [image ,setImage]=useState(null)
    const handleChange = (event) => {
    const { name, value} = event.target;
    const validateData = () => {
                return { ...fields, [name]: value };
    };
    setFields(validateData());
    };
    const handleSubmit =async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image",image);
        formData.append("name",fields.name);
        formData.append("description",fields.description);
        formData.append("location",fields.location);
        formData.append("category",fields.category);
        handleCreate(formData)
    }
    const navigate=useNavigate()
    return(
    <Container className="newForm" style={{backgroundColor:'#8a1538'}}>
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
      <Row className="my-3">
        <Form onSubmit={handleSubmit} className='editForm'>
          <h1>New Discovery </h1>
          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label style={{color:"white"}}>Name: </Form.Label>
            <Form.Control
              name="name"
              type="text"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label style={{color:"white"}}>Category: </Form.Label>
            <Form.Control
              name="category"
              type="text"
              onChange={handleChange}
              value={fields.category}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label style={{color:"white"}}>Description: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              type="text"
              onChange={handleChange}
            />
          </Form.Group>
          {/* //Images */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label style={{color:"white"}}>Image: </Form.Label>
            <Form.Control name="image" type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label style={{color:"white"}}>Location: </Form.Label>
            <Form.Control
              name="location"
              type="text"
              onChange={handleChange}
              value={fields.location}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button type="submit" className="mx-3" variant="primary" >
              Submit
            </Button>
            <Button type="submit" variant="primary" onClick={()=>{navigate('/')}}>
              Go Back
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
    )
}



export default NewDiscovery
