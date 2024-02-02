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
            border: '0px solid',
          },
        },
      },
      MuiDayCalendar: {
        styleOverrides: {
          weekDayLabel: {
            color: 'white',
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },
    },
  });

export { CalendarTheme };
