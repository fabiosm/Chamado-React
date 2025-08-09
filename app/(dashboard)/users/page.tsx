'use client';
import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import CustomDataGrid from '../../components/CustomDataGrid';
import { useSession } from 'next-auth/react';
import { Box, Button, Checkbox, Modal, TextField } from '@mui/material';
import ModalEditarUsuario from '@/app/components/ModalEditarUsuario';
import { User } from '@/types/Interfaces';

async function salvarUser(user: User, session: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_APP_API_URL + '/admin/users/' + user.id,
      {
        method: 'PUT', // ou 'PATCH' se for atualização parcial
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(user), // ou apenas os dados a serem atualizados
      }
    );

    if (!response.ok) {
      throw new Error(`Erro da API: ${response.status}`);
    }

    const data = await response.json();
    console.log('Usuário atualizado:', data);
  } catch (error) {
    console.error('Erro ao editar usuário', error);
    window.alert('Sua sessão expirou ou você não tem permissão.');
    window.location.href = '/';
  }
}

export default function UsersPage() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userEditando, setUserEditando] = React.useState<User | null>(null);
  const { data: session } = useSession();

  const handleAbrirModal = (user: User) => {
    setUserEditando(user);
  };

  const carregarUsuarios = React.useCallback(async () => {
    setLoading(true);
    fetch(
      process.env.NEXT_PUBLIC_APP_API_URL  + '/admin/users',
      {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.accessToken}`,
          }
        }
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro da API: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRows(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        // Alerta
        window.alert('Sua sessão expirou ou você não tem permissão.');
        // Redirecionamento para a página de login
        window.location.href = '/';
        setLoading(false);
      });

  }, [session]);

  React.useEffect(() => {
    if (session) {
      carregarUsuarios();
    }
  }, [session, carregarUsuarios]);

  const columns = [
    { field: 'name', headerName: 'Usuário', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
      field: 'created_at',
      headerName: 'Criado em',
      width: 250,
      valueFormatter: (params: string | number | Date) => new Date(params).toLocaleDateString('pt-BR'),
    },
    {
      field: 'is_admin',
      headerName: 'Admin',
      width: 150,
      renderCell: (param: any) => (
        <input type="checkbox" checked={param.value} readOnly disabled />
      ),
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 250,
      renderCell: (param: any) => (
        <>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleAbrirModal(param.row)}
            >
              Editar
            </Button>
            <Button variant="contained" color="error" size="small">
              Desativar
            </Button>
          </Box>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <PageContainer>
      <CustomDataGrid rows={rows} columns={columns} loading={loading} />

      <ModalEditarUsuario
        user={userEditando}
        onClose={() => setUserEditando(null)}
        onSave={(userAtualizado) => {
          salvarUser(userAtualizado, session);
          carregarUsuarios();
          setUserEditando(null);
        }}
      />
    </PageContainer>
  );
}
