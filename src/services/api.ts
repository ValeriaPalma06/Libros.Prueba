import { User } from '../types';

export const fetchInitialUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    
    // Obtener solo los primeros 3 usuarios
    const apiUsers = data.slice(0, 3).map((u: any) => ({
      id: `api-${u.id}`,
      name: u.name,
      email: u.email.toLowerCase(),
      birthDate: '2000-01-01',
      password: 'Inacap123',
      failedAttempts: 0,
      isBlocked: false
    }));

    return apiUsers;
  } catch (error) {
    console.error('Error al consumir la API JSONPlaceholder:', error);
    return []; // Retorna lista vacía en caso de fallar
  }
};