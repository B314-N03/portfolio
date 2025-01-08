import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import NotFound from './widgets/NotFound';
import Impressum from './Impressum';
import Footer from './Footer';
import ThemeProvider from './providers/ThemeProvider';
import { useContext } from 'react';
import UserProvider from './providers/UserProvider';
import SiteProvider, { SiteContext } from './providers/SiteProvider';
import ScrollToTop from './helpers/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SiteProvider>
          <PortfolioRoutes></PortfolioRoutes>
        </SiteProvider>
      </UserProvider>
    </ThemeProvider>

  );
}

const PortfolioRoutes = () => {
  const {siteType} = useContext(SiteContext);
  return (
    <>
    <Router>
    <ScrollToTop></ScrollToTop>
    {siteType === 'static' && <Navbar/> }
    {siteType === 'static' ?
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path='/impressum' element={<Impressum/>}></Route>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        : 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      }

    {siteType === 'static' && <Footer/>}
    </Router>

    </>

  );
};



export default App;


