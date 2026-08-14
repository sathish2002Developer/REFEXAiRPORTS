import { useEffect, useState } from 'react';
import { cmsAdminPatch, cmsGet } from '@/lib/api';
import { assetsAirports } from './assetsData';

export function useAssetsCms() {
  const [airportId, setAirportId] = useState(assetsAirports[0].id);
  const [values, setValues] = useState<Record<string, string>>(() => ({ ...assetsAirports[0].values }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentAirport = assetsAirports.find((a) => a.id === airportId) || assetsAirports[0];

  useEffect(() => {
    const airport = assetsAirports.find((a) => a.id === airportId) || assetsAirports[0];
    setValues({ ...airport.values });
    setLoading(true); setError(''); setSaved(false);
    let cancelled = false;
    cmsGet<Record<string, any>>(`assets/${airportId}`)
      .then((data) => { if (!cancelled) setValues({ ...airport.values, ...(data.values || {}) }); })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load assets CMS'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [airportId]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value })); setSaved(false); setError('');
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const data = await cmsAdminPatch<Record<string, any>>(`assets/${airportId}`, { ...currentAirport, values });
      setValues({ ...currentAirport.values, ...(data.values || {}) });
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err: any) { setError(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return { airportId, setAirportId, values, currentAirport, saving, saved, loading, error, handleChange, handleSave };
}
