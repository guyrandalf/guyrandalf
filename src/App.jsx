import About from "./components/About";
import Contact from "./components/Contact";
import Greeting from "./components/Greeting";
import Portfolio from "./components/Portfolio";
import "./assets/css/Default.css";
import "./assets/css/Media.css";
import { Routes, Route } from "react-router-dom";
import Projects from "./components/Projects";

function App() {
	return (
		<div className="App">
			<div>
				<Routes>
					<Route path="projects" element={<Projects />}></Route>
				</Routes>

				<Greeting />

				<About />

				<Portfolio />

				<Contact />
			</div>
		</div>
	);
}

export default App;
