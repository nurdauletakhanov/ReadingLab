import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { readSrt, srtToVtt } from '../../../lib/srt';

export async function getStaticPaths() {
  return (await getCollection('videos')).map((v) => ({ params: { slug: v.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const video = await getEntry('videos', params.slug!);
  if (!video) return new Response('not found', { status: 404 });
  const vtt = srtToVtt(await readSrt(video.data.srt));
  return new Response(vtt, { headers: { 'Content-Type': 'text/vtt; charset=utf-8' } });
};
