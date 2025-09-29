import { useRoles } from "../hooks/useRoles";

export function RolesSelect({ value, onChange, className = "" }) {
  const { roles, loading, error } = useRoles();

  if (loading) return <select disabled className={className}><option>Loading...</option></select>;
  if (error) return <select disabled className={className}><option>Error: {error}</option></select>;
  if (!roles.length) return <select disabled className={className}><option>No role found</option></select>;

  // Je parcoure roles (roles.map()) et récupère toutes les valeurs de l'enum {key, value} 
  // J'affiche un select et j'envoie la valeur sélectionnée (onChange)
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={className}>
      <option value="">-- Choose a role --</option>
      {roles.map(role => (
        <option key={role} value={role}>{role}</option>
      ))}
    </select>
  );
}
