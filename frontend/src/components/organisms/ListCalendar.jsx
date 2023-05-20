import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import viLocale from '@fullcalendar/core/locales/vi'

// TODO_BETA: UI calendar
export default function ListCalendar({ event }) {
  return (
    <FullCalendar
      locale={viLocale}
      plugins={[dayGridPlugin, timeGridPlugin]}
      headerToolbar={{
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth timeGridWeek'
      }}
      initialView="timeGridWeek"
      dayMaxEvents={true}
      initialEvents={event}
      weekends={true}
    />
  )
}
