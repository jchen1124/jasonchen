import Navbar from "./components/Navbar"
import Intro from "./components/Intro"
import About from "./components/About"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Cursor from "./components/Cursor"
import "./styles/Global.css"
import "./App.css"


function App() {
  return <div>
    <Cursor/>
    <Navbar/>
    <Intro/>
    <div id="content">
      <About/>
      <Experience/>
      <Projects/>
    </div>
  </div>
}

export default App
