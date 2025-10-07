import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, User, FolderOpen, CheckSquare } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";
import './Components.css';

export function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const { canAccess } = usePermissions();

  //console.log(`canAccess('users-delete') = ${canAccess('users_delete')}`);
  const menuItems = [
    {
      id: `users`,
      title: `Users`,
      icon: <User size={18} />,
      permission: PERMISSIONS.USERS,
      items: [
        { title: `Users list`, path: `/users`, permission: PERMISSIONS.USERS_READ },
        { title: `Create a new user`, path: `/users/create-user`, permission: PERMISSIONS.USERS_CREATE },
        { title: `Update a user`, path: `/users/update-user`, permission: PERMISSIONS.USERS_UPDATE },
        { title: `Delete a user`, path: `/users/delete-user`, permission: PERMISSIONS.USERS_DELETE }
      ]
    },
    {
      id: `projects`,
      title: `Projects`,
      icon: <FolderOpen size={18} />,
      permission: PERMISSIONS.PROJECTS,
      items: [
        { title: `Projects list`, path: `/projects`, permission: PERMISSIONS.PROJECTS_READ },
        { title: `Create a new project`, path: `/projects/create-project`, permission: PERMISSIONS.PROJECTS_CREATE },
        { title: `Update a project`, path: `/projects/update-project`, permission: PERMISSIONS.PROJECTS_UPDATE },
        { title: `Delete a project`, path: `/projects/delete-project`, permission: PERMISSIONS.PROJECTS_DELETE }
      ]
    },
    {
      id: `tasks`,
      title: `Tasks`,
      icon: <CheckSquare size={18} />,
      permission: PERMISSIONS.TASKS,
      items: [
        { title: `Tasks list`, path: `/tasks`, permission: PERMISSIONS.TASKS_READ },
        { title: `Create a new task`, path: `/tasks/create-task`, permission: PERMISSIONS.TASKS_CREATE },
        { title: `Update a task`, path: `/tasks/update-task`, permission: PERMISSIONS.TASKS_UPDATE },
        { title: `Delete a task`, path: `/tasks/delete-task`, permission: PERMISSIONS.TASKS_DELETE }
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
          {menuItems.map((item) => {
            if (!item.permission || canAccess(item.permission)) {
              return (
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
                      {item.items.map((subItem, index) => {
                        if (!subItem.permission || canAccess(subItem.permission)) {
                          return (
                            <button key={index} onClick={() => handleItemClick(subItem.path)}
                              className="submenu-item">
                              {subItem.title}
                            </button>)
                        }
                      })}
                    </div>
                  )}
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  );
} 