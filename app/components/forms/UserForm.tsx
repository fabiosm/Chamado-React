import { TextField, Box, Checkbox } from "@mui/material";
import React from "react";
import { User } from "@/types/Interfaces";
import { useSession } from "next-auth/react";

function isMyUser(user: User) {
  const { data: session } = useSession();
  return user.id == session?.user.id;
}

export default function UserForm({
  user,
  onChange
}: {
  user: User,
  onChange: (u: User) => void
}) {
  return (
    <>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={user.name}
        onChange={(e) => onChange({ ...user, name: e.target.value })}
      />
      <TextField
        label="E-mail"
        fullWidth
        margin="normal"
        value={user.email}
        onChange={(e) => onChange({ ...user, email: e.target.value })}
      />
      <Box
        display="flex"
        alignItems="center"
        gap={1} mt={1}
        title={isMyUser(user) ? "Você não pode alterar o próprio status de administrador" : ""}>
        <Checkbox
          checked={user.is_admin}
          onChange={(e) => onChange({ ...user, is_admin: e.target.checked })}
          disabled={isMyUser(user)}
          style={{ opacity: isMyUser(user) ? 0.5 : 1 }}
        />
        Administrador
      </Box>
    </>
  );
}