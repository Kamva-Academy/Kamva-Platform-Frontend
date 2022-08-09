import { IconButton, Tooltip } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import React, { FC, useState } from 'react';
import useWidth from '../../../../utils/UseWidth';
import { connect } from 'react-redux';
import { changeOpenChatRoomAction } from '../../../../redux/slices/currentState'

type JitsiButtonPropsType = {
  changeOpenChatRoom: any;
}

const JitsiButton: FC<JitsiButtonPropsType> = ({
  changeOpenChatRoom,
}) => {
  const width = useWidth();

  return (
    <Tooltip arrow title='اتاق گفتگو'>
      <IconButton size={width == 'xs' ? 'small' : 'medium'} onClick={() => changeOpenChatRoom()}>
        <ForumIcon />
      </IconButton>
    </Tooltip>
  );
}

export default connect(null, { changeOpenChatRoom: changeOpenChatRoomAction })(JitsiButton);