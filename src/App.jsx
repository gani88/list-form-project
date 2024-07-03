import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/Navbar'

function App() {
  
  return(
    <div className="main-container">
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
