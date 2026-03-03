import { NextResponse } from 'next/server';
import { createEnrollment } from '@/lib/airtable';

export async function POST(request) {
  try {
    const { email, firstName, lastName, whatsapp, plan, comments, termsAccepted } = await request.json();
    
    // Validate required fields
    if (!email || !firstName || !lastName || !whatsapp || !plan || !termsAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    // 1. Save to Airtable
    const airtableData = {
      'First Name': firstName,
      'Last Name': lastName,
      'Email': email,
      'Phone': whatsapp,
      'Choose your plan': plan,
      'Comments': comments || '',
    };

    let airtableRecord = null;
    try {
      airtableRecord = await createEnrollment(airtableData);
      console.log('✅ Enrollment saved to Airtable:', airtableRecord.id);
    } catch (airtableError) {
      console.error('❌ Airtable error:', airtableError);
      // Don't fail the request if Airtable fails - still send email
    }

    // 2. Send confirmation email via Brevo
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const senderEmail = process.env.NEXT_PUBLIC_BREVO_SENDER_EMAIL;
    const senderName = process.env.NEXT_PUBLIC_BREVO_SENDER_NAME;

    if (BREVO_API_KEY) {
      try {
        const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: senderName,
              email: senderEmail,
            },
            to: [
              {
                email: email,
                name: fullName,
              },
            ],
            subject: 'Pre-Enrollment Received - IFLI Immersion 2026',
            htmlContent: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Enrollment Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #012169; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #C8102E 0%, #9B0E24 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
                  </div>
                  
                  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #E3E5E8; border-top: none; border-radius: 0 0 12px 12px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Dear ${fullName},</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">
                      We've received your enrollment request for the <strong>${plan}</strong> plan of our Immersion Program 2026!
                    </p>
                    
                    <div style="background: #F5F6F7; padding: 20px; border-radius: 8px; margin: 30px 0;">
                      <h2 style="color: #C8102E; margin-top: 0; font-size: 20px;">What Happens Next?</h2>
                      <ul style="padding-left: 20px; margin: 15px 0;">
                        <li style="margin-bottom: 10px;">Our team will review your enrollment within 24 hours</li>
                        <li style="margin-bottom: 10px;">You'll receive payment instructions via email</li>
                        <li style="margin-bottom: 10px;">Once payment is confirmed, you'll get access to the student portal</li>
                        <li style="margin-bottom: 10px;">Program starts on <strong>January 19, 2026</strong></li>
                      </ul>
                    </div>
                    
                    <div style="background: #FFF0F2; border-left: 4px solid #C8102E; padding: 15px; margin: 30px 0;">
                      <p style="margin: 0; font-size: 14px;">
                        <strong>⏰ Important:</strong> Enrollment closes on <strong>January 18, 2026</strong>. Secure your spot now!
                      </p>
                    </div>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">
                      If you have any questions in the meantime, feel free to reply to this email or contact us via WhatsApp at ${whatsapp}.
                    </p>
                    
                    <p style="font-size: 16px; margin-bottom: 10px;">
                      Best regards,<br>
                      <strong>The IFLI Team</strong>
                    </p>
                  </div>
                  
                  <div style="text-align: center; padding: 20px; color: #2D4B8E; font-size: 12px;">
                    <p>© 2026 IFLI - Instituto de Formação em Língua Portuguesa</p>
                    <p>Lisbon, Portugal</p>
                  </div>
                </body>
              </html>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const error = await emailResponse.json();
          console.error('❌ Email sending failed:', error);
        } else {
          console.log('✅ Confirmation email sent to:', email);
        }
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }
    }

    // 3. Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Enrollment received successfully',
      airtableId: airtableRecord?.id
    });

  } catch (error) {
    console.error('❌ Enrollment API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process enrollment' },
      { status: 500 }
    );
  }
}