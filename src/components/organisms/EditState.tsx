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
import EditWidgets from './EditWidgets';
import EditHints from './EditHints';

type EditStatePropsType = {
  removeState: any;
  updateState: any;
  hints: any[];
  widgets: any[];
  id: number;
  name: string;
}

const EditState: FC<EditStatePropsType> = ({
  removeState,
  updateState,

  hints,
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

  const problems = widgets?.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const contents = widgets?.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

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
        <EditWidgets widgets={problems} stateId={stateId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <EditWidgets widgets={contents} stateId={stateId} mode='contents' />
        <EditHints hints={hints} stateId={stateId} />
      </Stack >
      <CreateWidgetDialog
        showProblems={true}
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

export default connect(null, {
  removeState: removeStateAction,
  updateState: updateStateAction,
})(EditState);
