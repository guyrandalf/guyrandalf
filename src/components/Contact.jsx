import React from "react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "../dist/aos.css";

const Contact = () => {
	useEffect(() => {
		AOS.init({
			// duration : 5000
		});
	}, []);
	const [status, setStatus] = useState("Submit");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("Sending...");
		const { name, email, message } = e.target.elements;
		let details = {
			name: name.value,
			email: email.value,
			message: message.value,
		};
		let response = await fetch("https://guyrandalf.randisoft.tech/contact/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(details),
		});
		setStatus("Submit");
		let result = await response.json();
		alert(result.status);
	};
	return (
		<div className="section-primary">
			<div className="container">
				<h3 style={{ textAlign: "center" }}>Please Buy Me A Cup Of Coffee</h3>
				<form
					onSubmit={handleSubmit}
					id="contact-form" data-aos="fade-up"
				>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" className="input-field" />

					<label htmlFor="email">Email Address</label>
					<input type="text" name="email" id="email" className="input-field" />

					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						id="message"
						className="input-field"
					></textarea>

					<button type="submit" id="submit-btn" value="Send">{status}</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
