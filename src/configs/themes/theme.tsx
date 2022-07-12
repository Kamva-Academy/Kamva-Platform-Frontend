const theme = (variables) => ({
  palette: {
    primary: {
      main: variables.colors.primary,
    },
    grey: {
      300: variables.colors.inheritDefault1,
      A100: variables.colors.inheritDefault2,
    },
    secondary: {
      main: variables.colors.secondary,
    },
    error: {
      main: variables.colors.red,
    },
    success: {
      main: variables.colors.green,
    },
    warning: {
      main: variables.colors.orange,
    },
    helpers: {
      primary: variables.colors.blue,
      main: 'rgba(25, 46, 91, .09)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.1,
  },
  shape: {
    borderRadius: '0.5rem',
  },
  overrides: {
    MuiButton: {
      text: {
        paddingLeft: '14px',
        paddingRight: '14px',
      },
      containedSizeSmall: {
        paddingLeft: '14px',
        paddingRight: '14px',
      },
      root: {
        textTransform: 'none',
        fontWeight: 'normal',
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: variables.colors.second,
        padding: '8px 16px',
        fontSize: '13px',
      },
      arrow: {
        color: variables.colors.second,
      },
    },
  },
});

export default theme;
