import * as React from 'react';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { IconButton } from '@material-ui/core';
import {
  StopOutlined as StopOutlinedIcon,
  Stop as StopIcon,
} from '@material-ui/icons';
import {
  addNewRectangleNode,
  changeMode,
} from '../../../redux/actions/whiteboard';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { changeMode, addNewRectangleNode })(
  RectangleMenu
);
