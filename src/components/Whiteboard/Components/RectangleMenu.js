import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Stop as StopIcon,
  StopOutlined as StopOutlinedIcon,
} from '@material-ui/icons';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import * as React from 'react';
import { connect } from 'react-redux';

import {
  addNewRectangleNodeAction,
  changeWhiteboardModeAction,
} from '../../../redux/slices/whiteboard';
import DrawingModes from '../../Konva/Drawing/DrawingModes';

const RectangleMenu = ({ changeMode, addNewRectangleNode }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'RectangleMenu',
  });

  const onClick = (type) => {
    changeMode(DrawingModes.MOVE);
    addNewRectangleNode({ type });
    popupState.close();
  };

  return (
    <React.Fragment>
      <IconButton variant="contained" {...bindHover(popupState)}>
        <StopOutlinedIcon />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MenuItem onClick={() => onClick('outlined')}>
          <StopOutlinedIcon />
        </MenuItem>
        <MenuItem onClick={() => onClick('normal')}>
          <StopIcon />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null, {
  changeMode: changeWhiteboardModeAction,
  addNewRectangleNode: addNewRectangleNodeAction,
})(RectangleMenu);
