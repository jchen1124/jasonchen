import Navbar from "./components/Navbar"
import Intro from "./components/Intro"
import About from "./components/About"
import Experience from "./components/Experience"
import "./styles/Global.css"
import "./App.css"


function App() {
  return <div>
    <Navbar/>
    <Intro/>
    <div id="content">
      <About/>
      <Experience/>
    </div>
  </div>
}

export default App
