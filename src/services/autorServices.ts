import { Autor } from "../interfaces/Autor";

export const getAutores = async (): Promise<Autor[]> => {
    try {
        const response = await fetch('http://localhost:5000/autores');
        if (!response.ok) {
            throw new Error(`Error al obtener autores: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const getAutores dice: ", error);
        throw error;
    }
}

export const agregarAutor = async (autor: Autor) => {
    try {
        const response = await fetch('http://localhost:5000/autores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(autor)
        });
        if (!response.ok) {
            throw new Error(`Error al registrar un autor: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const agregarAutor dice: ", error);
        throw error;
    }
}

export const actualizarAutor = async (id: number, autor: Autor) => {
    try {
        const response = await fetch(`http://localhost:5000/autores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(autor)
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar el autor: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const actualizarAutor dice: ", error);
        throw error;
    }
}

export const eliminarAutor = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:5000/autores/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Error al eliminar el autor: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const eliminarAutor dice: ", error);
        throw error;
    }
}