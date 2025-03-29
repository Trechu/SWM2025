import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import NavbarComponent from './Navbar';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './Login';
import Wrapper from './SiteWrapper';

function App() {
  return (
    <div className="App bg-dark">
      <BrowserRouter>
        <Routes>
          <Route path='routes'element={< Wrapper component={LoginComponent } />}/>
          <Route path='login' element={ <LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
