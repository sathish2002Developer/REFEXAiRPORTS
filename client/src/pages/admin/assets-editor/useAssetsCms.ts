import { useEffect, useState } from 'react';
import { cmsAdminPatch, cmsGet } from '@/lib/api';
import { resolveComingSoon } from '@/lib/comingSoon';
import { assetsAirports } from './assetsData';
import { adminToast } from '@/lib/adminToast';

export function useAssetsCms() {
  const [airportId, setAirportId] = useState(assetsAirports[0].id);
  const [values, setValues] = useState<Record<string, string>>(() => ({ ...assetsAirports[0].values }));
  const [comingSoon, setComingSoon] = useState(Boolean(assetsAirports[0].comingSoon));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentAirport = assetsAirports.find((a) => a.id === airportId) || assetsAirports[0];

  useEffect(() => {
    const airport = assetsAirports.find((a) => a.id === airportId) || assetsAirports[0];
    setValues({ ...airport.values });
    setComingSoon(Boolean(airport.comingSoon));
    setLoading(true); setError(''); setSaved(false);
    let cancelled = false;
    cmsGet<Record<string, any>>(`assets/${airportId}`)
      .then((data) => {
        if (cancelled) return;
        setValues({ ...airport.values, ...(data.values || {}) });
        setComingSoon(resolveComingSoon(data, airport.comingSoon));
      })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load assets CMS'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [airportId]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value })); setSaved(false); setError('');
  };

  const persist = async (nextComingSoon: boolean, nextValues = values) => {
    const data = await cmsAdminPatch<Record<string, any>>(`assets/${airportId}`, {
      ...currentAirport,
      values: nextValues,
      comingSoon: nextComingSoon,
    });
    setValues({ ...currentAirport.values, ...(data.values || {}) });
    setComingSoon(resolveComingSoon(data, nextComingSoon));
    return data;
  };

  const handleComingSoon = async (next: boolean) => {
    const prev = comingSoon;
    setComingSoon(next);
    setSaved(false);
    setSaving(true);
    setError('');
    try {
      await persist(next);
      setSaved(true);
      adminToast.saved();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setComingSoon(prev);
      setError(err.message || 'Failed to save');
      adminToast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      await persist(comingSoon);
      setSaved(true); adminToast.saved(); setTimeout(() => setSaved(false), 3000);
    } catch (err: any) { setError(err.message || 'Failed to save'); adminToast.error(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return { airportId, setAirportId, values, comingSoon, setComingSoon: handleComingSoon, currentAirport, saving, saved, loading, error, handleChange, handleSave };
}
