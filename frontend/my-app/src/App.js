import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './Login';
import RoutesComponent from './Routes';
import NoPageComponent from './NoPage';
import Wrapper from './SiteWrapper';
import LeaderboardsComponent from './Leaderboards';

function App() {

  return (
    <div className="App bg-transparent">
      <BrowserRouter>
        <Routes>
          <Route path='routes' element={< Wrapper component={RoutesComponent } />}/>
          <Route path='leaderboard' element={<Wrapper component={LeaderboardsComponent} />} />
          <Route path='login' element={ <LoginComponent />} />
          <Route path='*' element={<Wrapper component={NoPageComponent} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
