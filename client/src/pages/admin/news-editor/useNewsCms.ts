import { useEffect, useState } from 'react';
import { cmsAdminPatch, cmsGet } from '@/lib/api';
import { toNewsDraft, type NewsDraft } from './cmsDraft';
import type { HighlightItem, NewsItem, StoryItem } from './newsData';
import { adminToast } from '@/lib/adminToast';

const clone = (obj: NewsDraft): NewsDraft => JSON.parse(JSON.stringify(obj));

export function useNewsCms() {
  const [draft, setDraft] = useState<NewsDraft>(() => toNewsDraft({}));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    cmsGet<Record<string, any>>('news')
      .then((data) => {
        if (!cancelled) setDraft(toNewsDraft(data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load news CMS');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mark = () => setSaved(false);

  const setField = (key: 'pageTitle' | 'pageSubtitle', value: string) => {
    setDraft((p) => ({ ...p, [key]: value }));
    mark();
  };

  const updateTab = (i: number, field: 'label' | 'icon', value: string) => {
    setDraft((p) => {
      const tabs = clone(p).tabs;
      tabs[i] = { ...tabs[i], [field]: value };
      return { ...p, tabs };
    });
    mark();
  };

  const updateNews = (i: number, field: keyof NewsItem, value: string) => {
    setDraft((p) => {
      const newsItems = clone(p).newsItems;
      newsItems[i] = { ...newsItems[i], [field]: value };
      return { ...p, newsItems };
    });
    mark();
  };
  const addNews = () => {
    setDraft((p) => ({
      ...p,
      newsItems: [...p.newsItems, { title: '', date: '', description: '', image: '', link: '' }],
    }));
    mark();
    adminToast.added();
  };
  const removeNews = (i: number) => {
    setDraft((p) => ({ ...p, newsItems: p.newsItems.filter((_, n) => n !== i) }));
    mark();
    adminToast.deleted();
  };

  const updateStory = (i: number, field: keyof StoryItem, value: string) => {
    setDraft((p) => {
      const stories = clone(p).stories;
      stories[i] = { ...stories[i], [field]: value };
      return { ...p, stories };
    });
    mark();
  };
  const addStory = () => {
    setDraft((p) => ({
      ...p,
      stories: [...p.stories, { title: '', subtitle: '', description: '', image: '' }],
    }));
    mark();
    adminToast.added();
  };
  const removeStory = (i: number) => {
    setDraft((p) => ({ ...p, stories: p.stories.filter((_, n) => n !== i) }));
    mark();
    adminToast.deleted();
  };

  const updateHighlight = (i: number, field: keyof HighlightItem, value: string) => {
    setDraft((p) => {
      const highlights = clone(p).highlights;
      highlights[i] = { ...highlights[i], [field]: value };
      return { ...p, highlights };
    });
    mark();
  };
  const addHighlight = () => {
    setDraft((p) => ({
      ...p,
      highlights: [...p.highlights, { title: '', description: '', image: '', date: '', icon: 'ri-star-line' }],
    }));
    mark();
    adminToast.added();
  };
  const removeHighlight = (i: number) => {
    setDraft((p) => ({ ...p, highlights: p.highlights.filter((_, n) => n !== i) }));
    mark();
    adminToast.deleted();
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const data = await cmsAdminPatch<Record<string, any>>('news', draft);
      setDraft(toNewsDraft(data));
      setSaved(true);
      adminToast.saved();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
      adminToast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return {
    draft,
    saving,
    saved,
    loading,
    error,
    handleSave,
    setField,
    updateTab,
    updateNews,
    addNews,
    removeNews,
    updateStory,
    addStory,
    removeStory,
    updateHighlight,
    addHighlight,
    removeHighlight,
  };
}
