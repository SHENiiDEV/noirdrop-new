<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $payment->gateway_reference }}</title>
    <style>
        @page {
            margin: 40px 45px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1f2937;
            font-size: 12px;
            line-height: 1.5;
            background-color: #ffffff;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .header-table td {
            vertical-align: top;
        }
        .logo-title {
            font-size: 24px;
            font-weight: 900;
            color: #111827;
            letter-spacing: -0.5px;
        }
        .logo-accent {
            color: #9333ea;
        }
        .company-subtitle {
            font-size: 11px;
            color: #6b7280;
            margin-top: 2px;
        }
        .invoice-badge {
            text-align: right;
        }
        .invoice-title {
            font-size: 20px;
            font-weight: 800;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .paid-stamp {
            display: inline-block;
            background-color: #dcfce7;
            color: #15803d;
            border: 1px solid #86efac;
            font-size: 10px;
            font-weight: 800;
            padding: 3px 10px;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 5px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .details-table td {
            width: 50%;
            vertical-align: top;
        }
        .section-title {
            font-size: 10px;
            font-weight: 800;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 6px;
        }
        .address-box {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 8px;
            padding: 12px;
            font-size: 11px;
            color: #374151;
        }
        .address-box strong {
            color: #111827;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .items-table th {
            background-color: #f3f4f6;
            color: #374151;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 12px;
            text-align: left;
            border-bottom: 2px solid #e5e7eb;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #f3f4f6;
            font-size: 11px;
            color: #1f2937;
        }
        .text-right {
            text-align: right;
        }
        .summary-table {
            width: 40%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .summary-table td {
            padding: 6px 12px;
            font-size: 11px;
        }
        .summary-table .total-row td {
            border-top: 2px solid #e5e7eb;
            font-size: 14px;
            font-weight: 800;
            color: #111827;
            padding-top: 10px;
        }
        .legal-notice {
            margin-top: 40px;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
            font-size: 10px;
            color: #9ca3af;
            text-align: center;
            line-height: 1.4;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <table class="header-table">
        <tr>
            <td>
                <div class="logo-title">Noir<span class="logo-accent">drop</span></div>
                <div class="company-subtitle">1-Click B2B Product Generation Engine</div>
            </td>
            <td class="invoice-badge">
                <div class="invoice-title">OFFICIAL RECEIPT</div>
                <div class="paid-stamp">PAID & VERIFIED</div>
            </td>
        </tr>
    </table>

    <!-- Details Section -->
    <table class="details-table">
        <tr>
            <td style="padding-right: 15px;">
                <div class="section-title">Merchant of Record (Issuer)</div>
                <div class="address-box">
                    <strong>INCHWARD LIMITED</strong><br>
                    Company Number: 16021412<br>
                    Academy House, 11 Dunraven Place<br>
                    Bridgend, Mid Glamorgan, CF31 1JF<br>
                    United Kingdom<br>
                    Email: info@voltoria.co.uk
                </div>
            </td>
            <td style="padding-left: 15px;">
                <div class="section-title">Billed To (Customer)</div>
                <div class="address-box">
                    <strong>{{ $user->name }} {{ $user->surname }}</strong><br>
                    Email: {{ $user->email }}<br>
                    @if($user->street_address)
                        Address: {{ $user->street_address }}, {{ $user->city }} {{ $user->postal_code }}<br>
                        Country: {{ $user->country }}<br>
                    @endif
                    Invoice Reference: <strong>{{ $payment->gateway_reference }}</strong><br>
                    Issue Date: {{ $payment->created_at->format('d M Y, H:i') }} UTC
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th>Service Description</th>
                <th class="text-right" style="width: 60px;">Qty</th>
                <th class="text-right" style="width: 100px;">Unit Price</th>
                <th class="text-right" style="width: 100px;">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $payment->service_name }}</strong><br>
                    <span style="font-size: 10px; color: #6b7280;">
                        @if($payment->type === 'topup')
                            Digital credit top-up for B2B product copy generations (+{{ $payment->tokens_added }} Drops).
                        @else
                            B2B 1-Click Product Copy Generation (SEO Title, HTML Storytelling, Bullets & Social Copy).
                        @endif
                    </span>
                </td>
                <td class="text-right">1</td>
                <td class="text-right">€{{ number_format($payment->amount, 2) }}</td>
                <td class="text-right">€{{ number_format($payment->amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Financial Summary -->
    <table class="summary-table">
        <tr>
            <td style="color: #6b7280;">Subtotal:</td>
            <td class="text-right">€{{ number_format($payment->amount, 2) }}</td>
        </tr>
        <tr>
            <td style="color: #6b7280;">VAT / Tax (0% B2B Reverse Charge):</td>
            <td class="text-right">€0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Paid:</td>
            <td class="text-right" style="color: #9333ea;">€{{ number_format($payment->amount, 2) }} {{ $payment->currency }}</td>
        </tr>
    </table>

    <!-- Legal Notice Footer -->
    <div class="legal-notice">
        INCHWARD LIMITED is registered in England and Wales under Company Number 16021412.<br>
        Registered address: Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom.<br>
        14-day unused credit refund guarantee applies in accordance with UK commercial terms. Generated under UK jurisdiction.
    </div>

</body>
</html>
