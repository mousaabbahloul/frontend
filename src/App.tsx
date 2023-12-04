import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Result from './components/Result'
function App() {


  return (
    
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/result" element={<Result/>} /> 
      </Routes>
    
  )
}

export default App
