import { useStatus } from "../hooks/useStatus";

export function StatusSelect({ value, onChange, className = "" }) {
  const { status, loading, error } = useStatus();

  if (loading) return <select disabled className={className}><option>Loading...</option></select>;
  if (error) return <select disabled className={className}><option>Error : {error}</option></select>;
  if (!status.length) return <select disabled className={className}><option>No status found</option></select>;

  // Je parcoure status (status.map) et récupère chacune de ses valeurs {key, value}
  // J'affiche un select et j'envoie la valeur sélectionnée (onChange)
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={className}>
      <option value="">-- Choose a status --</option>
      {status.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}