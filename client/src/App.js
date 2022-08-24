import{ Routes, Route,useNavigate  } from 'react-router-dom'
import { useEffect,useState } from 'react';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import Events from './components/Events';
import FollowYourTeam from './components/FollowYourTeam';
import NewDiscovery from './components/NewDiscovery';
import Edit from './components/Edit';
function App() {
  const [events,setEvents]=useState(null)
  const [teams,setTeams]=useState(null)
  const navigate=useNavigate();
  const makeEventsCall=async()=>{
    const url='/activities'
    const res = await fetch(url)
      const Events = await res.json()
      setEvents(Events)
  }

  const maketeamCall=async()=>{
    const url='/teams'
    const res = await fetch(url)
    const team = await res.json()
    setTeams(team)
}
useEffect(()=>{
  maketeamCall()
},[])
  useEffect(()=>{
    makeEventsCall()
  },[])

  const handleCreate = async (formData) => {
    const url = "/activities/new";
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const newActivities = await res.json();
    console.log(newActivities);
    setEvents([...events, newActivities]);
    navigate("/");
  };
  const handleDelete = async (id) => {
    const deleteURL = `/activities/${id}`;
    const res = await fetch(deleteURL, {
      method: "DELETE",
      header: `Content-Type: application/json`,
    });
    await res.json();

    const filteredEvent = events.filter((event) => {
      return event._id !== id;
    });
    setEvents(filteredEvent)
    navigate("/")
  };
  const handleEdit = async (id, formData, index) => {
    const editURL = `/activities/${id}`;

    const res = await fetch(editURL, {
      method: "PUT",
      body: formData,
    });
    const editedItem = await res.json();
    setEvents([
      ...events.slice(0, index),
      editedItem,
      ...events.slice(index + 1),
    ]);
    // navigate("/events");
  };
  return (
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/newDiscovery' element={<NewDiscovery handleCreate={handleCreate}/>}/>
        <Route path='/teams/:nation' element={teams&&<FollowYourTeam teams={teams}/>}>
          <Route path='/teams/:nation/events' element={events&&<Events events={events} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path='/edit/:eventID' element={events&&<Edit events={events} handleEdit={handleEdit}/>}/>
       </Routes>
  );
}

export default App;
