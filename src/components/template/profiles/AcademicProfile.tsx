
import React, { } from 'react';
import { connect } from 'react-redux';

const hasUserCompletedAcademicInformation = (userInfo) => {
  if (userInfo.academic_studentship) {
    // todo
  } else {
    throw new Error("Invalid State: each user must have a academic studentship");
  }
}

function AcademicProfile({ onSubmit }) {
  return (
    <></>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(AcademicProfile);


