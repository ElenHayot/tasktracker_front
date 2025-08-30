// Elément affichant la liste des IDs des projets

export function SelectProjectDDL({ projects, value, onChange, label = "Project : ", placeHolder = "-- Select a project --" }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange} >
        <option value="">{placeHolder}</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            ID : {project.id} - {project.title}
          </option>
        ))}
      </select>
    </div>
  );
}