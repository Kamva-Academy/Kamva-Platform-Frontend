import React, { FC, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  respondInvitationAction,
} from '../../redux/slices/events';
import AreYouSure from '../Dialog/AreYouSure';
import {
  IconButton
} from "@mui/material";
import { connect } from 'react-redux';

type RespondInvitationPropsType = {
  invitationId: number;
  respondInvitation: any;
}

const RespondInvitation: FC<RespondInvitationPropsType> = ({
  invitationId,
  respondInvitation,
}) => {
  const [acceptedInvitationId, setAcceptedInvitationId] = useState<number>(null);
  const [rejectedInvitationId, setRejectedInvitationId] = useState<number>(null);

  return (
    <>
      <IconButton
        size="small"
        onClick={() => {
          setAcceptedInvitationId(invitationId);
        }}>
        <CheckCircleIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => {
          setRejectedInvitationId(invitationId);
        }}>
        <CancelIcon />
      </IconButton>
      <AreYouSure
        open={!!acceptedInvitationId}
        handleClose={() => setAcceptedInvitationId(null)}
        callBackFunction={() =>
          respondInvitation({
            invitationId,
            status: "Accepted",
          })
        }
      />
      <AreYouSure
        open={!!rejectedInvitationId}
        handleClose={() => setRejectedInvitationId(null)}
        callBackFunction={() =>
          respondInvitation({
            invitationId,
            status: "Rejected",
          })
        }
      />
    </>);
}

export default connect(null, {
  respondInvitation: respondInvitationAction,
})(RespondInvitation);