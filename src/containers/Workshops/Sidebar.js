import {
	Container,
	Grid,
	makeStyles,
	Typography,
	Button,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	getCertificateAction,
	getOneEventInfoAction,
} from '../../redux/slices/events';

const useStyles = makeStyles(() => ({

}));

function Workshops({
	getCertificate,
	getOneEventInfo,

	event,
}) {
	const classes = useStyles();
	const { eventId } = useParams();

	useEffect(() => {
		getOneEventInfo({ id: eventId });
	}, [getOneEventInfo]);

	useEffect(() => {
		if (event?.registration_receipt) {
			getCertificate({ registrationReceiptId: event?.registration_receipt });
		}
	}, [event]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h1" align='center' component="h2">
					کارگاه‌ها
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant='outlined' fullWidth>
					{'دریافت گواهی حضور'}
				</Button>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state) => ({
	event: state.events.event,
});

export default connect(
	mapStateToProps,
	{
		getCertificate: getCertificateAction,
		getOneEventInfo: getOneEventInfoAction,
	}
)(Workshops);
