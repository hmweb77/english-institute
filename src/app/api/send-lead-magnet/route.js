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

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(' ') || '';

    const airtableData = {
      'Email Address': email.trim(),
      'First Name': firstName,
      ...(lastName && { 'Last Name': lastName }),
      'Phone Number': whatsapp.trim(),
    };

    let airtableRecord = null;
    try {
      airtableRecord = await createLead(airtableData);
      console.log('✅ Lead saved to Airtable:', airtableRecord.id);
    } catch (airtableError) {
      console.error('❌ Airtable error:', airtableError);
      return NextResponse.json(
        { error: 'Failed to save lead to Airtable: ' + airtableError.message },
        { status: 500 }
      );
    }

    // Return success response
    // Your Airtable automation will automatically send the email
    return NextResponse.json({
      success: true,
      message: 'You will receive an email shortly with access.',
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
