import {
	Container,
	Grid,
	makeStyles,
	Typography,
	Button,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCertificateAction } from '../../redux/slices/events';

const useStyles = makeStyles(() => ({

}));

function Workshops({
	getCertificate,
}) {
	const classes = useStyles();

	useEffect(() => {
		getCertificate({});
	}, []);

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

export default connect(
	null,
	{
		getCertificate: getCertificateAction,
	}
)(Workshops);
