/**
 * Email service using Resend API via server-side endpoint
 * Frontend calls /api/request-session which handles email delivery
 */

interface BookingData {
  name: string;
  email: string;
  subject?: string;
  date?: string;
  time?: string;
  message?: string;
  educationLevel?: string;
  course?: string;
}

export const sendBookingEmail = async (
  type: 'academy' | 'consulting',
  data: BookingData
): Promise<boolean> => {
  try {
    // Call server-side endpoint that uses Resend
    const response = await fetch('/api/request-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        date: data.date || new Date().toISOString().split('T')[0],
        time: data.time || new Date().toLocaleTimeString(),
        notes: data.message || data.subject || '',
        type: type,
        educationLevel: data.educationLevel || '',
        course: data.course || '',
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Email send failed:', result.error);
      return false;
    }

    console.log('Email sent successfully via Resend');
    return true;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
};
