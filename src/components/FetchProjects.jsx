import React from "react";

const FetchProjects = ({ projects }) => {
	return (
		<div>
			<div className="project">
				<img loading="lazy" className="thumbnail" src={projects.image} alt="" />
				<div className="project-preview">
					<h6 className="project-title">{projects.title}</h6>
					<p className="project-intro">
						{projects.description}
					</p>
					<a href={projects.url} target="_blank">
						Preview
					</a>
				</div>
			</div>
		</div>
	);
};

export default FetchProjects;
