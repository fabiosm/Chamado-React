import { User } from "@/types/Interfaces";
import { Box, Button, Checkbox, TextField, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserForm from "./forms/UserForm";
import PasswordFields from "./forms/PasswordFields";

// Componente principal
export default function ModalEditarUsuario({
  user,
  onClose,
  onSave,
}: {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}) {
  const [localUser, setLocalUser] = useState<User & { password?: string; password_confirmation?: string } | null>(user);
  const [campoSenha, setCampoSenha] = useState(false);

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setLocalUser(user);
    setCampoSenha(false);
  }, [user]);

  if (!localUser) return null;

  return (
    <Modal open={!!user} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Editar Usuário</h2>
        <UserForm user={localUser} onChange={setLocalUser} />

        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox checked={campoSenha} onChange={() => setCampoSenha(!campoSenha)} />
          Alterar senha?
        </Box>

        {campoSenha && <PasswordFields user={localUser} onChange={setLocalUser} />}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} color="inherit">Cancelar</Button>
          <Button onClick={() => onSave(localUser)} variant="contained" color="primary">Salvar</Button>
        </Box>
      </Box>
    </Modal>
  );
}
