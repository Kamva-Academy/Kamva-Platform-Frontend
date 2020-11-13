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
  FiberManualRecordOutlined as FiberManualRecordOutlinedIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from '@material-ui/icons';
import {
  addNewCircleNode,
  changeMode,
} from '../../../redux/actions/whiteboard';
import { connect } from 'react-redux';
import DrawingModes from '../../Konva/Drawing/DrawingModes';

const CircleMenu = ({ changeMode, addNewCircleNode }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'circleMenu',
  });

  const onClick = (type) => {
    changeMode(DrawingModes.MOVE);
    addNewCircleNode({ type });
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { changeMode, addNewCircleNode })(
  CircleMenu
);
