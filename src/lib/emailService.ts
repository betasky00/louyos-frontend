/**
 * Email service using Manus notification API
 * Sends booking notifications to academy@louyos.com or consulting@louyos.com
 */

interface EmailData {
  name: string;
  email: string;
  subject: string;
  date?: string;
  time?: string;
  message?: string;
}

export const sendBookingEmail = async (
  type: 'academy' | 'consulting',
  data: EmailData
): Promise<boolean> => {
  try {
    const recipientEmail = type === 'academy' ? 'academy@louyos.com' : 'consulting@louyos.com';
    
    const emailContent = type === 'academy'
      ? `New Academy Session Booking\n\nStudent Information:\n- Name: ${data.name}\n- Email: ${data.email}\n- Class: ${data.subject}\n- Preferred Date: ${data.date || 'Not specified'}\n- Preferred Time: ${data.time || 'Not specified'}\n- Message: ${data.message || 'No message'}\n\nTimestamp: ${new Date().toISOString()}`
      : `New Consulting Service Request\n\nClient Information:\n- Name: ${data.name}\n- Email: ${data.email}\n- Service: ${data.subject}\n- Message: ${data.message || 'No message'}\n\nTimestamp: ${new Date().toISOString()}`;

    // Use Manus notification API to send email
    const response = await fetch('https://api.manus.im/v1/notification/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`,
      },
      body: JSON.stringify({
        type: 'email',
        recipient: recipientEmail,
        subject: `${type === 'academy' ? 'New Session Booking' : 'New Consulting Request'}: ${data.subject}`,
        content: emailContent,
      }),
    });

    if (response.ok) {
      console.log('Email sent successfully');
      return true;
    } else {
      const error = await response.text();
      console.error('Email send failed:', response.status, error);
      return false;
    }
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
};
