'use client';
import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import CustomDataGrid from '../../components/CustomDataGrid';
import { useSession } from 'next-auth/react';
import { Box, Button } from '@mui/material';
import ModalEditarUsuario from '@/app/components/ModalEditarUsuario';
import { User } from '@/types/Interfaces';
import { editarUser, fetchUsuarios } from '@/app/api/users';

// Função de validação
function validarSenha(senha: string) {
  const erros: string[] = [];
  if (senha.length < 6) erros.push("A senha deve ter pelo menos 6 caracteres.");
  if (!/[0-9]/.test(senha)) erros.push("A senha deve conter pelo menos um número.");
  return erros;
}

export default function UsersPage() {
  const [rows, setRows] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userEditando, setUserEditando] = React.useState<User | null>(null);
  const { data: session } = useSession();

  const carregarUsuarios = React.useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const data = await fetchUsuarios(session.user.accessToken);
      setRows(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      window.alert('Sua sessão expirou ou você não tem permissão.');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  }, [session]);

  React.useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const handleAbrirModal = React.useCallback((user: User) => {
    setUserEditando(user);
  }, []);

  const handleAtivaDesativaUser = React.useCallback(async (user: User) => {
    const atualizado = { ...user, is_active: !user.is_active };
    await editarUser(atualizado, session?.user?.accessToken);
    carregarUsuarios();
  }, [session, carregarUsuarios]);

  const columns = React.useMemo(() => [
    { field: 'name', headerName: 'Usuário', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
      field: 'created_at',
      headerName: 'Criado em',
      width: 250,
      valueFormatter: (params: any) => new Date(params.value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'is_admin',
      headerName: 'Admin',
      width: 150,
      renderCell: (params: any) => <input type="checkbox" checked={params.value} readOnly disabled />,
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 250,
      renderCell: (params: any) => (
        <Box display="flex" gap={2}>
          {params.row.is_active === 1 && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleAbrirModal(params.row)}
            >
              Editar
            </Button>
          )}
          <Button
            variant="contained"
            color={params.row.is_active ? 'error' : 'warning'}
            size="small"
            onClick={() => handleAtivaDesativaUser(params.row)}
          >
            {params.row.is_active ? 'Desativar' : 'Ativar'}
          </Button>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
  ], [handleAbrirModal, handleAtivaDesativaUser]);

  return (
    <PageContainer style={{ display: 'flex', flexDirection: 'column' }}>
      <CustomDataGrid rows={rows} columns={columns} loading={loading} />
      <ModalEditarUsuario
        user={userEditando}
        onClose={() => setUserEditando(null)}
        onSave={async (userAtualizado) => {
          if (userAtualizado?.password !== userAtualizado?.password_confirmation) {
            alert("As senhas não conferem.");
            return;
          }
          if (userAtualizado.password) {
            const erros = validarSenha(userAtualizado.password);
            if (erros.length) {
              alert("Erros na senha:\n" + erros.join("\n"));
              return;
            }
          }
          await editarUser(userAtualizado, session?.user?.accessToken);
          carregarUsuarios();
          setUserEditando(null);
        }}
      />
    </PageContainer>
  );
}
