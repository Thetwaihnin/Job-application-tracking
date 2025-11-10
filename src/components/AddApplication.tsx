'use client'
import { Box,Button } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (value: boolean)=>void
}

const AddApplication = () => {
  return (
    <Box>
      <Button variant="contained" sx={{fontSize: 24}}>+ Add New Application</Button>
    </Box>
  );
};

export default AddApplication;
