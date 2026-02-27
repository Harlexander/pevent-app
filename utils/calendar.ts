import * as Calendar from 'expo-calendar'
import { Alert, Linking, Platform } from 'react-native'
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

  const writable = calendars.find((c) => c.allowsModifications && c.source?.name !== 'Birthdays')
  return writable?.id ?? null
}

function promptOpenSettings() {
  Alert.alert(
    'Calendar Access Required',
    'Please enable calendar access in your device settings to add events.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ],
  )
}

async function ensureCalendarPermission(): Promise<boolean> {
  const { status: existingStatus } = await Calendar.getCalendarPermissionsAsync()

  if (existingStatus === 'granted') return true

  const { status } = await Calendar.requestCalendarPermissionsAsync()

  if (status === 'granted') return true

  promptOpenSettings()
  return false
}

export async function addEventToCalendar(
  data: CalendarEventData,
): Promise<{ success: boolean; message: string }> {
  try {
    const hasPermission = await ensureCalendarPermission()
    if (!hasPermission) {
      return { success: false, message: '' }
    }

    const calendarId = await getDefaultCalendarId()
    if (!calendarId) {
      return { success: false, message: 'No writable calendar found on this device' }
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

    if (isNaN(startDate.getTime())) {
      return { success: false, message: 'Could not parse event date' }
    }

    const endDate = addHours(startDate, 2)

    const eventId = await Calendar.createEventAsync(calendarId, {
      title: data.title,
      startDate,
      endDate,
      location: data.location,
      notes: data.notes,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })

    if (!eventId) {
      return { success: false, message: 'Failed to create calendar event' }
    }

    return { success: true, message: 'Event added to your calendar!' }
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to add event to calendar' }
  }
}
