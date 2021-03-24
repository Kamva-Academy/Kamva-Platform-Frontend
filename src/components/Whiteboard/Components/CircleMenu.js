import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {
  FiberManualRecord as FiberManualRecordIcon,
  FiberManualRecordOutlined as FiberManualRecordOutlinedIcon,
} from '@material-ui/icons';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from '../../../containers/Workshop';
import {
  addNewCircleNodeAction,
  changeWhiteboardModeAction,
} from '../../../redux/slices/whiteboard';
import DrawingModes from '../../Konva/Drawing/DrawingModes';

const CircleMenu = ({ changeMode, addNewCircleNode }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'circleMenu',
  });

  const {
    player: { uuid },
  } = useContext(StatePageContext);

  const onClick = (type) => {
    changeMode({ mode: DrawingModes.MOVE });
    addNewCircleNode({ uuid, type });
    popupState.close();
  };

  return (
    <React.Fragment>
      <IconButton variant="contained" {...bindHover(popupState)}>
        <FiberManualRecordOutlinedIcon />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MenuItem onClick={() => onClick('outlined')}>
          <FiberManualRecordOutlinedIcon />
        </MenuItem>
        <MenuItem onClick={() => onClick('normal')}>
          <FiberManualRecordIcon />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null, {
  changeMode: changeWhiteboardModeAction,
  addNewCircleNode: addNewCircleNodeAction,
})(CircleMenu);
