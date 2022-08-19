import{ Routes, Route  } from 'react-router-dom'
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
    </Routes>
  );
}

export default App;
