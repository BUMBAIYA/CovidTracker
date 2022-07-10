// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.grey[0] }
          }
        },
        input: {
          '&::placeholder': {
            opacity: 0.5,
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.error.main
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground
          }
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[400]
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              // borderColor: theme.palette.action.disabledBackground,
              borderColor: theme.palette.grey[400]
            }
          },
          '& fieldset': {
            borderColor: theme.palette.grey[400]
          },
          '&:hover fieldset': {
            borderColor: "red"
          }
        }
      }
    }
  };
}
