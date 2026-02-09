// CustomField database type

import { FormValue } from "./FormValue"
import { Ticket } from "./Ticket"

export type CustomField = {
  id: string
  label: string
  key: string
  type: FieldType
  required: boolean
  options: string[]
  placeholder: string | null
  ticketId: string
  createdAt: Date
  updatedAt: Date
  ticket: Ticket
  formValues: FormValue[]
  deleted_at: Date | null
}

// Enums used by CustomField
export enum FieldType {
  text = 'text',
  number = 'number',
  email = 'email',
  phone = 'phone',
  date = 'date',
  select = 'select',
  radio = 'radio',
  checkbox = 'checkbox',
  textarea = 'textarea'
}