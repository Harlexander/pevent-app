// FormValue database type

import { TicketFormData } from "./TicketFormData"
import { CustomField } from "./CustomField"

export type FormValue = {
  id: string
  value: string
  customFieldId: string
  formDataId: string
  customField: CustomField
  ticketFormData: TicketFormData
}
