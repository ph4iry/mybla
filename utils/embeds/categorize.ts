import { CustomEmbeds, Embed } from "@/types/Embeds";
export type EmbedCategories = 'gsites' | 'slides' | 'docs' | 'youtube' | 'drive';

export default function categorize(link: string | null): Embed | null {
  if (!link) {
    return null;
  };

  const filters = [isYouTubeLink, isGoogleDriveLink, isGoogleSitesLink, isGoogleSlidesLink, isGoogleDocsLink];
  const EmbedTypes = ['Youtube', 'Drive', 'GSite', 'Slideshow', 'Document'] as (keyof typeof CustomEmbeds)[];

  for (let i = 0; i < filters.length; i++) {
    if (filters[i](link)) {
      const embedType: keyof typeof CustomEmbeds = EmbedTypes[i];
      return new CustomEmbeds[embedType](link);
    }
  }

  throw new Error('Unsupported link');
}

// Helper functions to determine which link
function isYouTubeLink(link: string): boolean {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  return youtubeRegex.test(link);
}

function isGoogleDriveLink(link: string): boolean {
  const driveRegex = /(?:https?:\/\/)?(?:www\.)?(drive\.google\.com)\/(?:file\/d\/|open\?id=)([\w-]+)/;
  return driveRegex.test(link);
}

function isGoogleSitesLink(link: string): boolean {
  const googleSitesRegex = /(?:https?:\/\/)?sites\.google\.com\/([^\/]+)\/([^\/?]+)/;
  return googleSitesRegex.test(link);
}

function isGoogleDocsLink(link: string): boolean {
  const googleDocsRegex = /(?:https?:\/\/)?(?:docs\.google\.com)\/(?:document|spreadsheets|presentation)\/d\/([^\/?]+)/;
  return googleDocsRegex.test(link);
}

function isGoogleSlidesLink(link: string): boolean {
  const googleSlidesRegex = /(?:https?:\/\/)?docs\.google\.com\/presentation\/d\/([^\/?]+)/;
  return googleSlidesRegex.test(link);
}