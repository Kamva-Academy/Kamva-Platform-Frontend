import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import EditWidgets from 'components/template/EditWidgets';
import { getRegistrationFormAction } from 'redux/slices/events';

type RegistrationFormPropsType = {
  registrationFormId: any;
  getRegistrationForm: any;
  papers: any[];
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  registrationFormId,
  getRegistrationForm,
  papers,
}) => {

  useEffect(() => {
    getRegistrationForm({ registrationFormId });
  }, []);

  const registrationForm = papers[registrationFormId];

  return (
    <>
      {registrationForm &&
        <EditWidgets
          widgets={registrationForm.widgets}
          paperId={registrationFormId}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  papers: state.paper.papers,
});

export default connect(mapStateToProps, {
  getRegistrationForm: getRegistrationFormAction,
})(RegistrationForm);
