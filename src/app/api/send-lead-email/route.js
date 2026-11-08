import { NextResponse } from 'next/server';
import { createLead } from '@/lib/airtable';

export async function POST(request) {
  try {
    const { email, name, whatsapp } = await request.json();
    
    // Validate required fields
    if (!email || !name || !whatsapp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const senderEmail = process.env.NEXT_PUBLIC_BREVO_SENDER_EMAIL;
    const senderName = process.env.NEXT_PUBLIC_BREVO_SENDER_NAME;

    // 1. Save to Airtable first
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(' ') || '';

    const airtableData = {
      'Name': name,
      'First Name': firstName,
      ...(lastName && { 'Last Name': lastName }),
      'Email': email,
      'WhatsApp': whatsapp,
      'Source': 'Lead Magnet - Free Resources',
      'Status': 'New Lead',
      'Created At': new Date().toISOString(),
    };

    let airtableRecord = null;
    try {
      airtableRecord = await createLead(airtableData);
      console.log('✅ Lead saved to Airtable:', airtableRecord.id);
    } catch (airtableError) {
      console.error('❌ Airtable error:', airtableError);
      // Continue even if Airtable fails - still send email
    }

    // 2. Send email via Brevo (if configured)
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
                name: name,
              },
            ],
            subject: 'Your IFLI English sample classroom is ready',
            htmlContent: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>IFLI English sample resources</title>
                </head>
                <body style="font-family: Montserrat, Arial, sans-serif; line-height: 1.6; color: #001845; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: #012169; border-bottom: 6px solid #CE1124; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Your English sample classroom is ready</h1>
                  </div>
                  
                  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #E3E5E8; border-top: none; border-radius: 0 0 12px 12px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hello ${name},</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">
                      Thank you for your interest in IFLI English Immersion. Explore the sample classroom to see how lessons, recordings and resources work together.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://classroom.google.com/c/ODQ3MDQyNzg1MzMw?cjc=3jlexck4" style="display: inline-block; background: #CE1124; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                        Access Your Sample Resources
                      </a>
                    </div>
                    
                    <div style="background: #F5F6F7; padding: 20px; border-radius: 8px; margin: 30px 0;">
                      <h2 style="color: #CE1124; margin-top: 0; font-size: 20px;">What you will receive:</h2>
                      <ul style="padding-left: 20px; margin: 15px 0;">
                        <li style="margin-bottom: 10px;">Sample IFLI account view</li>
                        <li style="margin-bottom: 10px;">1-hour recording of a sample session</li>
                        <li style="margin-bottom: 10px;">A taste of our digital library</li>
                        <li style="margin-bottom: 10px;">Insights into our teaching methodology</li>
                      </ul>
                    </div>
                    
                    <div style="background: #FFF4F5; border-left: 4px solid #CE1124; padding: 15px; margin: 30px 0;">
                      <p style="margin: 0; font-size: 14px;">
                        <strong>Ready for more?</strong> The next 10-week cohort runs from 18 January to 26 March 2027, with one live class every weekday.
                      </p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://iflimmersion.com/ifli-english-language-immersion#pricing" style="display: inline-block; background: transparent; color: #CE1124; padding: 12px 30px; text-decoration: none; border: 2px solid #CE1124; border-radius: 50px; font-weight: bold; font-size: 14px;">
                        Learn More About Immersion
                      </a>
                    </div>
                    
                    <p style="font-size: 16px; margin-top: 30px; margin-bottom: 10px;">
                      Happy learning!<br>
                      <strong>The IFLI Team</strong>
                    </p>
                  </div>
                  
                  <div style="text-align: center; padding: 20px; color: #2D4B8E; font-size: 12px;">
                    <p>© 2027 IFLI - Foreign Language Immersion</p>
                    <p>Lisbon, Portugal</p>
                    <p style="margin-top: 10px;">
                      Questions? Contact us at ${whatsapp} (WhatsApp)
                    </p>
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
          console.log('✅ Sample resources email sent to:', email);
        }

        // Also add to Brevo contacts list
        await addToBrevoContacts(email, name, whatsapp);

      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }
    }

    // 3. Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Lead captured successfully',
      airtableId: airtableRecord?.id,
    });

  } catch (error) {
    console.error('❌ Lead magnet API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function addToBrevoContacts(email, name, whatsapp) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  try {
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name.split(' ')[0] || name,
          LASTNAME: name.split(' ').slice(1).join(' ') || '',
          SMS: whatsapp,
          SOURCE: 'Lead Magnet - Free Resources',
          SIGNUP_DATE: new Date().toISOString(),
        },
        listIds: [2], // Lead Magnet list - update this ID
        updateEnabled: true,
      }),
    });
    console.log('✅ Contact added to Brevo:', email);
  } catch (error) {
    console.error('❌ Error adding contact to Brevo:', error);
    // Don't throw - we still want the main request to succeed
  }
}
