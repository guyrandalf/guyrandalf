import React from "react";
import SocialImage from "../assets/images/social-dark.png";
import { useEffect } from "react";
import AOS from "aos";
import "../dist/aos.css";

const About = () => {
	useEffect(() => {
		AOS.init({
			// duration : 5000
		});
	}, []);
	return (
		<div className="section-primary">
			<div className="container">
				<div className="about" data-aos="fade-up">
					<div className="about-me">
						<h4>More About Me</h4>
						<p>
							Experience in building web
							applications using modern technologies and methodologies.
							Proficient in JavaScript, HTML, CSS, and frameworks like Laravel.
						</p>
						<p>
							Strong understanding of REST APIs and databases like MySQL and MongoDB. Skilled in Agile software development and
							familiar with version control systems like Git.
						</p>

						<hr />
						<h4>Top Expertise</h4>
						<p>
							Passionate about delivering high-quality and user-friendly
							websites. Seeking opportunities to further enhance my skills and
							contribute to the development of innovative web applications. 
							<a href="#" target="_blank"> Download Resume </a>
						</p>

						<div id="stack">
							<ul>
								<li>React</li>
								<li>Laravel</li>
								<li>JavaScript</li>
								<li>Vue</li>
								<li>Python</li>
							</ul>
							<ul>
								<li>HTML/CSS</li>
								<li>PHP (OOP)</li>
								<li>Mysql</li>
								<li>Vercel</li>
								<li>WordPress</li>
							</ul>
						</div>
					</div>
					<div className="social-links" data-aos="fade-up">
						<img src={SocialImage} alt="social_img" id="social_img" />
						<h3>
							Find me on Linkedin
							<a href="https://www.linkedin.com/in/randalf/" target="_blank">
								@randalf
							</a>
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
