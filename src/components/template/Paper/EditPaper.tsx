import { Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';

type EditPaperPropsType = {
  widgets: any[];
  paperId?: number;
  mode?: 'contents' | 'problems' | 'all';
  collectData?: any;
}

const EditPaper: FC<EditPaperPropsType> = ({ widgets, paperId, mode = 'all', collectData }) => {
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);

  if (!paperId && !collectData) {
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
            {widgets.map((widget) => (
              <Widget
                key={widget.id}
                paperId={paperId}
                widget={widget}
                mode={WidgetModes.Edit}
                collectData={collectData}
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
      />
    </Fragment>
  );
}

export default EditPaper;
