'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';
import { CHAT_API, sendMessage } from '@/lib/chat/api';

type Role = 'user' | 'assistant';

type ChatTurn = {
  id: string;
  role: Role;
  text: string;
};

type UiState =
  | { mode: 'idle' }
  | { mode: 'loading' }
  | { mode: 'offline'; message: string }
  | { mode: 'error'; message: string };

const OFFLINE_MESSAGE = "Assistant unavailable. Leave your number and we’ll call you back.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isOfflineResponse(value: unknown): value is { offline: true; message: string } {
  return (
    isRecord(value) &&
    'offline' in value &&
    (value as { offline?: unknown }).offline === true &&
    typeof (value as { message?: unknown }).message === 'string'
  );
}

export default function Dock() {
  const [uiState, setUiState] = useState<UiState>(() =>
    CHAT_API
      ? { mode: 'idle' }
      : { mode: 'offline', message: OFFLINE_MESSAGE }
  );
  const [threadId, setThreadId] = useState<string | undefined>();
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');

  const statusMessage = useMemo(() => {
    if (uiState.mode === 'offline' || uiState.mode === 'error') {
      return uiState.message;
    }

    return null;
  }, [uiState]);

  const handleSubmit = useCallback(async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const text = input.trim();
    if (!text) return;

    const userTurn: ChatTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    setTurns(prev => [...prev, userTurn]);
    setInput('');
    setUiState({ mode: 'loading' });

    try {
      const result = await sendMessage({ threadId, text });

      if (process.env.NODE_ENV !== 'production') {
        const diagnostics = {
          offline: isOfflineResponse(result),
          threadId:
            isRecord(result) && 'threadId' in result && typeof result.threadId === 'string'
              ? result.threadId
              : undefined,
          messageLength: isRecord(result) && typeof result.message === 'string' ? result.message.length : undefined,
        };
        console.log('[chat-dock] sendMessage result', diagnostics);
      }

      if (isOfflineResponse(result)) {
        setUiState({ mode: 'offline', message: result.message });
        return;
      }

      if (isRecord(result)) {
        if ('threadId' in result && typeof result.threadId === 'string') {
          setThreadId(result.threadId);
        }

        if (typeof result.message === 'string') {
          const assistantTurn: ChatTurn = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            text: result.message,
          };
          setTurns(prev => [...prev, assistantTurn]);
        }
      }

      setUiState({ mode: 'idle' });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        const message = error instanceof Error ? error.message : 'unknown';
        console.log('[chat-dock] sendMessage error', { message });
      }

      setUiState({
        mode: 'error',
        message: 'Something went wrong sending your message. Please try again in a moment.',
      });
    }
  }, [input, threadId]);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-3xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur">
      <div className="border-b border-slate-200/70 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Concierge</p>
            <p className="text-sm font-semibold text-slate-900">AI Dental Assistant</p>
          </div>
          <span
            className={`inline-flex h-2.5 w-2.5 rounded-full ${
              uiState.mode === 'loading'
                ? 'bg-amber-400'
                : uiState.mode === 'offline'
                  ? 'bg-slate-300'
                  : uiState.mode === 'error'
                    ? 'bg-rose-400'
                    : 'bg-emerald-400'
            }`}
          />
        </div>
        {statusMessage && (
          <p className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
            {statusMessage}
          </p>
        )}
      </div>

      <div className="max-h-64 space-y-3 overflow-y-auto px-5 py-4 text-sm text-slate-700">
        {turns.length === 0 ? (
          <p className="text-xs text-slate-400">
            Ask us about treatments, availability, or anything that will help you feel at ease.
          </p>
        ) : (
          turns.map(turn => (
            <div
              key={turn.id}
              className={`flex ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-3 py-2 ${
                  turn.role === 'user'
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {turn.text}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-200/70 px-5 py-4">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-inner focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            disabled={uiState.mode === 'loading'}
          />
          <button
            type="submit"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={uiState.mode === 'loading' || input.trim().length === 0}
          >
            {uiState.mode === 'loading' ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
