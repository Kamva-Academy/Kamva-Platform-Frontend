import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Save as SaveIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState, FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';
import {
  removeStateAction,
  updateStateAction,
} from '../../redux/slices/workshop';
import AreYouSure from '../Dialog/AreYouSure';
import Widget, { WidgetModes } from '../Widget';
import CreateWidgetDialog from './dialogs/CreateWidgetDialog';

type EditWidgetsPropsType = {
  removeState: any;
  updateState: any;
  widgets: any[];
  id: number;
  name: string;
}

const EditWidgets: FC<EditWidgetsPropsType> = ({
  removeState,
  updateState,

  widgets = [],
  id: stateId,
  name,
}) => {
  const t = useTranslate();
  const { fsmId } = useParams()
  const [openCreateProblemDialog, setOpenCreateProblemDialog] = useState(false);
  const [openCreateContentDialog, setOpenCreateContentDialog] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [isEditingStateName, setIsEditingStateName] = useState(false);
  const [newName, setNewName] = useState<string>(null);

  useEffect(() => {
    if (name) {
      setNewName(name)
    }
  }, [name])

  const questions = widgets?.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const questionWidgets = useMemo(
    () => questions.map((widget) => (
      <Box key={widget.index}>
        <Widget
          stateId={stateId}
          widget={widget}
          mode={WidgetModes.Edit}
        />
      </Box>
    )), [questions])

  const nonQuestions = widgets?.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  const nonQuestionWidgets = useMemo(() =>
    nonQuestions.map((widget) => (
      <Box key={widget.id}>
        <Widget
          stateId={stateId}
          widget={widget}
          mode={WidgetModes.Edit}
        />
      </Box>
    )), [nonQuestions])

  return (
    <>
      <Stack spacing={2}>
        {stateId &&
          <Stack direction='row' alignItems='flex-start' justifyContent='space-between'>
            {isEditingStateName &&
              <TextField
                onChange={(e) => setNewName(e.target.value)}
                fullWidth variant='outlined'
                defaultValue={name} />
            }
            {!isEditingStateName &&
              <Typography align="center" variant="h1" gutterBottom>
                {name}
              </Typography>
            }
            <Stack direction='row'>
              {isEditingStateName &&
                <Tooltip title='ذخیره' arrow>
                  <IconButton size='small'
                    onClick={() => {
                      updateState({ stateId, name: newName, fsm: fsmId });
                      setIsEditingStateName(false);
                    }
                    }>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              }
              {!isEditingStateName &&
                <Tooltip title='ویرایش نام گام' arrow>
                  <IconButton size='small' onClick={() => setIsEditingStateName(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
              <Tooltip title='حذف گام' arrow>
                <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        }
        <Typography variant='h2' gutterBottom>
          {'مسئله‌ها'}
        </Typography>
        <Divider />
        {questionWidgets}
        {
          questions?.length === 0 &&
          <Box m={2}>
            <Typography variant='h4' align="center">{'مسئله‌ای در این گام وجود ندارد!'}</Typography>
          </Box>
        }
        {
          stateId &&
          <Button
            color="primary" variant="contained"
            fullWidth startIcon={<AddIcon />}
            onClick={() => setOpenCreateProblemDialog(true)}>
            {'افزودن مسئله جدید'}
          </Button>
        }
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        {nonQuestionWidgets}
        {
          nonQuestions?.length === 0 &&
          <Box m={2}>
            <Typography variant='h4' align="center">{'محتوایی در این گام وجود ندارد!'}</Typography>
          </Box>
        }
        {
          stateId &&
          <Button
            color="primary" variant="contained"
            fullWidth startIcon={<AddIcon />}
            onClick={() => setOpenCreateContentDialog(true)}>
            {'افزودن محتوای جدید'}
          </Button>
        }
      </Stack >
      <CreateWidgetDialog
        showQuestions={true}
        showContent={false}
        stateId={stateId}
        open={openCreateProblemDialog}
        handleClose={() => setOpenCreateProblemDialog(false)}
      />
      <CreateWidgetDialog
        stateId={stateId}
        open={openCreateContentDialog}
        handleClose={() => setOpenCreateContentDialog(false)}
      />
      <AreYouSure
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => removeState({ stateId })}
      />
    </>
  );
}

export default connect(
  null,
  {
    removeState: removeStateAction,
    updateState: updateStateAction,
  }
)(EditWidgets);
