import { createTheme } from '@mui/material/styles';

const CalendarTheme = (theme: any) =>
  createTheme({
    ...theme,
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'white',
            borderRadius: 2,
            borderWidth: 0,
          },
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          weekDayLabel: {
            color: '#20ECC7',
          },
          root: {
            height: '100%',
            backgroundColor: '#3C3F45',
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContents: 'center',
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: 'white',
            '&.Mui-selected': {
              backgroundColor: '#20ECC7 !important',
              border: 'none',
            },
          },
        },
      },
    },
  });

export { CalendarTheme };
