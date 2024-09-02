import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import envConf from '@/envConf/envConf';

export async function POST(request) {
  try {
    const { email, message } = await request.json();

    // Create a transporter object using SMTP transport.
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: envConf.myEmail,
        pass: envConf.myPassword, 
      },
    });

    // Set up email data
    let mailOptions = {
      from: email,
      to: envConf.myEmail,
      subject: 'Next Door Rental Query',
      text: message,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}