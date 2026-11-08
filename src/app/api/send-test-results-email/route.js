import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, score, totalQuestions, recommendation } = await request.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const senderEmail = process.env.NEXT_PUBLIC_BREVO_SENDER_EMAIL;
    const senderName = process.env.NEXT_PUBLIC_BREVO_SENDER_NAME;

    if (!BREVO_API_KEY) {
      throw new Error('Brevo API key is not configured');
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
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
          },
        ],
        subject: `Your English level test results - ${percentage}%`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Test Results</title>
            </head>
            <body style="font-family: Montserrat, Arial, sans-serif; line-height: 1.6; color: #001845; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #012169; border-bottom: 6px solid #CE1124; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Your English test results</h1>
              </div>
              
              <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #E3E5E8; border-top: none; border-radius: 0 0 12px 12px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Great job completing the test!</p>
                
                <div style="text-align: center; padding: 30px; background: #F5F6F7; border-radius: 12px; margin: 30px 0;">
                  <div style="font-size: 48px; font-weight: bold; color: #CE1124; margin-bottom: 10px;">
                    ${score}/${totalQuestions}
                  </div>
                  <div style="font-size: 24px; color: #2D4B8E; margin-bottom: 10px;">
                    ${percentage}% Correct
                  </div>
                  <div style="width: 100%; max-width: 300px; height: 8px; background: #E3E5E8; border-radius: 4px; margin: 20px auto; overflow: hidden;">
                    <div style="width: ${percentage}%; height: 100%; background: #CE1124;"></div>
                  </div>
                </div>
                
                <div style="background: #012169; padding: 25px; border-radius: 12px; margin: 30px 0; color: white;">
                  <h2 style="margin-top: 0; font-size: 20px;">📚 Recommended Plan: ${recommendation}</h2>
                  <p style="margin-bottom: 0; font-size: 14px; opacity: 0.95;">
                    Based on your results, this plan will help you work towards your English goals effectively.
                  </p>
                </div>
                
                <div style="background: #EEF1F9; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <h2 style="color: #CE1124; margin-top: 0; font-size: 18px;">Bonus: English sample classroom</h2>
                  <p style="margin-bottom: 15px; font-size: 14px;">
                    Explore a sample class recording and a taste of the IFLI digital library.
                  </p>
                  <a href="https://classroom.google.com/c/ODQ3MDQyNzg1MzMw?cjc=3jlexck4" style="display: inline-block; background: #CE1124; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
                    Open the sample classroom
                  </a>
                </div>
                
                <div style="background: #FFF4F5; border-left: 4px solid #CE1124; padding: 15px; margin: 30px 0;">
                  <p style="margin: 0; font-size: 14px;">
                    <strong>Next cohort:</strong> 18 January to 26 March 2027. Ten weeks, Monday to Friday, with 50 live class hours.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://iflimmersion.com/ifli-english-language-immersion#pricing" style="display: inline-block; background: #CE1124; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                    View English Immersion plans
                  </a>
                </div>
                
                <p style="font-size: 16px; margin-top: 30px; margin-bottom: 10px;">
                  Ready to take your English to the next level?<br>
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    // Also add to Brevo contacts list
    await addToBrevoContacts(email, score, percentage);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending test results email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

async function addToBrevoContacts(email, score, percentage) {
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
        listIds: [3], // Change this to your Brevo list ID for test takers
        updateEnabled: true,
        attributes: {
          SOURCE: 'English Test',
          TEST_SCORE: score,
          TEST_PERCENTAGE: percentage,
          TEST_DATE: new Date().toISOString(),
        },
      }),
    });
  } catch (error) {
    console.error('Error adding contact to Brevo:', error);
  }
}
