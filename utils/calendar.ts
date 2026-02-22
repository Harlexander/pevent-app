import * as Calendar from 'expo-calendar'
import { Platform } from 'react-native'
import { parse, addHours } from 'date-fns'

interface CalendarEventData {
  title: string
  date: string
  time?: string
  location?: string
  notes?: string
}

async function getDefaultCalendarId(): Promise<string | null> {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)

  if (Platform.OS === 'ios') {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync()
    if (defaultCalendar) return defaultCalendar.id
  }

  const writable = calendars.find(
    (c) => c.allowsModifications && c.source?.name !== 'Birthdays',
  )
  return writable?.id ?? null
}

export async function addEventToCalendar(
  data: CalendarEventData,
): Promise<{ success: boolean; message: string }> {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync()
    if (status !== 'granted') {
      return { success: false, message: 'Calendar permission denied' }
    }

    const calendarId = await getDefaultCalendarId()
    if (!calendarId) {
      return { success: false, message: 'No writable calendar found' }
    }

    let startDate: Date
    try {
      if (data.time) {
        const dateTimeStr = `${data.date} ${data.time}`
        startDate = parse(dateTimeStr, 'yyyy-MM-dd HH:mm', new Date())
        if (isNaN(startDate.getTime())) {
          startDate = parse(dateTimeStr, 'yyyy-MM-dd hh:mm a', new Date())
        }
      } else {
        startDate = parse(data.date, 'yyyy-MM-dd', new Date())
      }
      if (isNaN(startDate.getTime())) {
        startDate = new Date(data.date)
      }
    } catch {
      startDate = new Date(data.date)
    }

    const endDate = addHours(startDate, 2)

    await Calendar.createEventAsync(calendarId, {
      title: data.title,
      startDate,
      endDate,
      location: data.location,
      notes: data.notes,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })

    return { success: true, message: 'Event added to calendar' }
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to add event to calendar' }
  }
}
