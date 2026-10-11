import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      projectType, 
      customProjectType, 
      budget, 
      customBudget, 
      currency, 
      message, 
      honeypot 
    } = req.body || {};

    // Spam honeypot trap
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Inquiry received' });
    }

    // Input validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please enter a project message (at least 10 characters).' });
    }

    const gmailUser = process.env.GMAIL_USER || 'mdrahmatullahquraishi@gmail.com';
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

    if (!gmailPass) {
      console.error('GMAIL_APP_PASSWORD is not configured in environment variables.');
      return res.status(500).json({ 
        success: false, 
        error: 'Mail service credentials are not configured on server.' 
      });
    }

    // Create Nodemailer Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedPhone = (phone && phone.trim()) ? phone.trim() : 'Not provided';
    const cleanDigits = sanitizedPhone.replace(/[^0-9]/g, '');
    
    // Resolve custom project type if specified
    const sanitizedProjectType = (projectType === 'Other Custom Project' && customProjectType && customProjectType.trim())
      ? `Other: ${customProjectType.trim()}`
      : (projectType || 'General Inquiry');

    // Resolve custom budget if specified
    const selectedCurrency = currency || 'INR';
    let sanitizedBudget = budget || 'Flexible';
    if ((budget === 'Custom Amount' || budget === 'Custom Budget') && customBudget && customBudget.trim()) {
      sanitizedBudget = `Custom (${selectedCurrency}): ${customBudget.trim()}`;
    } else if (budget) {
      sanitizedBudget = `${budget} [${selectedCurrency}]`;
    }

    const sanitizedMessage = message.trim();
    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // 1. Send detailed inquiry alert email to Md Rahmatullah Quraishi
    await transporter.sendMail({
      from: `"Portfolio Lead Bot" <${gmailUser}>`,
      to: gmailUser,
      replyTo: `${sanitizedName} <${sanitizedEmail}>`,
      subject: `⚡ New Project Inquiry: ${sanitizedName} [${sanitizedProjectType}]`,
      text: `
New Project Inquiry Received via Portfolio Website

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Phone / WhatsApp: ${sanitizedPhone}
Project Type: ${sanitizedProjectType}
Budget Range: ${sanitizedBudget}
Submitted: ${submissionTime} IST

Message / Project Details:
${sanitizedMessage}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(15,23,42,0.08); }
            .header { background: linear-gradient(135deg, #060B14 0%, #0B132B 50%, #0284C7 100%); padding: 32px 28px; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #7dd3fc; }
            .body { padding: 28px; }
            .card-field { margin-bottom: 16px; padding: 14px 16px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; }
            .field-label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.05em; margin-bottom: 4px; }
            .field-value { font-size: 14px; font-weight: 600; color: #0f172a; word-break: break-word; }
            .message-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-top: 20px; }
            .message-box .field-label { color: #15803d; }
            .message-content { font-size: 14px; line-height: 1.6; color: #14532d; white-space: pre-wrap; font-family: inherit; margin-top: 8px; }
            .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; }
            .btn-reply { display: inline-block; background: #0284c7; color: #ffffff !important; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚡ New Client Project Inquiry</h1>
              <p>Received from Md Rahmatullah Quraishi Portfolio Website</p>
            </div>
            <div class="body">
              <div class="card-field">
                <div class="field-label">Client Name</div>
                <div class="field-value">${sanitizedName}</div>
              </div>
              <div class="card-field">
                <div class="field-label">Client Email Address</div>
                <div class="field-value"><a href="mailto:${sanitizedEmail}" style="color: #0284c7; text-decoration: none;">${sanitizedEmail}</a></div>
              </div>
              <div class="card-field">
                <div class="field-label">Client Phone / WhatsApp Number</div>
                <div class="field-value">
                  ${sanitizedPhone !== 'Not provided' 
                    ? `<a href="tel:${sanitizedPhone}" style="color: #059669; text-decoration: none; font-weight: 700;">${sanitizedPhone}</a>` 
                    : '<span style="color: #94a3b8; font-weight: normal;">Not provided</span>'}
                </div>
              </div>
              <div class="card-field">
                <div class="field-label">Requested Project Type</div>
                <div class="field-value">${sanitizedProjectType}</div>
              </div>
              <div class="card-field">
                <div class="field-label">Target Budget</div>
                <div class="field-value" style="color: #059669; font-weight: 700;">${sanitizedBudget}</div>
              </div>
              <div class="card-field">
                <div class="field-label">Submission Timestamp</div>
                <div class="field-value" style="color: #64748b; font-size: 12px;">${submissionTime}</div>
              </div>

              <div class="message-box">
                <div class="field-label">Client's Project Scope & Message</div>
                <div class="message-content">${sanitizedMessage}</div>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${sanitizedEmail}?subject=Re: Project Inquiry — Md Rahmatullah Quraishi" class="btn-reply">
                  Email ${sanitizedName} →
                </a>
                ${cleanDigits.length >= 10 ? `
                  <a href="https://wa.me/${cleanDigits}" class="btn-reply" style="background: #16a34a !important; margin-left: 8px;">
                    WhatsApp Chat →
                  </a>
                ` : ''}
              </div>
            </div>
            <div class="footer">
              This message was securely dispatched from your portfolio lead generation form.
            </div>
          </div>
        </body>
        </html>
      `
    });

    // 2. Send professional instant confirmation acknowledgment to the client
    try {
      await transporter.sendMail({
        from: `"Md Rahmatullah Quraishi" <${gmailUser}>`,
        to: sanitizedEmail,
        subject: `Thank you for your project inquiry — Md Rahmatullah Quraishi`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
              .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
              .header { background: #0B132B; padding: 28px; color: #ffffff; text-align: center; }
              .header h2 { margin: 0; font-size: 18px; font-weight: 800; color: #ffffff; }
              .body { padding: 28px; font-size: 14px; line-height: 1.6; color: #334155; }
              .details { background: #f1f5f9; padding: 16px; border-radius: 12px; margin: 20px 0; font-size: 13px; }
              .footer { padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Md Rahmatullah Quraishi</h2>
                <div style="color: #38bdf8; font-size: 12px; margin-top: 4px;">Full Stack Developer</div>
              </div>
              <div class="body">
                <p>Hi <strong>${sanitizedName}</strong>,</p>
                <p>Thank you for reaching out and sharing your project details. I have received your inquiry regarding <strong>${sanitizedProjectType}</strong>.</p>
                
                <div class="details">
                  <div><strong>Project Type:</strong> ${sanitizedProjectType}</div>
                  <div><strong>Budget:</strong> ${sanitizedBudget}</div>
                  <div style="margin-top: 8px;"><strong>Your Message:</strong></div>
                  <div style="color: #475569; margin-top: 4px; font-style: italic;">"${sanitizedMessage}"</div>
                </div>

                <p>I will review your requirements and get back to you within 24 hours with initial thoughts and next steps.</p>
                <p>If you have any urgent details, you can also reach me directly on WhatsApp at <strong>+91 8969361100</strong>.</p>

                <p style="margin-top: 24px;">Warm regards,<br><strong>Md Rahmatullah Quraishi</strong><br><span style="font-size: 12px; color: #64748b;">Full Stack Developer</span></p>
              </div>
              <div class="footer">
                © ${new Date().getFullYear()} Md Rahmatullah Quraishi. All rights reserved.
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (clientAckError) {
      console.warn('Client confirmation acknowledgment email warning (non-fatal):', clientAckError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry successfully delivered! I will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Mail delivery failure:', error);
    return res.status(500).json({
      success: false,
      error: 'Unable to deliver inquiry right now. Please email directly at mdrahmatullahquraishi@gmail.com or WhatsApp +91 8969361100.'
    });
  }
}

