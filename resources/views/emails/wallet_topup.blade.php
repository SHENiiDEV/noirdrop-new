<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Wallet Top-Up Receipt</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 32px; text-align: left; }
        .logo { font-size: 22px; font-weight: 900; color: #ffffff; margin-bottom: 24px; text-align: center; }
        .accent { color: #c084fc; }
        .amount-badge { font-size: 32px; font-weight: 900; color: #4ade80; text-align: center; margin: 16px 0; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #09090b; border-radius: 12px; overflow: hidden; border: 1px solid #27272a; }
        .details-table td { padding: 12px 16px; font-size: 13px; color: #e4e4e7; border-bottom: 1px solid #27272a; }
        .details-table td:last-child { text-align: right; font-weight: 700; }
        .cta-btn { display: inline-block; background-color: #9333ea; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 12px; margin-top: 20px; text-align: center; }
        .footer { font-size: 11px; color: #71717a; margin-top: 32px; text-align: center; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <div class="logo">Noir<span class="accent">drop</span></div>
            
            <h2 style="font-size: 18px; text-align: center; color: #ffffff; margin: 0;">Wallet Top-Up Confirmed</h2>
            
            <div class="amount-badge">+€{{ number_format($payment->amount, 2) }}</div>

            <p style="text-align: center; font-size: 13px; color: #a1a1aa;">
                Your credit top-up has been processed successfully. Attached to this email is your official B2B PDF Tax Invoice.
            </p>

            <table class="details-table">
                <tr>
                    <td>Invoice Reference:</td>
                    <td>{{ $payment->gateway_reference }}</td>
                </tr>
                <tr>
                    <td>Service Package:</td>
                    <td>{{ $payment->service_name }}</td>
                </tr>
                <tr>
                    <td>Tokens Added:</td>
                    <td>+{{ $payment->tokens_added }} Drops</td>
                </tr>
                <tr>
                    <td>New Token Balance:</td>
                    <td style="color: #c084fc;">{{ $payment->tokens_balance_after }} Drops</td>
                </tr>
                <tr>
                    <td>Date & Time:</td>
                    <td>{{ $payment->created_at->format('d M Y, H:i') }} UTC</td>
                </tr>
            </table>

            <div style="text-align: center;">
                <a href="{{ url('/dashboard') }}" class="cta-btn">Go to Dashboard</a>
            </div>
        </div>

        <div class="footer">
            INCHWARD LIMITED — Company Number 16021412<br>
            Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom<br>
            Email: info@voltoria.co.uk | support@noirdrop.co.uk
        </div>
    </div>
</body>
</html>
