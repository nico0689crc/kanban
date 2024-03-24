export function defaultProps() {
  return {
    MuiButton: {
      defaultProps: {
        color: 'inherit',
        disableElevation: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      }
    }
  };
}
