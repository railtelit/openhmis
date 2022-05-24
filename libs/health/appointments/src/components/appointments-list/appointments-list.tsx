import styles from './appointments-list.module.scss';
import { useFhirCreate, useFhirQuery } from '@ha/appfhir';
import { Button, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridColType, GridColumns } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

/* eslint-disable-next-line */
export interface AppointmentsListProps {

  create_action?: ()=> void
}

export function AppointmentsList(props: AppointmentsListProps) {
  return (
    //<div className={styles['container']}>
      <FullCalendar

        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        customButtons={{
          new: {
            text: 'new',
            click: () => {props.create_action && props.create_action()},
          },
        }}
        headerToolbar = {{
          start: 'title',
          center: 'timeGridDay,timeGridWeek,dayGridMonth new',
          end: 'today prev,next'
        }}

        contentHeight={"auto"}

        events={events}
      />
    //</div>
  );
}

const events = [
  { title: "All Day Event", start: "2022-05-01" },
  {
    title: "Long Event",
    start: "2022-05-07",
    end: "2022-05-10"
  },
  {
    groupId: "999",
    title: "Repeating Event",
    start: "2022-05-09T16:00:00+00:00"
  },
  {
    groupId: "999",
    title: "Repeating Event",
    start: "2022-05-16T16:00:00+00:00"
  },
  {
    title: "Conference",
    start: "2022-05-17",
    end: "2022-05-19"
  },
  {
    title: "Meeting",
    start: "2022-05-18T10:30:00+00:00",
    end: "2022-05-18T12:30:00+00:00"
  },
  { title: "Lunch", start: "2022-05-18T12:00:00+00:00"},
  { title: "Birthday Party", start: "2022-05-19T07:00:00+00:00" },
  { title: "Meeting", start: "2022-05-18T14:30:00+00:00"},
  { title: "Happy Hour", start: "2022-05-18T17:30:00+00:00" },
  { title: "Dinner", start: "2022-05-18T20:00:00+00:00"}
];

export default AppointmentsList;
