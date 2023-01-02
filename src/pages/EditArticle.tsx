import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../containers/Layout';
import EditWidgets from '../components/organisms/EditWidgets';
import { getArticleAction } from '../redux/slices/article';

const EditArticle = ({
	papers,
	getArticle,
}) => {
	const { articleId } = useParams();

	useEffect(() => {
		getArticle({ articleId });
	}, []);

	const article = papers[articleId];

	return (
		<Layout appbarMode='ARTICLE'>
			<Stack maxWidth='sm' sx={{ paddingBottom: 2 }}>
				<Typography
					align="center"
					component="h1"
					variant="h3"
					gutterBottom>
					{article?.name}
				</Typography>
				{article && (
					<EditWidgets
						widgets={article.widgets}
						stateId={parseInt(articleId)}
					/>
				)}
			</Stack>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	papers: state.paper.papers,
});

export default connect(mapStateToProps, {
	getArticle: getArticleAction,
})(EditArticle);