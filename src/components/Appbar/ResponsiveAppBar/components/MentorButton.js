import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { StatePageContext } from '../../../../containers/Workshop';
import { requestMentorAction } from '../../../../redux/slices/currentState';
import useWidth from '../../../../utils/UseWidth';


function MentorButton({ callMentor }) {
  const t = useTranslate();
  const { playerId, teamId, fsmId } = useContext(StatePageContext);
  const [isEnable, setEnable] = useState(true);
  const width = useWidth();

  return (
    <Button
      size={width == 'xs' ? 'small' : ''}
      variant="contained"
      color="primary"
      disabled={!isEnable}
      sx={{ marginLeft: 5, fontSize: width == 'xs' ? 12 : 18 }}
      onClick={() => {
        callMentor({ playerId, teamId, fsmId: +fsmId })
        setEnable(false);
        setTimeout(() => {
          setEnable(true);
        }, 60000)
      }}>
      {isEnable ? t('callMentor') : 'یک دقیقه صبر کنید'}
    </Button>
  );
}

export default connect(null, { callMentor: requestMentorAction })(MentorButton);
