import { Libro } from "../interfaces/Libro";

export const getLibros = async (): Promise<Libro[]> => {
    const response = await fetch('http://localhost:5000/libros');
    if (!response.ok) {
        throw new Error(`Error al obtener libros: ${response.statusText}`);
    }
    return response.json();
};

export const agregarLibro = async (libro: Libro) => {
    console.log('Añadiendo libro:', libro);  // Añadido para depuración
    try {
        const response = await fetch('http://localhost:5000/libros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(libro)
        });
        if (!response.ok) {
            throw new Error(`Error al añadir libro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en agregarLibro:', error);
        throw error;  // Lanzar error para manejarlo en el lugar donde se llame
    }
};

export const actualizarLibro = async (id: number, libro: Libro) => {
    try {
        const response = await fetch(`http://localhost:5000/libros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(libro)
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar libro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en actualizarLibro:', error);
        throw error;
    }
};

export const eliminarLibro = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:5000/libros/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar libro: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en eliminarLibro:', error);
        throw error;
    }
};
