'use client';
import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import CustomDataGrid from '../../components/CustomDataGrid';
import { useSession } from 'next-auth/react';
import { Box, Button } from '@mui/material';
import ModalEditarUsuario from '@/app/components/ModalEditarUsuario';
import { User } from '@/types/Interfaces';
import { editarUser, fetchUsuarios } from '@/app/api/users';
import toast from 'react-hot-toast';

// Função de validação de senha
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
  const { data: session, status } = useSession();

  // Função para carregar usuários
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

  // useEffect assíncrono moderno
  React.useEffect(() => {
    if (status !== 'authenticated') return;

    let isMounted = true;

    (async () => {
      await carregarUsuarios();
      // verifica se ainda está montado antes de atualizar estado
      if (!isMounted) return;
    })();

    return () => {
      isMounted = false; // impede updates se desmontado
    };
  }, [status, carregarUsuarios]);

  const handleAbrirModal = React.useCallback((user: User) => {
    setUserEditando(user);
  }, []);

  const handleAtivaDesativaUser = React.useCallback(async (user: User) => {
    let msg = 'Usuário ativado.';
    if (user.is_active) {
      msg = 'Usuário desativado.'
    }

    const atualizado = { ...user, is_active: !user.is_active };
    await editarUser(atualizado, session?.user?.accessToken);
    toast.success(msg);
    await carregarUsuarios();
  }, [session, carregarUsuarios]);

  const columns = React.useMemo(() => [
    { field: 'name', headerName: 'Usuário', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    {
      field: 'created_at',
      headerName: 'Criado em',
      width: 250,
      valueFormatter: (params: any) => {
        return new Date(params).toLocaleDateString('pt-BR');
      },
    },
    {
      field: 'is_admin',
      headerName: 'Admin',
      width: 150,
      renderCell: (params: any) => <input type="checkbox" checked={!!params.value} readOnly disabled />,
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 250,
      renderCell: (params: any) => {
        const ativo = !!params.row.is_active;
        return (
          <Box display="flex" gap={2}>
            {ativo && (
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
              color={ativo ? 'error' : 'warning'}
              size="small"
              onClick={() => handleAtivaDesativaUser(params.row)}
            >
              {ativo ? 'Desativar' : 'Ativar'}
            </Button>
          </Box>
        );
      },
      sortable: false,
      filterable: false,
    },
  ], [handleAbrirModal, handleAtivaDesativaUser]);

  return (
    <PageContainer style={{ display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        style={{ flex: 1, minHeight: '400px' }}
      />
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
          toast.success('Usuário atualizado com sucesso.');
          await carregarUsuarios();
          setUserEditando(null);
        }}
      />
    </PageContainer>
  );
}
