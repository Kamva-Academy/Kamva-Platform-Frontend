import React, { useEffect, useState } from 'react';
import {makeStyles} from '@mui/styles'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EditWidgets from '../../../components/SpecialComponents/EditArticlePage/EditWidgets';
import { getRegistrationFormAction } from '../../../redux/slices/events';

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
}));

const EditArticle = ({
  article = {},
  registrationFormId,
  getRegistrationForm,
  widgets = [],
}) => {
  const history = useNavigate();

  useEffect(() => {
    if (registrationFormId) {
      getRegistrationForm({ registrationFormId });
    }
  }, [registrationFormId]);

  const classes = useStyles();

  return (
    <>
      {article && (
        <EditWidgets
          widgets={widgets}
          stateId={registrationFormId}
          stateName={article.name}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  widgets: state.events.widgets,
  registrationFormId: ownProps.registrationFormId,
});

export default connect(
  mapStateToProps,
  {
    getRegistrationForm: getRegistrationFormAction,
  }
)(EditArticle);
