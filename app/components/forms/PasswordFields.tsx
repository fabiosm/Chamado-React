import { TextField } from "@mui/material";
import React from "react";
import { User } from "@/types/Interfaces";

export default function PasswordFields({
  user,
  onChange
}: {
  user: Partial<User>,
  onChange: (u: Partial<User>) => void
}) {
  return (
    <>
      <hr />
      <TextField
        label="Senha"
        fullWidth
        margin="normal"
        type="password"
        value={user.password || ""}
        onChange={(e) => onChange({ ...user, password: e.target.value })}
      />
      <TextField
        label="Confirmar Senha"
        fullWidth
        margin="normal"
        type="password"
        value={user.password_confirmation || ""}
        onChange={(e) => onChange({ ...user, password_confirmation: e.target.value })}
      />
    </>
  );
}