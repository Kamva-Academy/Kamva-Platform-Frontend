import React from 'react';

import WIDGET_TYPES from './WidgetTypes';

export const MODES = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  CORRECTION: 'CORRECTION',
};

const Widget = ({ widget, ...props }) => {
  const { WidgetComponent } = WIDGET_TYPES[widget.widget_type];
  return (
    <>
      <WidgetComponent  {...widget} {...props} />
    </>
  );
};

export default Widget;
