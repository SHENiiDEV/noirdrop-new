<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Welcome to Noirdrop</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 0; }
        .wrapper { max-w: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 32px; text-align: left; }
        .logo { font-size: 22px; font-weight: 900; color: #ffffff; margin-bottom: 24px; text-align: center; }
        .accent { color: #c084fc; }
        h1 { font-size: 20px; font-weight: 800; color: #ffffff; margin-top: 0; }
        p { font-size: 14px; color: #a1a1aa; line-height: 1.6; }
        .feature-box { background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin: 20px 0; }
        .feature-item { font-size: 13px; color: #e4e4e7; margin-bottom: 8px; }
        .cta-btn { display: inline-block; background-color: #9333ea; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 12px; margin-top: 20px; text-align: center; }
        .footer { font-size: 11px; color: #71717a; margin-top: 32px; text-align: center; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <div class="logo">Noir<span class="accent">drop</span></div>
            
            <h1>Welcome, {{ $user->name }}! 👋</h1>
            
            <p>Thank you for joining <strong>Noirdrop</strong> — the 1-Click Product Generator B2B SaaS engineered for high-converting e-commerce merchants.</p>

            <div class="feature-box">
                <div class="feature-item">⚡ <strong>SEO Title Optimization:</strong> Captivating headline keywords.</div>
                <div class="feature-item">📖 <strong>Storytelling HTML:</strong> Ready-to-paste narrative description.</div>
                <div class="feature-item">📌 <strong>4 Feature Highlights:</strong> High-impact bullet points.</div>
                <div class="feature-item">📲 <strong>Viral Social Media Copy:</strong> Instagram & TikTok captions with emojis.</div>
            </div>

            <p>Your B2B account is active and ready. Launch your dashboard to create your first product drop:</p>

            <div style="text-align: center;">
                <a href="{{ url('/dashboard') }}" class="cta-btn">Create Your First Product Drop</a>
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
