import React, { useEffect, useState } from "react";
import axios from "axios";
import FetchProjects from "./FetchProjects";
import Loading from "./Loading";
import AOS from "aos";
import "../dist/aos.css";

const Portfolio = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		AOS.init({
			// duration : 5000
		});
		axios.get("https://guyrandalf.randisoft.tech/data/projects.json").then((res) => {
			setProjects(res.data);
			setLoading(true);
		});
	}, []);
	return (
		<div className="section-secondary">
			<div className="container">
				<h3 style={{ textAlign: "center" }}>Some Of My Latest Projects</h3>
				<div className="projects" data-aos="fade-up">
					{loading ? (
						projects.map((projects) => {
							return <FetchProjects key={projects.id} projects={projects} />;
						})
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
