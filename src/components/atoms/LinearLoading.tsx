import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';
import CustomJoyrideButton from './CustomJoyrideButton';

type LinearLoadingPropsType = {
  loading: boolean;
}

const LinearLoading: FC<LinearLoadingPropsType> = ({
  loading
}) => {
  if (loading) {
    return (
      <div style={{ width: '100vw', position: 'fixed', top: '0px', zIndex: '99999' }}>
        <LinearProgress />
      </div>
    )
  } else {
    return (<></>)
  }
};


export default LinearLoading;




