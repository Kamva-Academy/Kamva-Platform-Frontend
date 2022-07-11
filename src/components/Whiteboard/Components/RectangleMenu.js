import { IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {
  Stop as StopIcon,
  StopOutlined as StopOutlinedIcon,
} from '@mui/icons-material';
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
  addNewRectangleNodeAction,
  changeWhiteboardModeAction,
} from '../../../redux/slices/whiteboard';
import DrawingModes from '../../Konva/Drawing/DrawingModes';

const RectangleMenu = ({ changeMode, addNewRectangleNode }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'RectangleMenu',
  });

  const { teamId } = useContext(StatePageContext);

  const onClick = (type) => {
    changeMode({ mode: DrawingModes.MOVE });
    addNewRectangleNode({ uuid: teamId, type });
    popupState.close();
  };

  return (
    <React.Fragment>
      <IconButton variant="contained" {...bindHover(popupState)} size="large">
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
