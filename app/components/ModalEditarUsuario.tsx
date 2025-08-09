import { User } from "@/types/Interfaces";
import { Box, Button, Checkbox, Modal, TextField } from "@mui/material";
import React, { useEffect } from "react";

export default function ModalEditarUsuario({ user, onClose, onSave }: {
  user: User | null,
  onClose: () => void,
  onSave: (user: User) => void
}) {
    const [localUser, setLocalUser] = React.useState<User | null>(user);
    const [campoSenha, setCampoSenha] = React.useState(false);

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
    }

    useEffect(() => {
        setLocalUser(user);
    }, [user]);

    if (!localUser) return null;

    return (
        <Modal open={!!user} onClose={onClose}>
        <Box sx={modalStyle}>
            <h2>Editar Usuário</h2>
            <TextField
                label="Nome"
                fullWidth
                margin="normal"
                value={localUser.name}
                onChange={(e) =>
                    setLocalUser({ ...localUser, name: e.target.value })
                }
            />
            <TextField
                label="E-mail"
                fullWidth
                margin="normal"
                value={localUser.email}
                onChange={(e) =>
                    setLocalUser({ ...localUser, email: e.target.value })
                }
            />
            <Checkbox
                checked={localUser.is_admin}
                onChange={(e) =>
                    setLocalUser({ ...localUser, is_admin: e.target.checked })
                }
            /> Administrador

            <br />
            <Checkbox onClick={() => setCampoSenha(!campoSenha)} /> Alterar senha?

            {campoSenha && (
                <>
                    <hr />
                    <TextField label="Senha" fullWidth margin="normal" type="password" />
                    <TextField label="Confirmar Senha" fullWidth margin="normal" type="password" />
                </>
            )}

            <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose} color="inherit">Cancelar</Button>
            <Button onClick={() => onSave(localUser)} variant="contained" color="primary">Salvar</Button>
            </Box>
        </Box>
        </Modal>
    );
}