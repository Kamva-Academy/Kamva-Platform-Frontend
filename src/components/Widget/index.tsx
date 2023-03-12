import { Box, Divider, IconButton, Paper, Stack, Typography, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Help as HelpIcon } from '@mui/icons-material';
import React, { FC, useMemo, useState } from 'react';

import DeleteWidgetDialog from '../organisms/dialogs/DeleteWidgetDialog';
import WIDGET_TYPES from './WidgetTypes';
import EditHintsDialog from '../organisms/dialogs/EditHintsDialog';

export enum WidgetModes {
  View,
  Edit,
  Review,
  InAnswerSheet,
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
  stateId?: number;
  collectAnswers?: any;
  coveredWithPaper?: boolean;
}

const Widget: FC<WidgetPropsType> = ({ widget, mode = WidgetModes.View, stateId, coveredWithPaper = true, collectAnswers }) => {
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openHintDialog, setOpenHintDialog] = useState(false);
  const widgetType = widget.widget_type || AnswerType2WidgetType[widget.answer_type];
  const { WidgetComponent, EditWidgetDialog } = WIDGET_TYPES[widgetType];

  const Cover = useMemo(() =>
    coveredWithPaper
      ? (props) =>
        <Paper elevation={2} sx={{ padding: 1 }}>
          {props.children}
        </Paper>
      : (props) => props.children
    , [widget])

  const widgetMemoizedComponent = useMemo(() =>
    <WidgetComponent {...widget} mode={mode} collectAnswers={collectAnswers} />
    , [widget])

  return (
    <Cover>
      {mode === WidgetModes.Edit &&
        <Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='h3' gutterBottom>
              {/* {widget.name ? widget.name : 'بی‌نام'} */}
            </Typography>
            <Box>
              <Tooltip title='راهنمایی‌ها' arrow>
                <IconButton size='small' onClick={() => setOpenHintDialog(true)}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
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
          <EditHintsDialog
            stateId={stateId}
            widgetId={widget.id}
            open={openHintDialog}
            handleClose={() => setOpenHintDialog(false)}
          />
        </Stack>
      }
      {widgetMemoizedComponent}
    </Cover>
  );
};

export default Widget;
