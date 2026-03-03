const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

export const createEnrollment = async (enrollmentData) => {
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_ENROLLMENTS_TABLE;
  
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: enrollmentData,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create enrollment in Airtable');
  }

  return await response.json();
};

export const createLead = async (leadData) => {
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_LEADS_TABLE;
  
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: leadData,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create lead in Airtable');
  }

  return await response.json();
};

export const createTestResult = async (testData) => {
  const tableName = 'TestResults'; // You can add this to env variables too
  
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: testData,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create test result in Airtable');
  }

  return await response.json();
};