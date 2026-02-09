import { CustomField } from './CustomField'
import { Event } from './Event'
import { TicketBought } from './TicketBought'
import { Transaction } from './Transaction'

export type Ticket = {
  id: string
  name: string
  volume: number
  numPersons: number
  price: number
  originalPrice: number | null
  description: string | null
  eventId: string
  createdAt: Date
  image: string | null
  unlisted: boolean
  show_volume: boolean
  maxPerUser: number | null
  customFields: CustomField[]
  event: Event
  sales: TicketBought[]
  transactions: Transaction[]
}

export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  ticketId: string;
  ticketName: string;
}

export interface CustomFieldValue {
  fieldId: string;
  value: string;
}

export interface TicketItem {
  ticketId: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface TicketPurchaseMetadata {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  purpose: "ticket";
  tickets: TicketItem[];
  totalQuantity: number;
  bearer: string;
  attendees?: Attendee[];
  reseller?: string;
  coupon?: string;
  customFields?: CustomFieldValue[];
}

export interface TicketPaymentRequest {
  email: string;
  amount: number;
  callback_url: string;
  metadata: TicketPurchaseMetadata;
}

export interface FreeTicketRequest {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  purpose: "ticket";
  tickets: TicketItem[];
  totalQuantity: number;
  bearer: string;
  attendees?: Attendee[];
  reseller?: string;
  coupon?: string;
  customFields?: CustomFieldValue[];
}

export interface FreeTicketResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}