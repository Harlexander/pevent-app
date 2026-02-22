import { TicketBought } from '@/types'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

function generateReceiptHTML(ticket: TicketBought): string {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  const ticketPrice = ticket.ticket.price
  const transFee = ticket.transaction?.trans_fee ?? 0
  const totalAmount = ticket.transaction?.amount ?? ticketPrice

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 24px; color: #1e293b; }
        .receipt { max-width: 420px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: #004cff; padding: 32px 24px; text-align: center; color: #fff; }
        .header h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { font-size: 13px; opacity: 0.85; margin-top: 4px; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; }
        .body { padding: 24px; }
        .event-name { font-size: 20px; font-weight: 700; margin-bottom: 16px; text-transform: capitalize; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 10px; }
        .row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; }
        .row .label { color: #64748b; font-size: 14px; }
        .row .value { font-weight: 600; font-size: 14px; text-transform: capitalize; }
        .divider { height: 1px; background: #e2e8f0; margin: 16px 0; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
        .total-row .label { font-weight: 700; font-size: 16px; }
        .total-row .value { font-weight: 800; font-size: 18px; color: #004cff; }
        .footer { text-align: center; padding: 20px 24px; border-top: 1px dashed #e2e8f0; }
        .footer p { font-size: 12px; color: #94a3b8; }
        .ticket-id { font-family: monospace; font-size: 12px; color: #64748b; background: #f1f5f9; padding: 8px 12px; border-radius: 8px; text-align: center; margin-top: 12px; }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <h1>Pevent</h1>
          <p>Event Receipt</p>
          <div class="badge">Payment Confirmed</div>
        </div>

        <div class="body">
          <div class="event-name">${ticket.ticket.event.name}</div>

          <div class="section">
            <div class="section-title">Event Details</div>
            <div class="row">
              <span class="label">Date</span>
              <span class="value">${formatDate(ticket.ticket.event.date)}</span>
            </div>
            <div class="row">
              <span class="label">Time</span>
              <span class="value">${ticket.ticket.event.time || 'TBA'}</span>
            </div>
            ${
              ticket.ticket.event.venue
                ? `<div class="row"><span class="label">Venue</span><span class="value">${ticket.ticket.event.venue}</span></div>`
                : ''
            }
            <div class="row">
              <span class="label">Location</span>
              <span class="value">${ticket.ticket.event.city || 'TBA'}${ticket.ticket.event.state ? ', ' + ticket.ticket.event.state : ''}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="section">
            <div class="section-title">Ticket Holder</div>
            <div class="row">
              <span class="label">Name</span>
              <span class="value">${ticket.firstName} ${ticket.lastName}</span>
            </div>
            <div class="row">
              <span class="label">Email</span>
              <span class="value" style="text-transform: none;">${ticket.email}</span>
            </div>
            <div class="row">
              <span class="label">Ticket Type</span>
              <span class="value">${ticket.ticket.name}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="section">
            <div class="section-title">Payment Breakdown</div>
            <div class="row">
              <span class="label">Ticket Price</span>
              <span class="value">${formatCurrency(ticketPrice)}</span>
            </div>
            ${
              transFee > 0
                ? `<div class="row"><span class="label">Transaction Fee</span><span class="value">${formatCurrency(transFee)}</span></div>`
                : ''
            }
            <div class="divider"></div>
            <div class="total-row">
              <span class="label">Total</span>
              <span class="value">${formatCurrency(totalAmount)}</span>
            </div>
          </div>

          ${
            ticket.transaction?.ref
              ? `<div class="row"><span class="label">Transaction Ref</span><span class="value" style="text-transform: none; font-size: 12px;">${ticket.transaction.ref}</span></div>`
              : ''
          }

          <div class="ticket-id">Ticket ID: ${ticket.id}</div>
        </div>

        <div class="footer">
          <p>Purchased on ${formatDate(ticket.createdAt)}</p>
          <p style="margin-top: 8px;">Thank you for using Pevent</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function downloadReceipt(ticket: TicketBought): Promise<void> {
  const html = generateReceiptHTML(ticket)
  const { uri } = await Print.printToFileAsync({ html })
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: `Receipt - ${ticket.ticket.event.name}`,
    UTI: 'com.adobe.pdf',
  })
}
