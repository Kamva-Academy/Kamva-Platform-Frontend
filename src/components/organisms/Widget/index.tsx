import { Box, Divider, IconButton, Paper, Stack, Typography, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Help as HelpIcon } from '@mui/icons-material';
import React, { FC, useMemo, useState } from 'react';

import DeleteWidgetDialog from 'components/organisms/dialogs/DeleteWidgetDialog';
import EditHintsDialog from 'components/organisms/dialogs/EditHintsDialog';
import { toPersianNumber } from 'utils/translateNumber';
import WidgetHint from 'components/molecules/WidgetHint';
import useWidgetFactory from './useWidgetFactory';

export enum WidgetModes {
  Create,
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
  TextWidget = 'TextWidget',
  DetailBoxWidget = 'DetailBoxWidget',
  Image = 'Image',
  Video = 'Video',
  Game = 'Game',
}

enum AnswerType2WidgetType {
  SmallAnswer = WidgetTypes.SmallAnswerProblem,
  BigAnswer = WidgetTypes.BigAnswerProblem,
  UploadFileAnswer = WidgetTypes.UploadFileProblem,
  MultiChoiceAnswer = WidgetTypes.MultiChoiceProblem,
  TextWidget = WidgetTypes.TextWidget,
  DetailBoxWidget = WidgetTypes.DetailBoxWidget,
  Image = WidgetTypes.Image,
  Video = WidgetTypes.Video,
  Game = WidgetTypes.Game,
}

type WidgetPropsType = {
  widget: any;
  mode?: WidgetModes;
  paperId?: number | null;
  coveredWithPaper?: boolean;
  collectDataForPaper?: any;
}

const Widget: FC<WidgetPropsType> = ({
  widget,
  mode = WidgetModes.View,
  paperId,
  coveredWithPaper = true,
  collectDataForPaper,
}) => {
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditHintDialog, setEditHintDialog] = useState(false);
  const widgetType = widget.widget_type || AnswerType2WidgetType[widget.answer_type];
  const {
    onDelete,
    onEdit,
    onAnswerChange,
    onAnswerSubmit,
    onViwe,
    WidgetComponent,
    EditWidgetDialog,
  } = useWidgetFactory({
    widgetId: widget.id,
    paperId,
    widgetType,
    mode,
    collectDataForPaper,
  });

  const Cover = useMemo(() =>
    coveredWithPaper
      ? (props) =>
        <Paper elevation={2} sx={{ padding: 1 }}>
          {props.children}
        </Paper>
      : (props) => props.children
    , [widget])

  return (
    <Cover>
      <Stack sx={{ position: 'relative' }}>
        {mode === WidgetModes.Edit &&
          <Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='h3' gutterBottom>
                {widget.name ? widget.name : `ویجت ${toPersianNumber(widget.id)}`}
              </Typography>
              <Box>
                <Tooltip title='راهنمایی‌ها' arrow>
                  <IconButton size='small' onClick={() => setEditHintDialog(true)}>
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
              paperId={paperId}
              open={openEditDialog}
              handleClose={() => setOpenEditDialog(false)}
              onEdit={onEdit}
            />
            <DeleteWidgetDialog
              paperId={paperId}
              widgetId={widget.id}
              open={openDeleteWidgetDialog}
              handleClose={() => setOpenDeleteWidgetDialog(false)}
              onDelete={onDelete}
            />
            <EditHintsDialog
              hints={widget.hints}
              referenceId={widget.id}
              open={openEditHintDialog}
              handleClose={() => setEditHintDialog(false)}
            />
          </Stack>
        }
        {(mode === WidgetModes.View && widget?.hints?.length) ? <WidgetHint hints={widget.hints} /> : null}
      </Stack>
      <WidgetComponent {...widget} mode={mode} onAnswerSubmit={onAnswerSubmit} onAnswerChange={onAnswerChange} />
    </Cover>
  );
};

export default Widget;
