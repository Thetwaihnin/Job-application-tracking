import { Box } from "@mui/material";
import Register from "./register/Register"

const Page = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/halloweenHd.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Register />
    </Box>
  );
};

export default Page;
