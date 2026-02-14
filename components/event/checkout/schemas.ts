
import { z } from 'zod'

export const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    mobile: z.string().min(1, 'Mobile number is required').min(10, 'Invalid mobile number'),
})

export const attendeeSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    ticketId: z.string(),
    ticketName: z.string(),
})

export const attendeesArraySchema = z.array(attendeeSchema)

export type ContactFormData = z.infer<typeof contactSchema>
export type AttendeeFormData = z.infer<typeof attendeeSchema>
