import { Box, Divider, IconButton, Paper, Stack, Typography, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { FC, useState } from 'react';

import DeleteWidgetDialog from '../organisms/dialogs/DeleteWidgetDialog';
import WIDGET_TYPES from './WidgetTypes';

export enum WidgetModes {
  View,
  Edit,
};

enum WidgetTypes {
  SmallAnswerProblem = 'SmallAnswerProblem',
  BigAnswerProblem = 'BigAnswerProblem',
  UploadFileProblem = 'UploadFileProblem',
  MultiChoiceProblem = 'MultiChoiceProblem',
  Description = 'Description',
  Image = 'Image',
  Video = 'Video',
  Game = 'Game',
}

enum AnswerType2WidgetType {
  SmallAnswer = WidgetTypes.SmallAnswerProblem,
  BigAnswer = WidgetTypes.BigAnswerProblem,
  UploadFileAnswer = WidgetTypes.UploadFileProblem,
  MultiChoiceAnswer = WidgetTypes.MultiChoiceProblem,
  Description = WidgetTypes.Description,
  Image = WidgetTypes.Image,
  Video = WidgetTypes.Video,
  Game = WidgetTypes.Game,
}

type WidgetPropsType = {
  widget: any;
  mode: WidgetModes;
  stateId: number;
}

const Widget: FC<WidgetPropsType> = ({ widget, mode = WidgetModes.View, stateId, ...props }) => {
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const widgetType = widget.widget_type || AnswerType2WidgetType[widget.answer_type];
  const { WidgetComponent, EditWidgetDialog } = WIDGET_TYPES[widgetType];

  return (
    <Paper
      elevation={2}
      sx={{ padding: 1 }}>
      {mode === WidgetModes.Edit &&
        <Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='h3' gutterBottom>
              {widget.name ? widget.name : 'بی‌نام'}
            </Typography>
            <Box>
              <Tooltip title='ویرایش ویجت' arrow>
                <IconButton size='small' onClick={() => setOpenEditDialog(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='حذف ویجت' arrow>
                <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
          <Box mb={2}>
            <Divider />
          </Box>
          <EditWidgetDialog
            {...widget}
            stateId={stateId}
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
          />
          <DeleteWidgetDialog
            stateId={stateId}
            widgetId={widget.id}
            open={openDeleteWidgetDialog}
            handleClose={() => setOpenDeleteWidgetDialog(false)}
          />
        </Stack>
      }
      <WidgetComponent  {...widget} mode={mode} />
    </Paper>
  );
};

export default Widget;
