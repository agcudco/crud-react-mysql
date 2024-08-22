import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

export const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const items = [
        {
            label: 'Autores',
            icon: 'pi pi-users',
            command: () => navigate('/autores')
        },
        {
            label: 'Libros',
            icon: 'pi pi-book',
            command: () => navigate('/libros')
        }
    ];
    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}