"use client";

import { Stack, TextField, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const schema = z
  .object({
    name: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .max(30),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmedPassword: z
      .string()
      .min(6, "Confirmed password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords must match",
    path: ["confirmedPassword"],
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // console.log("form data:", data);
    try {
      setLoading(true);
      const response = await axios.post("/api/user", data);
      console.log(response.data.message);
      router.push("/login");
    } catch (error: any) {
      if (error.response?.status === 409) {
        const message = error.response.data.message;

        if (message.includes("email")) {
          setError("email", { type: "manual", message });
        } else if (message.includes("name")) {
          setError("name", { type: "manual", message });
        }
      }
    } finally {
      setLoading(false);
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        sx={{
          width: "500px",
          margin: "auto",
          paddingTop: "50px",
          borderRadius: "8px",
          backgroundColor: "#010101",
          opacity: 0.9,
          boxShadow: 6,
          padding: 3,
          marginTop: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            paddingTop: 4,
            paddingBottom: 2,
          }}
        >
          <Typography variant="body1" component="h2" sx={{ color: "white", fontSize: "24px" }}>
            Welcome!
          </Typography>
        </Box>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "blue",
                  },
                  "&:hover fieldset": {
                    borderColor: "blue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "blue",
                },
              }}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "blue",
                  },
                  "&:hover fieldset": {
                    borderColor: "blue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "blue",
                },
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "blue",
                  },
                  "&:hover fieldset": {
                    borderColor: "blue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "blue",
                },
              }}
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmedPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Confirm Password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "blue",
                  },
                  "&:hover fieldset": {
                    borderColor: "blue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "blue",
                },
              }}
              error={!!errors.confirmedPassword}
              helperText={errors.confirmedPassword?.message}
            />
          )}
        />
        <Button
          type="submit"
          sx={{
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white"
            },
          }}
          variant="outlined"
          disabled={loading}
        >
          {loading ? <CircularProgress size="30px" /> : "Register"}
        </Button>
        {/* <Box component="span" sx={{color: 'white', marginX: "auto", display: "flex",padding: 0, justifyContent: "center"}}>or</Box> */}
        <Box sx={{ color: "white", display: "flex", paddingBottom: 5 }}>
          <Typography component="p">Already have an account?</Typography>
          <Box component="span" sx={{ color: "blue", marginX: 1 }}> 
            <Link href="/login">Login</Link>
          </Box>
          here!
        </Box>
      </Stack>
    </form>
  );
};

export default Register;
