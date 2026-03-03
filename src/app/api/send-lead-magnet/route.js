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

    // Save to Airtable – field names match "CRM All leads" table.
    // Target Language: use array for Multiple select, or exact option string for Single select.
    const airtableData = {
      'Email Address': email,
      'First Name': name.split(' ')[0] || name,
      'Phone Number': whatsapp,
      'Target Language': ['IFLI Português | Recursos Gratuitos'],
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
