import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import DeleteWidgetDialog from './components/DeleteWidgetDialog';
import WIDGET_TYPES from './WidgetTypes';

export const MODES = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

const Widget = ({ widget, mode = MODES.VIEW, stateId, ...props }) => {
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { WidgetComponent, WidgetEditDialog } = WIDGET_TYPES[
    widget.widget_type
  ];

  return (
    <div>
      {mode === MODES.EDIT && (
        <>
          <IconButton onClick={() => setOpenEditDialog(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setOpenDeleteWidgetDialog(true)}>
            <DeleteIcon />
          </IconButton>
          <WidgetEditDialog
            stateId={stateId}
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
          />
          <DeleteWidgetDialog
            id={widget.id}
            open={openDeleteWidgetDialog}
            handleClose={() => setOpenDeleteWidgetDialog(false)}
          />
        </>
      )}
      <WidgetComponent {...widget} {...props} disabled={mode === MODES.EDIT} />
    </div>
  );
};

export default Widget;
