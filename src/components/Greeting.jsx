import React from "react";
import Photo from "../assets/images/myphoto.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "../dist/aos.css";

const Greeting = () => {
	useEffect(() => {
		AOS.init({
			// duration : 5000
		});
	}, []);
	return (
		<div className="section-primary">
			<div className="container">
				<div className="greeting" data-aos="fade-up">
					<h1> 안녕하세요, I am Randalf 👋</h1>
				</div>
				<div className="intro">
					<div className="nav">
						<div className="dots" data-aos="fade-up">
							<div className="browser-dot" id="dot-1"></div>
							<div className="browser-dot" id="dot-2"></div>
							<div className="browser-dot" id="dot-3"></div>
						</div>
						<div id="navigation" data-aos="fade-up">
							<li>
								<a href="#contact-form">Contact</a>
							</li>
						</div>
					</div>
					<div className="left-col" data-aos="fade-up">
						<img loading="lazy" id="profile_pic" src={Photo} alt="my_picture" />
						<h5 style={{ textAlign: "center", lineHeight: 0 }}>
							Full Stack Web Developer
						</h5>
					</div>
					<div className="right-col" data-aos="fade-up">
						<div id="preview-shadow">
							<div id="preview">
								<div className="corner" id="corner-tl"></div>
								<div className="corner" id="corner-tr"></div>
								<h3>What I Do</h3>
								<p>I build Functional, User-friendly, and Visually appealing Web Applications</p>
								<div className="corner" id="corner-bl"></div>
								<div className="corner" id="corner-br"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Greeting;
