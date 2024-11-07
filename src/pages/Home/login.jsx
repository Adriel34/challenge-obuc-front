import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/login.validation";
import { createUserSchema } from "../../validation/create-user.validation";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useLogin } from "../../hooks/login.hook";
import { useState } from "react";
import obucLogo from "../../assets/obuc-logo.png";

export default function Login() {
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isCreatingUser ? createUserSchema : loginSchema),
  });
 
  const { signIn, createUser } = useLogin();

  const onSubmit = async (data) => {
    if (isCreatingUser) {
      await createUser.mutateAsync(data);
      window.alert("Usuário criado com sucesso! Agora faça o login.");
      window.location.href = "/login";
    } else {
      await signIn.mutateAsync(data);
    }
  };

  return (
    <main
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box padding={3}>
        <img className="navbar-logo" src={obucLogo} alt="Obuc logo" />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            {isCreatingUser ? "Criar Novo Usuário" : "Seja bem-vindo!"}
          </Typography>
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            {isCreatingUser ? "Preencha os dados para criar sua conta." : "Acesso garantido: digite seu login e desbrave!"}
          </Typography>
        </Box>
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {isCreatingUser && (
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            type="submit"
          >
            {isCreatingUser ? "Criar Usuário" : "Login"}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => setIsCreatingUser((prev) => !prev)}
          >
            {isCreatingUser ? "Já tem uma conta? Faça Login" : "Criar Usuário"}
          </Button>
        </Box>
      </Box>
    </main>
  );
}
