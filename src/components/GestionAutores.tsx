import React, { useEffect, useState } from "react";
import { Autor } from "../interfaces/Autor";
import { getAutores } from "../services/autorServices";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";


export const GestionAutores: React.FC = () => {

    const [autores, setAutores] = useState<Autor[]>([]);

    useEffect(() => {
        const fetchAutores = async () => {
            const data = await getAutores();
            setAutores(data);
        }
        fetchAutores();
    }, []);

    // Formato de la fecha
    const formatDate = (value: string) => {
        const date = new Date(value); // Convierte la cadena a un objeto Date
        
        if (isNaN(date.getTime())) {
            return "Fecha no disponible"; // Manejo de fechas inválidas
        }

        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);
    };

    // Renderizar la columna de fecha
    const dateBodyTemplate = (rowData: Autor) => {
        return formatDate(rowData.fecha_nacimiento);
    };

    return (
        <div>
            <h1>Gestion de autores</h1>
            <DataTable value={autores}>
                <Column field="id" header="Id" />
                <Column field="nombres" header="Nombres" />
                <Column field="apellidos" header="Apellidos" />
                <Column field="dni" header="Cedula/Pasaporte" />
                <Column field="fecha_nacimiento" header="Fecha Nacimiento" body={dateBodyTemplate}></Column>
                <Column field="pais" header="Pais" />
                <Column body={(rowData) => (
                    <div>
                        <Button icon="pi pi-pencil" />
                        <Button icon="pi pi-trash" />
                    </div>
                )} />
            </DataTable>
        </div>
    );
}