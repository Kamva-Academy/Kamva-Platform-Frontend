import { Divider, Fab, Grid, Paper, Typography, Box, Stack } from '@mui/material';
import { Help as HelpIcon } from '@mui/icons-material';
import React, { useMemo, useState, useCallback } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget from 'components/organisms/Widget';
import BackButton from 'components/atoms/BackButton';
import HelpDialog from 'components/organisms/dialogs/FSMStateHelpDialog';
import NextButton from 'components/atoms/NextButton';
import GraphType1 from 'components/organisms/Graph/GraphType1';

function StatePage({ state = {} }) {
  const t = useTranslate();
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  const widgets = [...state.widgets];
  const hints = [...state.hints];

  const { inward_edges, outward_edges } = state;

  hints.sort((a, b) => a.id - b.id);
  widgets.sort((a, b) => a.id - b.id);

  const questions = widgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );

  const questionWidgets = useMemo(() =>
    questions.map((widget, index) => (
      <Stack key={widget.id}>
        <Divider style={{ marginBottom: 20 }} />
        <Widget coveredWithPaper={false} key={widget.id} widget={widget} />
      </Stack>
    )), [questions]);

  const notQuestions = widgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  const notQuestionWidgets = useMemo(() =>
    notQuestions.map((widget) => (
      <Stack key={widget.id}>
        <Widget coveredWithPaper={false} widget={widget} />
      </Stack>
    )), [notQuestions]);

  return (
    <>
      <Grid container spacing={2} sx={{ paddingTop: 4 }} justifyContent="center">
        <Grid
          item xs={12}
          md={notQuestions.length > 0 ? 4 : 6}
          lg={notQuestions.length > 0 ? 4 : 8}>
          <Stack spacing={2}>
            <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
              <Typography align="center" component="h2" variant="h3" gutterBottom>
                {state.name}
              </Typography>
              {questionWidgets}
              <Divider sx={{ display: { xs: 'none', md: 'inherit' } }} />
              <Stack sx={{ display: { xs: 'none', md: 'inherit' } }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <BackButton inwardEdges={inward_edges} />
                  </Grid>
                  <Grid item xs={6}>
                    <NextButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
            <Box component={Paper}>
              <GraphType1 currentNode={state.name} passedLinks={state.inward_edges} futureLinks={state.outward_edges} />
            </Box>
          </Stack>
        </Grid>
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Stack component={Paper} sx={{ padding: 1 }} spacing={1}>
              {notQuestionWidgets}
              <Stack sx={{ display: { xs: 'inherit', md: 'none' }, paddingY: 1 }} >
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <BackButton inwardEdges={inward_edges} />
                  </Grid>
                  <Grid item xs={6}>
                    <NextButton outwardEdges={outward_edges} />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid >

      {
        hints.length > 0 && (
          <>
            <Fab
              size="small"
              variant="extended"
              sx={{ position: 'fixed', left: 20, bottom: 20 }}
              onClick={() => setOpenHelpDialog(true)}>
              <HelpIcon sx={{ marginRight: 1 }} />
              <Typography>{t('help')}</Typography>
            </Fab>
            <HelpDialog
              open={openHelpDialog}
              handleClose={() => setOpenHelpDialog(false)}
              helps={hints}
            />
          </>
        )
      }
    </>
  );
}

export default StatePage;
