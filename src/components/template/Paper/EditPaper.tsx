import { Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';

type EditPaperPropsType = {
  widgets: any[];
  paperId: number | null;
  mode?: 'contents' | 'problems' | 'all';
  addWidget?: any;
  removeWidget?: any;
}

const EditPaper: FC<EditPaperPropsType> = ({ widgets, paperId, mode = 'all', addWidget, removeWidget }) => {
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);

  if (!paperId && !addWidget) {
    throw Error('Invalid Props In Editing Paper');
  }

  return (
    <Fragment>
      <Stack
        spacing={2}
        justifyContent="center">
        {widgets.length === 0 ?
          <Typography align="center">{t('thereIsNoItem')}</Typography> :
          <Fragment>
            {widgets.map((widget, index) => (
              <Widget
                key={index}
                paperId={paperId}
                widget={widget}
                mode={WidgetModes.Edit}
                collectDataForPaper={addWidget}
              />
            ))}
          </Fragment>
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
        paperId={paperId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
        collectDataForPaper={addWidget}
      />
    </Fragment>
  );
}

export default EditPaper;
