import React, { useEffect, useState } from "react";
import { Libro } from "../interfaces/Libro";
import { Autor } from "../interfaces/Autor";
import { actualizarLibro, agregarLibro, eliminarLibro, getLibros } from "../services/libroServices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { getAutores } from "../services/autorServices";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const opEstados = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'Prestado', value: 'Prestado' },
    { label: 'Reservado', value: 'Reservado' },
    { label: 'No disponible', value: 'No disponible' }
];

export const GestionLibros: React.FC = () => {

    const [libros, setLibros] = useState<Libro[]>([]);
    const [autores, setAutores] = useState<Autor[]>([]);
    const [libro, setLibro] = useState<Libro | null>(null);
    const [dlgLibro, setDlgLibro] = useState<boolean>(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        const fetchLibros = async () => {
            const data = await getLibros();
            setLibros(data);
        };
        fetchLibros();

        const fetchAutores = async () => {
            const datos = await getAutores();
            setAutores(datos);
        }

        fetchAutores();
    }, []);

    const abrirNuevo = () => {
        setLibro(null);
        setDlgLibro(true);
    }

    const guadarLibro = async () => {
        if (!libro?.id) {//libro.id===0
            await agregarLibro(libro!);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Libro registrado exitosamente', life: 3000 });
        } else {
            await actualizarLibro(libro.id, libro);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Libro actualizado exitosamente', life: 3000 });
        }
        setDlgLibro(false);
        setLibro(null);
        setLibros(await getLibros());
    }

    const editarLibro = (libroSel: Libro) => {
        setLibro(libroSel);
        setDlgLibro(true);
    }
    const borrarLibro = async (libroSel: Libro) => {
        await eliminarLibro(libroSel.id);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Libro eliminado exitosamente', life: 3000 });
        setLibros(await getLibros());
    }

    return (
        <div>
            <Toast ref={toast} />
            <h1>Gestion de libros</h1>
            <Button label="Nuevo" icon="pi pi-plus" onClick={abrirNuevo} />
            <DataTable value={libros} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID" />
                <Column field="titulo" header="Título" />
                <Column field="id_autor" header="Autor"
                    body={(rowData) => {
                        const autor = autores.find(author => author.id === rowData.id_autor);
                        return autor ? autor.nombres + ' ' + autor.apellidos : 'Desconocido';
                    }} />
                <Column field="editorial" header="Editorial" />
                <Column field="nropaginas" header="Número de Páginas" />
                <Column field="stock" header="Stock" />
                <Column field="estado" header="Estado" />

                <Column body={(rowData) => (
                    <div>
                        <Button icon="pi pi-pencil" onClick={() => editarLibro(rowData)} />
                        <Button icon="pi pi-trash" onClick={() => borrarLibro(rowData)} />
                    </div>
                )} />
            </DataTable>

            <Dialog
                visible={dlgLibro}
                header="Detalles del Libro"
                modal
                onHide={() => setDlgLibro(false)}>

                <div className="p-field">
                    <label htmlFor="titulo">Título</label>
                    <InputText
                        id="titulo"
                        value={libro?.titulo}
                        onChange={(e) => setLibro({ ...libro!, titulo: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="autor">Autor</label>
                    <Dropdown
                        id="autor"
                        value={libro?.id_autor}
                        options={autores}
                        optionLabel="nombres"
                        optionValue="id"
                        placeholder="Seleccione un autor"
                        onChange={(e) => setLibro({ ...libro!, id_autor: e.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="editaorial">Editorial:</label>
                    <InputText
                        id="editorial"
                        value={libro?.editorial || ''}
                        onChange={(e) => setLibro({ ...libro!, editorial: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="paginas">Nro Páginas</label>
                    <InputText id="paginas"
                        type="number"
                        value={libro?.nropaginas?.toString() || '0'}
                        onChange={(e) => setLibro({ ...libro!, nropaginas: parseInt(e.target.value) })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="stock">Unidad disponibles</label>
                    <InputText id="stock"
                        type="number"
                        value={libro?.stock?.toString() || '0'}
                        onChange={(e) => setLibro({ ...libro!, stock: parseInt(e.target.value) })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="estado">Estado</label>
                    <Dropdown
                        id="estado"
                        value={libro?.estado}
                        options={opEstados}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Seleccionar estado"
                        onChange={(e) => setLibro({ ...libro!, estado: e.value })}
                    />
                </div>
                <Button label="Guardar" icon="pi pi-save" onClick={guadarLibro} />
            </Dialog>
        </div>
    );
}