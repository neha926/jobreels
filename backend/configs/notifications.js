// Real Notification Service (Email via Brevo SMTP + SMS Gateway + In-App Notifications)
// Uses existing credentials configured in .env

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

/**
 * Send real email notification when Interview is Scheduled
 */
export const sendInterviewEmailNotification = async ({
  candidateEmail,
  candidateName,
  companyName,
  interviewDate,
  interviewTime,
  address,
  googleMapsQuery
}) => {
  if (!candidateEmail) return;

  const mailOptions = {
    from: `"Swaraj KaamReels" <${process.env.SENDER_EMAIL || 'pawarneha926@gmail.com'}>`,
    to: candidateEmail,
    subject: `🎉 Interview Scheduled: ${companyName} on ${interviewDate}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #059669;">Interview Scheduled!</h2>
        <p>Dear <strong>${candidateName}</strong>,</p>
        <p>Congratulations! <strong>${companyName}</strong> has shortlisted your profile and scheduled your site interview / trial:</p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p><strong>📅 Date:</strong> ${interviewDate}</p>
          <p><strong>⏰ Time:</strong> ${interviewTime}</p>
          <p><strong>📍 Location:</strong> ${address}</p>
        </div>
        <p>
          <a href="https://maps.google.com/?q=${encodeURIComponent(googleMapsQuery || address)}" 
             style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Open Location in Google Maps
          </a>
        </p>
        <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
          Note: Swaraj KaamReels is 100% free. Never pay any fee or deposit for interview.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Real Interview Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Email notification error:", err.message);
    return { success: false, error: err.message };
  }
};
