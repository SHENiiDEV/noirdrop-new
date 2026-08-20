<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>New Support Ticket</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 32px; text-align: left; }
        .logo { font-size: 22px; font-weight: 900; color: #ffffff; margin-bottom: 24px; text-align: center; }
        .accent { color: #c084fc; }
        .ticket-box { background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; color: #e4e4e7; }
        .ticket-field { margin-bottom: 10px; }
        .ticket-field strong { color: #c084fc; }
        .message-content { white-space: pre-wrap; line-height: 1.6; color: #f4f4f5; font-size: 14px; background-color: #18181b; padding: 12px; border-radius: 8px; border: 1px solid #27272a; margin-top: 8px; }
        .footer { font-size: 11px; color: #71717a; margin-top: 32px; text-align: center; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <div class="logo">Noir<span class="accent">drop</span></div>
            
            <h2 style="font-size: 18px; text-align: center; color: #ffffff; margin: 0;">New Support Ticket Received</h2>

            <div class="ticket-box">
                <div class="ticket-field"><strong>Sender Name:</strong> {{ $ticket['name'] }}</div>
                <div class="ticket-field"><strong>Sender Email:</strong> {{ $ticket['email'] }}</div>
                <div class="ticket-field"><strong>Subject:</strong> {{ $ticket['subject'] }}</div>
                <div class="ticket-field">
                    <strong>Message Details:</strong>
                    <div class="message-content">{{ $ticket['message'] }}</div>
                </div>
            </div>
        </div>

        <div class="footer">
            Noirdrop B2B SaaS Support System<br>
            Reply to this email directly to answer the customer ticket.
        </div>
    </div>
</body>
</html>
