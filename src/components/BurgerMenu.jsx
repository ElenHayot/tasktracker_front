import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, User, FolderOpen, CheckSquare } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import './BurgerMenu.css';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: `users`,
      title: `Users`,
      icon: <User size={18} />,
      items: [
        { title: `Users list`, path: `/users` },
        { title: `Create a new user`, path: `/users/create-user` },
        { title: `Update a user`, path: `/users/update-user` },
        { title: `Delete a user`, path: `/users/delete-user` }
      ]
    },
    {
      id: `projects`,
      title: `Projects`,
      icon: <FolderOpen size={18} />,
      items: [
        { title: `Projects list`, path: `/projects` },
        { title: `Create a new project`, path: `/projects/create-project` },
        { title: `Update a project`, path: `/projects/update-project` },
        { title: `Delete a project`, path: `/projects/delete-project` }
      ]
    },
    {
      id: `tasks`,
      title: `Tasks`,
      icon: <CheckSquare size={18} />,
      items: [
        { title: `Tasks list`, path: `/tasks` },
        { title: `Create a new task`, path: `/tasks/create-task` },
        { title: `Update a task`, path: `/tasks/update-task` },
        { title: `Delete a task`, path: `/tasks/delete-task` }
      ]
    }
  ];

  const toggleSubMenu = (itemId) => {
    console.log(`toggleSubMenu and itemId = ${itemId}`)
    setOpenSubMenu(openSubMenu === itemId ? null : itemId);
  };

  const handleItemClick = (path) => {
    console.log(`Navigation vers : ${path}`);
    navigate(path); // navigation vers le lien associé
    setIsOpen(false);   // ferme après clic
    setOpenSubMenu(null);
  };

  return (
    <>
      {/* Bouton burger */}
      <button onClick={() => setIsOpen(!isOpen)} className="burger-button" >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Menu sidebar */}
      <div className={`menu-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header du menu */}
        <div className="menu-header">
          <h2 className="menu-title">Menu principal</h2>
        </div>

        {/* Items du menu */}
        <div className="menu-items-container">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              {/* Item principal */}
              <button onClick={() => toggleSubMenu(item.id)} className="menu-item-button">
                <div className="menu-item-content">
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-item-title">{item.title}</span>
                </div>
                <span className="chevron-icon">{openSubMenu === item.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
              </button>

              {/* Sous-menu */}
              {openSubMenu === item.id && (
                <div className="submenu">
                  {item.items.map((subItem, index) => (
                    <button key={index} onClick={() => handleItemClick(subItem.path)}
                      className="submenu-item">
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 