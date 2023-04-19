import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import { StDatePicker } from './DatePicker.styled';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import React from 'react';
import { FormatDateString } from '@uvarov.frontend/vanilla-calendar/src/types';

interface IDatePickerProps {
  current: string;
  enabled?: Array<string>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setIsCalendarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DatePicker({
  current,
  selected,
  enabled = [],
  setSelected,
  setIsCalendarOpen,
}: IDatePickerProps) {
  const datePickerEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!datePickerEl.current || !selected) return;
    const datePicker = new VanillaCalendar(datePickerEl.current, {
      settings: {
        lang: 'en',
        iso8601: false,
        range: {
          max: current as FormatDateString,
        },
        selection: { day: 'single' },
        selected: {
          dates: [selected],
          month: Number(selected.substring(5, 7)) - 1,
          year: Number(selected.substring(0, 4)),
        },
      },
      actions: {
        clickDay(event, dates) {
          setSelected(dates[0]);
          setIsCalendarOpen(false);
        },
      },
    });
    datePicker.init();

    if (enabled.length > 0) {
      datePicker.settings.range.disableAllDays = true;
      datePicker.settings.range.enabled = enabled;
      datePicker.update();
    }
  }, [datePickerEl, selected]);

  return <StDatePicker ref={datePickerEl} />;
}
