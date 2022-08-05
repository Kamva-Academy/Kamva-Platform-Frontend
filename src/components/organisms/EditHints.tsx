import { Box, Button, Grid, Paper, Tooltip, Typography, Divider, Stack, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AreYouSure from '../Dialog/AreYouSure';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { createHintAction, deleteHintAction } from '../../redux/slices/Paper';

import Widget, { WidgetModes } from '../Widget';
import CreateWidgetDialog from './dialogs/CreateWidgetDialog';

type EditHintsPropsType = {
  papers: object;
  hints: any[];
  stateId: number;
  createHint: any;
  deleteHint: any;
}

const EditHints: FC<EditHintsPropsType> = ({
  papers,
  hints = [],
  stateId,
  createHint,
  deleteHint,
}) => {
  const t = useTranslate();
  const [hintId, setHintId] = useState<number>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<number>(null);

  const newHints = [];
  for (const hint of hints) {
    if (Object.keys(papers).includes(hint.id.toString())) {
      newHints.push(papers[hint.id])
    }
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {t('help')}
      </Typography>
      <Divider />
      <Stack>
        <Grid container alignItems='stretch' spacing={2}>
          {newHints.length > 0 ?
            newHints.map((hint, index) => (
              <Grid item key={index} xs={12} md={6}>
                <Paper sx={{ padding: 1 }} key={hint.id} elevation={5}>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography>{t('helpNumber') + " " + (index + 1)}</Typography>
                      <Box>
                        <Tooltip title='حذف راهنمایی' arrow>
                          <IconButton size='small' onClick={() => setDeleteDialogId(hint.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Stack>
                    {hint.widgets.map((widget) => (
                      <Widget
                        key={widget.id}
                        stateId={hint.id}
                        widget={widget}
                        mode={WidgetModes.Edit}
                      />
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => setHintId(hint.id)}>
                      {t('createWidget')}
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))
            :
            <Box m={2}>
              <Typography variant='h4' align="center">{'موردی وجود ندارد!'}</Typography>
            </Box>}
        </Grid>
      </Stack>
      <Button
        fullWidth
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => createHint({ stateId })}>
        {t('createHelp')}
      </Button>
      <CreateWidgetDialog
        stateId={hintId}
        open={!!hintId}
        handleClose={() => setHintId(null)}
      />
      <AreYouSure
        open={!!deleteDialogId}
        handleClose={() => setDeleteDialogId(null)}
        callBackFunction={() => deleteHint({ hintId: deleteDialogId })}
      />
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  papers: state.paper.papers,
})

export default connect(
  mapStateToProps,
  {
    createHint: createHintAction,
    deleteHint: deleteHintAction,
  }
)(EditHints);
