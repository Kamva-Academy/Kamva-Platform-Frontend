import { Box } from '@mui/material';
import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'components/organisms/Widget';
import Widget from 'components/organisms/Widget';
import EditPaper from './EditPaper';

type PaperPropsType = {
  paper: any;
}

const Paper: FC<PaperPropsType> = ({ paper }) => {

  if (!paper?.widgets) return null;

  return (
    <Fragment>
      {paper.widgets.map((widget) => (
        <Box key={widget.id}>
          <Widget paperId={paper.id} mode={WidgetModes.View} coveredWithPaper={false} widget={widget} />
        </Box>
      ))}
    </Fragment>
  );
};

export { EditPaper };
export default Paper;
