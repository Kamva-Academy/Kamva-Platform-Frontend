import { Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from '../Widget';
import CreateWidgetDialog from './dialogs/CreateWidgetDialog';

type EditWidgetsPropsType = {
  widgets: any[];
  stateId: number;
  mode?: 'contents' | 'problems' | 'all';
}

const EditWidgets: FC<EditWidgetsPropsType> = ({ widgets, stateId, mode = 'all' }) => {
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);

  return (
    <>
      <Stack
        spacing={2}
        justifyContent="center">
        {widgets.length === 0 ?
          <Typography align="center">{t('thereIsNoItem')}</Typography>
          :
          <>
            {
              widgets.map((widget) => (
                <Widget
                  key={widget.id}
                  stateId={stateId}
                  widget={widget}
                  mode={WidgetModes.Edit}
                />
              ))
            }
          </>
        }
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => setOpenCreateWidgetDialog(true)}
          startIcon={<AddIcon />}>
          {t('createWidget')}
        </Button>
      </Stack>

      <CreateWidgetDialog
        showProblems={mode === 'problems' || mode === 'all'}
        showContent={mode === 'contents' || mode === 'all'}
        stateId={stateId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </>
  );
}

export default EditWidgets;
