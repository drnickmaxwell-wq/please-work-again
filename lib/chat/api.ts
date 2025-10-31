export const CHAT_API = process.env.NEXT_PUBLIC_CHAT_API || '';

interface ChatRequestPayload {
  threadId?: string;
  text: string;
}

type OfflineResponse = {
  offline: true;
  message: string;
};

type ChatResponse = OfflineResponse | Record<string, unknown>;

export async function sendMessage(payload: ChatRequestPayload): Promise<ChatResponse> {
  if (!CHAT_API) {
    return {
      offline: true,
      message: "Assistant unavailable. Leave your number and we’ll call you back.",
    };
  }

  const res = await fetch(`${CHAT_API}/chat`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Chat API ${res.status}`);
  }

  return res.json() as Promise<Record<string, unknown>>;
}
