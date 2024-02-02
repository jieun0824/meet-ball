'use client';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider } from '@emotion/react';
import { CalendarTheme } from './mui-theme';

export default function Calendar() {
  return (
    <ThemeProvider theme={CalendarTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            ...{
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: '#20ECC7',
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
