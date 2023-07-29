import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from 'components/templates/GeneralLayout';
import EditWidgets from '../components/templates/EditWidgets';
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
			<Stack spacing={2} maxWidth='md' sx={{ width: '100%', paddingBottom: 2 }}>
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
						paperId={parseInt(articleId)}
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