import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import './index.css';
import Details from './components/Details';
import Sell from './components/Sell';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element ={<Main/>}/>
        <Route path='/sell' element ={<Sell/>} />
        <Route path='/details/:id' element ={<Details/>} />
      </Routes>
    </div>
  )
}

export default App
