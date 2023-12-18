import { Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';

type EditPaperPropsType = {
  widgets: any[];
  paperId: number;
  mode?: 'contents' | 'problems' | 'all';
}

const EditPaper: FC<EditPaperPropsType> = ({ widgets, paperId, mode = 'all' }) => {
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
                  paperId={paperId}
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
        paperId={paperId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </>
  );
}

export default EditPaper;
