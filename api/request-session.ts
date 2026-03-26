import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, date, time, notes, type } = req.body;

    // Validate all fields
    if (!name || !email || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, date, time',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Determine recipient email based on type
    let recipientEmail = 'academy@louyos.com';
    let emailSubject = 'New Session Request';
    
    if (type === 'consulting') {
      recipientEmail = 'consulting@louyos.com';
      emailSubject = 'New Consulting Request';
    }

    // Create email body for admin
    const adminEmailBody = `
New ${type === 'consulting' ? 'Consulting' : 'Session'} Request

Name: ${name}
Email: ${email}
Date: ${date}
Time: ${time}
${notes ? `Notes: ${notes}` : ''}

---
This is an automated message from Louyos Academy & Consulting website.
    `.trim();

    // Create confirmation email body for student
    const studentEmailBody = `
Dear ${name},

Thank you for your ${type === 'consulting' ? 'consulting request' : 'session request'}!

We have received your request and will get back to you as soon as possible.

Request Details:
- Date: ${date}
- Time: ${time}
${notes ? `- Notes: ${notes}` : ''}

Best regards,
Louyos Academy & Consulting Team
    `.trim();

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'academy@louyos-academy-consulting.com',
      to: recipientEmail,
      subject: emailSubject,
      text: adminEmailBody,
      html: `<pre>${adminEmailBody}</pre>`,
    });

    if (adminEmailResponse.error) {
      console.error('Admin email error:', adminEmailResponse.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send admin email',
      });
    }

    // Send confirmation email to student
    const studentEmailResponse = await resend.emails.send({
      from: 'academy@louyos-academy-consulting.com',
      to: email,
      subject: `Your ${type === 'consulting' ? 'Consulting' : 'Session'} Request Confirmation`,
      text: studentEmailBody,
      html: `<pre>${studentEmailBody}</pre>`,
    });

    if (studentEmailResponse.error) {
      console.error('Student email error:', studentEmailResponse.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send confirmation email',
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Emails sent successfully',
    });
  } catch (error) {
    console.error('Request session error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
