import React from "react";
import "../assets/css/Loader.css";

const Loading = () => {
	return (
		<div className="loading-wrapper">
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loading;
