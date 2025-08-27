import projectList from "../tools/projectList";
import ShowProjects from "../components/ShowProjects";

// monte le composant App (appelé dans main.jsx)
function Projects() {
   const { projects, loading } = projectList();

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Liste des projets</h1>
      <ShowProjects projects={projects} />
    </div>
  );
}

export default Projects;