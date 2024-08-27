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
import ThemeProvider from './providers/ThemeProvider';
import LoginModal from './LoginModal';
import { useState } from 'react';
import ComingSoon from './ComingSoon';

function App() {
  const [showLoginModal,setShowLoginModal] = useState(false)
  return (
    <ThemeProvider>
      <Router>
        <Navbar showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={
          <ComingSoon></ComingSoon>
          // <About/>
          }/>
          <Route path="/contact" element={
            <ComingSoon></ComingSoon>
            // <Contact/>
            } />
          <Route path="/projects" element={
            <ComingSoon></ComingSoon>
            // <Projects/>
            } />
          <Route path='/other' element={
            <ComingSoon></ComingSoon>
            // <Other/>
            }/>
          <Route path='/other/side-projects' element={
            <ComingSoon></ComingSoon>
            // <SideProjects/>
            }></Route>
          <Route path='/other/cv' element={
            <ComingSoon></ComingSoon>
            // <CV/>
            }></Route>
          <Route path='/other/impressum' element={<Impressum/>}></Route>
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer></Footer>
        <LoginModal modalOpen={showLoginModal} setModalOpen={setShowLoginModal}></LoginModal>
      </Router>
    </ThemeProvider>

  );
}
export default App;
