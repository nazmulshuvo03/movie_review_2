import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ReviewDetails = (props) => {
	const { review, auth } = props;

	if (!auth.uid) {
		return <Redirect to="/signin" />;
	} else {
		if (review) {
			return (
				<div className="container">
					<div className="card z-depth-3">
						<div className="card-content">
							<div className="row">
								<div className="card-title col s10 red-text text-accent-4">{review.name}</div>
								<p className="col s2 grey-text text-darken-2">
									{moment(review.createdAt.toDate()).calendar()}
								</p>
							</div>
							<div className="row grey-text text-darken-4">
								<p>{review.content}</p>
							</div>
							<div className="row">
								<p>
									<span className="grey-text text-darken-2">Reviewed By </span>
									<span className="red-text text-accent-2">
										{review.authorFirstName} {review.authorLastName}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container center">
					<p>Loading Review ....</p>
				</div>
			);
		}
	}
};

const mapStateToProps = (state, ownprops) => {
	const id = ownprops.match.params.id;
	const reviews = state.firestore.data.reviews;
	const review = reviews ? reviews[id] : null;
	//console.log(state);
	return {
		review: review,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{
			collection: 'reviews'
		}
	])
)(ReviewDetails);
