const { google } = require('googleapis');

// Initialize Google Calendar API
const initializeCalendar = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
};

// Create a Google Meet event
exports.createMeetingEvent = async (bookingDetails) => {
  try {
    const calendar = initializeCalendar();

    const startDateTime = new Date(`${bookingDetails.date}T${bookingDetails.time}`);
    const endDateTime = new Date(startDateTime.getTime() + bookingDetails.duration * 60000);

    const event = {
      summary: `Mental Support Counseling Session - ${bookingDetails.topic}`,
      description: bookingDetails.description || 'Counseling session for mental health support',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'UTC',
      },
      attendees: [
        { email: bookingDetails.userEmail },
        { email: bookingDetails.counselorEmail }
      ],
      conferenceData: {
        createRequest: {
          requestId: `meeting-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 }
        ]
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });

    return {
      eventId: response.data.id,
      meetingLink: response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri
    };
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw new Error('Failed to create calendar event');
  }
};

// Update a calendar event
exports.updateMeetingEvent = async (eventId, updates) => {
  try {
    const calendar = initializeCalendar();

    const response = await calendar.events.patch({
      calendarId: 'primary',
      eventId: eventId,
      resource: updates,
      sendUpdates: 'all'
    });

    return response.data;
  } catch (error) {
    console.error('Error updating Google Calendar event:', error);
    throw new Error('Failed to update calendar event');
  }
};

// Delete a calendar event
exports.deleteMeetingEvent = async (eventId) => {
  try {
    const calendar = initializeCalendar();

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
      sendUpdates: 'all'
    });

    return true;
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error);
    throw new Error('Failed to delete calendar event');
  }
};
