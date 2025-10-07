import { useProjectList } from "../hooks/useProjectList";
import { ShowProjects } from "../components/ShowProjects";
import { useNavigate } from "react-router-dom";
import './Pages.css';

// monte le composant App (appelé dans main.jsx)
function Projects() {
  const { projects, loading } = useProjectList();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/projects/create-project');
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="relative pt-12">
      <button type="submit" onClick={handleCreate} className="create-btn">New</button>
      <h1>Liste des projets</h1>
      <ShowProjects projects={projects} />
    </div>
  );
}

export default Projects;