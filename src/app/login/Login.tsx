"use client";

import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const signinData = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signinData?.error) {
        console.log("Incorrect email or password");
        setError("Incorrect email or password")
        setLoading(false);
      } else {
        console.log("login successfully");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        sx={{
          width: "400px",
          margin: "auto",
          marginTop: "60px",
          padding: 4,
          opacity: 0.9,

          borderRadius: "12px",
          backgroundColor: "#121212",
          boxShadow: 6,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            component="h2"
            sx={{ color: "white", fontWeight: "bold", fontSize: "24px" }}
          >
            Welcome!
          </Typography>
        </Box>
        {error && ( <Alert severity="error">{error}</Alert> )}
        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: error ? "red" : "blue" },
                  "&:hover fieldset": { borderColor: error ? "red" : "blue" },
                  "&.Mui-focused fieldset": { borderColor: error ? "red" : "blue" },
                },
                "& .MuiInputLabel-root": { color: "white" },
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                 "& fieldset": { borderColor: error ? "red" : "blue" },
                  "&:hover fieldset": { borderColor: error ? "red" : "blue" },
                  "&.Mui-focused fieldset": { borderColor: error ? "red" : "blue" },
                },
                "& .MuiInputLabel-root": { color: "white" },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Normal login button */}
        <Button type="submit" variant="outlined" sx={{ borderColor: "blue","&:hover": { backgroundColor: "primary.main", color: "white" } }} fullWidth disabled={loading}>
          {loading ? <CircularProgress size="30px" /> : "Login"}
        </Button>

        {/* Divider */}
        <Divider sx={{ color: "white" }}>OR</Divider>

        {/* Google login button */}
        <Button
          type="button"
          variant="outlined"
          fullWidth
          sx={{ borderColor: "blue", color: "blue", fontWeight: "bold" , "&:hover": { backgroundColor: "primary.main", color: "white" }}}
          onClick={() => signIn("google",{ redirect: false }, { callbackUrl: "/dashboard" })}
        >
          Continue with Google
        </Button>

        <Box sx={{ color: "white", textAlign: "center", mt: 1 }}>
          <Typography component="span">Don’t have an account? </Typography>
          <Link
            href="/register"
            style={{ color: "skyblue", textDecoration: "none" }}
          >
            Register here
          </Link>
        </Box>
      </Stack>
    </form>
  );
};

export default Login;
