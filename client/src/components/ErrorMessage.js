import React from 'react';

const ErrorMessage = props => (
	<div className="error-message">
			{ props.error }	
	</div>
);

export default ErrorMessage;