import Navbar from "./components/Navbar"
import Intro from "./components/Intro"
import About from "./components/About"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Contact from "./components/Contact"
import Cursor from "./components/Cursor"
import Footer from "./components/Footer"
import Wordle from "./components/Wordle"
import "./styles/Global.css"
import "./App.css"

function App() {
  return <div>
    <Cursor/>
    <Navbar/>
    <Wordle/>
    <Intro/>
    <div id="content">
      <About/>
      <Education/>
      <Experience/>
      <Projects/>
      <Contact/>
    </div>
    <Footer/>
  </div>
}

export default App
