export const asset = (p: string) => {
  const base = process.env.NEXT_PUBLIC_CDN || '';
  return `${base}`.replace(/\/$/,'') + p;
};
export const hasCDN = !!process.env.NEXT_PUBLIC_CDN;
