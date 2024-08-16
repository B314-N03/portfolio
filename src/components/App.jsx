import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import Other from './Other';
import NotFound from './NotFound';
import Impressum from './Impressum';
import Footer from './Footer';
import CV from './CV';
import SideProjects from './SideProjects';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path='/other' element={<Other/>}/>
        <Route path='/other/side-projects' element={<SideProjects/>}></Route>
        <Route path='/other/cv' element={<CV/>}></Route>
        <Route path='/other/impressum' element={<Impressum/>}></Route>
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}
export default App;
