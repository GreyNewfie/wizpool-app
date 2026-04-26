import { getApiBaseUrl } from '../config/config';

const BASE_URL = getApiBaseUrl();

export async function initDraft(poolId, token) {
  const payload = {
    poolId,
  };

  try {
    console.log('Initializing draft. Pool ID:', poolId);

    const response = await fetch(`${BASE_URL}/draft/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error details:', errorData);
      throw new Error('Failed to initialize draft');
    }

    const { draftSession } = await response.json();

    console.log('Pool initialized:', draftSession);
    return draftSession;
  } catch (error) {
    console.error('Error initializing draft:', error);
    throw error;
  }
}

export async function startDraft(sessionId, token) {
  const payload = { sessionId };

  try {
    const response = await fetch(`${BASE_URL}/draft/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error details:', errorData);
      throw new Error('Failed to start draft');
    }

    const { draftSessio: updatedDraftSession } = await response.json();

    console.log('Draft started:', updatedDraftSession);
    return updatedDraftSession;
  } catch (error) {
    console.error('Error starting draft:', error);
    throw error;
  }
}
