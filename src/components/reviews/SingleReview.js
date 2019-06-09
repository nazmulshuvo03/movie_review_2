import React from 'react';
import moment from 'moment';

const SignleReview = ({ review }) => {
	//console.log(review.createdAt.toDate());
	return (
		<div className="card black-text z-depth-5">
			<div className="card-content">
				<div className="row">
					<div className="card-title col s8 red-text text-accent-4">{review.name}</div>
				</div>
				<div className="row grey-text text-darken-4">
					<p>{review.content.substring(0, 100) + '... ...'}</p>
				</div>
				<div className="row">
					<p className="col s6">
						<span className="grey-text text-darken-2">Reviewed By </span>
						<span className="red-text text-accent-2">
							{review.authorFirstName} {review.authorLastName}
						</span>
					</p>
					<p className="col s3 offset-s3 grey-text text-darken-2">
						{moment(review.createdAt.toDate()).calendar()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignleReview;
