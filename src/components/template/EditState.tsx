import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Save as SaveIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';
import {
  removeStateAction,
  updateStateAction,
} from 'redux/slices/workshop';
import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';
import { EditPaper } from './Paper';
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
  id: paperId,
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
        {paperId &&
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
                      updateState({ paperId, name: newName, fsm: fsmId });
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
        <EditPaper widgets={problems} paperId={paperId} mode='problems' />
        <Typography variant='h2' gutterBottom>
          {'محتواها'}
        </Typography>
        <Divider />
        <EditPaper widgets={contents} paperId={paperId} mode='contents' />
        <EditHints hints={hints} referenceId={paperId} />
      </Stack >
      <CreateWidgetDialog
        showProblems={true}
        showContent={false}
        paperId={paperId}
        open={openCreateProblemDialog}
        handleClose={() => setOpenCreateProblemDialog(false)}
      />
      <CreateWidgetDialog
        paperId={paperId}
        open={openCreateContentDialog}
        handleClose={() => setOpenCreateContentDialog(false)}
      />
      <AreYouSure
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => removeState({ paperId })}
      />
    </>
  );
}

export default connect(null, {
  removeState: removeStateAction,
  updateState: updateStateAction,
})(EditState);
