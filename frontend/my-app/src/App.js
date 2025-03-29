import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import NavbarComponent from './Navbar';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './Login';
import RoutesComponent from './Routes';
import NoPageComponent from './NoPage';
import Wrapper from './SiteWrapper';

function App() {
  return (
    <div className="App bg-transparent">
      <BrowserRouter>
        <Routes>
          <Route path='routes'element={< Wrapper component={RoutesComponent } />}/>
          <Route path='login' element={ <LoginComponent />} />
          <Route path='*' element={<Wrapper component={NoPageComponent} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
