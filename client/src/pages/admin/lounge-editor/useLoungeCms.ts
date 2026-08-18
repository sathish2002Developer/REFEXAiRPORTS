import { useEffect, useState } from 'react';
import { cmsAdminPatch, cmsGet } from '@/lib/api';
import { loungeAirports, type AirportLoungeData } from './loungeData';
import { toLoungeDraft } from './cmsDraft';
import { adminToast } from '@/lib/adminToast';

const clone = (obj: AirportLoungeData) => JSON.parse(JSON.stringify(obj)) as AirportLoungeData;

export function useLoungeCms() {
  const [airportId, setAirportId] = useState(loungeAirports[0].id);
  const [draft, setDraft] = useState<AirportLoungeData>(() => toLoungeDraft(loungeAirports[0]));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentAirport = loungeAirports.find((a) => a.id === airportId) || loungeAirports[0];

  useEffect(() => {
    const airport = loungeAirports.find((a) => a.id === airportId) || loungeAirports[0];
    setDraft(toLoungeDraft(airport));
    setLoading(true); setError(''); setSaved(false);
    let cancelled = false;
    cmsGet<Record<string, any>>(`lounge/${airportId}`)
      .then((data) => { if (!cancelled) setDraft(toLoungeDraft(data)); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load lounge CMS'); })
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
      const data = await cmsAdminPatch<Record<string, any>>(`lounge/${airportId}`, {
        ...currentAirport,
        ...draft,
        comingSoon,
      });
      setDraft(toLoungeDraft(data));
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

  const setField = (key: keyof AirportLoungeData, value: string) => {
    setDraft((p) => ({ ...p, [key]: value })); setSaved(false);
  };

  const updateAmenity = (i: number, field: keyof AirportLoungeData['amenities'][number], value: string) => {
    setDraft((p) => { const amenities = clone(p).amenities; amenities[i] = { ...amenities[i], [field]: value }; return { ...p, amenities }; }); setSaved(false);
  };
  const addAmenity = () => { setDraft((p) => ({ ...p, amenities: [...p.amenities, { icon: 'ri-star-line', title: '', description: '' }] })); setSaved(false); adminToast.added(); };
  const removeAmenity = (i: number) => { setDraft((p) => ({ ...p, amenities: p.amenities.filter((_, n) => n !== i) })); setSaved(false); adminToast.deleted(); };

  const updateAccess = (i: number, field: keyof AirportLoungeData['accessOptions'][number], value: string) => {
    setDraft((p) => { const accessOptions = clone(p).accessOptions; accessOptions[i] = { ...accessOptions[i], [field]: value }; return { ...p, accessOptions }; }); setSaved(false);
  };
  const addAccess = () => { setDraft((p) => ({ ...p, accessOptions: [...p.accessOptions, { type: '', desc: '', icon: 'ri-user-line' }] })); setSaved(false); adminToast.added(); };
  const removeAccess = (i: number) => { setDraft((p) => ({ ...p, accessOptions: p.accessOptions.filter((_, n) => n !== i) })); setSaved(false); adminToast.deleted(); };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const data = await cmsAdminPatch<Record<string, any>>(`lounge/${airportId}`, { ...currentAirport, ...draft });
      setDraft(toLoungeDraft(data)); setSaved(true); adminToast.saved(); setTimeout(() => setSaved(false), 3000);
    } catch (err: any) { setError(err.message || 'Failed to save'); adminToast.error(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return { airportId, setAirportId, draft, currentAirport, saving, saved, loading, error, handleSave, setField, setComingSoon, updateAmenity, addAmenity, removeAmenity, updateAccess, addAccess, removeAccess };
}
