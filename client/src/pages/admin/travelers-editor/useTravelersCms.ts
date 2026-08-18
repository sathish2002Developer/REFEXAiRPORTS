import { useEffect, useState } from 'react';
import { cmsAdminPatch, cmsGet } from '@/lib/api';
import { travelersAirports } from './travelersData';
import { toTravelersDraft, type TravelersDraft } from './cmsDraft';
import { adminToast } from '@/lib/adminToast';

const clone = (obj: TravelersDraft): TravelersDraft => JSON.parse(JSON.stringify(obj));

export function useTravelersCms() {
  const [airportId, setAirportId] = useState(travelersAirports[0].id);
  const [draft, setDraft] = useState<TravelersDraft>(() => toTravelersDraft(travelersAirports[0]));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentAirport = travelersAirports.find((a) => a.id === airportId) || travelersAirports[0];

  useEffect(() => {
    const airport = travelersAirports.find((a) => a.id === airportId) || travelersAirports[0];
    setDraft(toTravelersDraft(airport));
    setLoading(true); setError(''); setSaved(false);
    let cancelled = false;
    cmsGet<Record<string, any>>(`travelers/${airportId}`)
      .then((data) => { if (!cancelled) setDraft(toTravelersDraft(data)); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load travelers CMS'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [airportId]);

  const setComingSoon = async (comingSoon: boolean) => {
    const prev = draft.comingSoon;
    setDraft((p) => ({ ...p, comingSoon }));
    setSaved(false);
    setSaving(true);
    setError('');
    try {
      const data = await cmsAdminPatch<Record<string, any>>(`travelers/${airportId}`, {
        ...currentAirport,
        ...draft,
        comingSoon,
      });
      setDraft(toTravelersDraft(data));
      setSaved(true);
      adminToast.saved();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setDraft((p) => ({ ...p, comingSoon: prev }));
      setError(err.message || 'Failed to save');
      adminToast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };
  const setField = (key: keyof TravelersDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value })); setSaved(false);
  };
  const updateBrand = (i: number, field: keyof TravelersDraft['brands'][number], value: string) => {
    setDraft((p) => { const brands = clone(p).brands; brands[i] = { ...brands[i], [field]: value }; return { ...p, brands }; }); setSaved(false);
  };
  const addBrand = () => { setDraft((p) => ({ ...p, brands: [...p.brands, { name: '', description: '', category: '', location: '', logo: '' }] })); setSaved(false); adminToast.added(); };
  const removeBrand = (i: number) => { setDraft((p) => ({ ...p, brands: p.brands.filter((_, n) => n !== i) })); setSaved(false); adminToast.deleted(); };
  const updateTerminal = (i: number, field: 'name' | 'count', value: string) => {
    setDraft((p) => { const terminals = clone(p).terminals; terminals[i] = { ...terminals[i], [field]: field === 'count' ? Number(value) || 0 : value } as any; return { ...p, terminals }; }); setSaved(false);
  };
  const addTerminal = () => { setDraft((p) => ({ ...p, terminals: [...p.terminals, { name: '', count: 0 }] })); setSaved(false); adminToast.added(); };
  const removeTerminal = (i: number) => { setDraft((p) => ({ ...p, terminals: p.terminals.filter((_, n) => n !== i) })); setSaved(false); adminToast.deleted(); };
  const updateFaq = (i: number, field: keyof TravelersDraft['faqs'][number], value: string) => {
    setDraft((p) => { const faqs = clone(p).faqs; faqs[i] = { ...faqs[i], [field]: value }; return { ...p, faqs }; }); setSaved(false);
  };
  const addFaq = () => { setDraft((p) => ({ ...p, faqs: [...p.faqs, { question: '', answer: '' }] })); setSaved(false); adminToast.added(); };
  const removeFaq = (i: number) => { setDraft((p) => ({ ...p, faqs: p.faqs.filter((_, n) => n !== i) })); setSaved(false); adminToast.deleted(); };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const data = await cmsAdminPatch<Record<string, any>>(`travelers/${airportId}`, { ...currentAirport, ...draft });
      setDraft(toTravelersDraft(data)); setSaved(true); adminToast.saved(); setTimeout(() => setSaved(false), 3000);
    } catch (err: any) { setError(err.message || 'Failed to save'); adminToast.error(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return { airportId, setAirportId, draft, currentAirport, saving, saved, loading, error, handleSave, setField, setComingSoon, updateBrand, addBrand, removeBrand, updateTerminal, addTerminal, removeTerminal, updateFaq, addFaq, removeFaq };
}
