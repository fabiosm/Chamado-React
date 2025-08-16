import { User } from '@/types/Interfaces';
import { apiRequest } from './apiClient';

// Função para buscar usuários
export async function fetchUsuarios(token?: string): Promise<User[]> {
  const data = await apiRequest<{ data: User[] }>('/admin/users', token);
  return data.data;
}

// Função para editar usuário
export async function editarUser(user: User, token?: string) {
  return apiRequest(`/admin/users/${user.id}`, token, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
}
