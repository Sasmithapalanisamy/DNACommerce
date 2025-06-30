import { BrowserRouter as  Router,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import CheckDNA from './CheckDNA';
import Login from './Login';
import Signup from './Signup';
import DNARecommendations from './DnaRecommendation';
import Loading from './Loading';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dna" element={<CheckDNA/>} />
          <Route path="/loading"  element={<Loading/>} />
          <Route path="/results" element={<DNARecommendations/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
