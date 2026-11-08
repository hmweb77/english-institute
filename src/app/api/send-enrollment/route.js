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
            subject: 'Your IFLI English Immersion request',
            htmlContent: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Enrollment Confirmation</title>
                </head>
                <body style="font-family: Montserrat, Arial, sans-serif; line-height: 1.6; color: #001845; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: #012169; border-bottom: 6px solid #CE1124; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
                  </div>
                  
                  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #E3E5E8; border-top: none; border-radius: 0 0 12px 12px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Dear ${fullName},</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">
                      We have received your enrolment request for the <strong>${plan}</strong> plan of IFLI English Immersion.
                    </p>
                    
                    <div style="background: #F5F6F7; padding: 20px; border-radius: 8px; margin: 30px 0;">
                      <h2 style="color: #CE1124; margin-top: 0; font-size: 20px;">What happens next?</h2>
                      <ul style="padding-left: 20px; margin: 15px 0;">
                        <li style="margin-bottom: 10px;">Our team will review your enrollment within 24 hours</li>
                        <li style="margin-bottom: 10px;">You'll receive payment instructions via email</li>
                        <li style="margin-bottom: 10px;">Once payment is confirmed, you'll get access to the student portal</li>
                        <li style="margin-bottom: 10px;">The programme runs from <strong>18 January to 26 March 2027</strong></li>
                      </ul>
                    </div>
                    
                    <div style="background: #FFF4F5; border-left: 4px solid #CE1124; padding: 15px; margin: 30px 0;">
                      <p style="margin: 0; font-size: 14px;">
                        <strong>Course format:</strong> 10 weeks, Monday to Friday, 50 live hours, with 4–10 participants per group.
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
                    <p>© 2027 IFLI - Foreign Language Immersion</p>
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
