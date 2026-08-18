import { newsPageData, type NewsPageData } from '@/pages/admin/news-editor/newsData';

export type NewsDraft = Omit<NewsPageData, 'id'>;

export function toNewsDraft(raw: Partial<NewsPageData> & Record<string, any> = {}): NewsDraft {
  const f = newsPageData;
  return {
    pageTitle: raw.pageTitle ?? f.pageTitle,
    pageSubtitle: raw.pageSubtitle ?? f.pageSubtitle,
    tabs: JSON.parse(JSON.stringify(raw.tabs?.length ? raw.tabs : f.tabs)),
    newsItems: JSON.parse(JSON.stringify(Array.isArray(raw.newsItems) ? raw.newsItems : f.newsItems)),
    stories: JSON.parse(JSON.stringify(Array.isArray(raw.stories) ? raw.stories : f.stories)),
    highlights: JSON.parse(JSON.stringify(Array.isArray(raw.highlights) ? raw.highlights : f.highlights)),
    socialPosts: JSON.parse(JSON.stringify(Array.isArray(raw.socialPosts) ? raw.socialPosts : f.socialPosts)),
  };
}

export const newsInputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';
export const newsLabelCls = 'block text-sm font-semibold text-slate-700 mb-2';
