export const TOKENS = {
  white: 'var(--smh-white, #FFFFFF)',
  ink: 'var(--smh-ink, var(--smh-primary-ink))',
  graySubtle: 'var(--smh-gray-200, #e5e7eb)',
  champagne: 'var(--smh-champagne, #f5f5dc)',
  silver: 'var(--smh-silver, #c0c0c0)',
  navy: 'var(--smh-navy-800, #1e293b)',
  urgent: 'var(--smh-urgent, #dc2626)'
} as const;

export type NeutralToken = keyof typeof TOKENS;
