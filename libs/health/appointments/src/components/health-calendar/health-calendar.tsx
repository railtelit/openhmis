import styles from './health-calendar.module.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import {Stack, Button } from '@mui/material';

/* eslint-disable-next-line */
export interface HealthCalendarProps {

  onClose?:()=>void,
  mode:string
}

export function HealthCalendar({onClose=()=>{const i = true },mode}: HealthCalendarProps) {
  return (
    <div className={styles['container']}>

        <Stack  direction={'row'} spacing={1} m={1}  p={1}  justifyContent={'end'}>
                {/* <Button  type='submit' variant='contained'  >{mode==='create'?'CREATE':'UPDATE'}</Button> */}
                <Button  variant='contained' color='error' onClick={ onClose!==undefined ? onClose: ()=>{
                  } } >CLOSE</Button>
        </Stack>

      <FullCalendar

        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        // customButtons={{
        //   new: {
        //     text: 'new',
        //     click: () => {props.createAction && props.createAction()},
        //   },
        // }}
        headerToolbar = {{
          start: 'title',
          center: 'timeGridDay,timeGridWeek,dayGridMonth',
          end: 'today prev,next'
        }}

        contentHeight={"auto"}

        events={events}
        />
    </div>
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

export default HealthCalendar;
