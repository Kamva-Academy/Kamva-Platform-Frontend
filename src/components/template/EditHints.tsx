import { Box, Button, Grid, Paper, Tooltip, Typography, Divider, Stack, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  createHintAction,
  deleteHintAction,
  createWidgetHintAction,
  deleteWidgetHintAction,
} from 'redux/slices/Paper';

import Widget, { WidgetModes } from '../Widget';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';
import { toPersianNumber } from 'utils/translateNumber';

type EditHintsPropsType = {
  type: 'widget' | 'state';
  papers: object;
  hints: any[];
  referenceId: number;
  createHint: any;
  deleteHint: any;
  createWidgetHint: any,
  deleteWidgetHint: any,
}

const EditHints: FC<EditHintsPropsType> = ({
  type = 'state',
  papers,
  hints = [],
  referenceId,
  createHint,
  deleteHint,
  createWidgetHint,
  deleteWidgetHint,
}) => {
  const t = useTranslate();
  const [hintId, setHintId] = useState<number>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<number>(null);

  // TOFF
  const newHints = [...hints];
  for (const hint of hints) {
    if (Object.keys(papers).includes(hint.id.toString())) {
      newHints.push(papers[hint.id])
    }
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {'راهنمایی‌ها'}
      </Typography>
      <Divider />
      {newHints.length > 0 ?
        <Stack>
          <Grid container alignItems='stretch' spacing={2}>
            {newHints.map((hint, index) => (
              <Grid item key={index} xs={12} md={6}>
                <Paper sx={{ padding: 1 }} key={hint.id} elevation={3}>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Typography>{t('helpNumber') + " " + toPersianNumber(index + 1)}</Typography>
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
                        paperId={hint.id}
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
            }
          </Grid>
        </Stack>
        :
        <Box mt={2}>
          <Typography variant='h4' align="center">{'موردی وجود ندارد!'}</Typography>
        </Box>
      }
      <Button
        fullWidth
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => type === 'state' ? createHint({ referenceId }) : createWidgetHint({ referenceId })}>
        {t('createHelp')}
      </Button>
      <CreateWidgetDialog
        paperId={hintId}
        open={!!hintId}
        handleClose={() => setHintId(null)}
      />
      <AreYouSure
        open={!!deleteDialogId}
        handleClose={() => setDeleteDialogId(null)}
        callBackFunction={() => type === 'state' ? deleteHint({ hintId: deleteDialogId }) : deleteWidgetHint({ hintId: deleteDialogId })}
      />
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  papers: state.paper.papers,
})

export default connect(mapStateToProps, {
  createHint: createHintAction,
  deleteHint: deleteHintAction,
  // TOFF
  createWidgetHint: createWidgetHintAction,
  deleteWidgetHint: deleteWidgetHintAction,
})(EditHints);
