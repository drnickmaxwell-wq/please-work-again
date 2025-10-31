'use client';
export default function VideoObjectJsonLd({ name, description, thumbnailUrl, uploadDate, contentUrl }:
  { name:string; description:string; thumbnailUrl:string; uploadDate:string; contentUrl:string; }){
  const data = {
    "@context":"https://schema.org",
    "@type":"VideoObject",
    name, description, thumbnailUrl, uploadDate, contentUrl
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
