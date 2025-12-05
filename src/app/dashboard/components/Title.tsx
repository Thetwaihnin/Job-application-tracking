"use client";
import MultiSegmentCircle from "@/components/CircularProgressBar";
import { slate } from "@/theme/Color";
import { Box, Stack, Typography, useTheme } from "@mui/material";

type JobStatusCounts = {
  APPLIED: number;
  INTERVIEW: number;
  OFFER: number;
  REJECTED: number;
  total: number;
};

type Props = {
  jobStatus?: JobStatusCounts;
};

const Title = ({ jobStatus }: Props) => {
  const theme = useTheme();

  const applied = jobStatus?.APPLIED ?? 0;
  const interview = jobStatus?.INTERVIEW ?? 0;
  const offer = jobStatus?.OFFER ?? 0;
  const rejected = jobStatus?.REJECTED ?? 0;
  const total = jobStatus?.total ?? 0;

  const percent = (value: number) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 6 }}>
      <Box
        sx={{
          p: 2,
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "skyblue",
          borderRadius: "10px",
        }}
      >
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          TOTAL APPLIED
        </Typography>
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
        >
          {jobStatus ? jobStatus.APPLIED : 0}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 3,
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "orange",
          borderRadius: "10px",
        }}
      >
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          INTERVIEW
        </Typography>
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
        >
          {jobStatus ? jobStatus.INTERVIEW : 0}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 3,
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "green",
          borderRadius: "10px",
        }}
      >
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          OFFER
        </Typography>
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
        >
          {jobStatus ? jobStatus.OFFER : 0}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 3,
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          borderRadius: "10px",
        }}
      >
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        >
          REJECT
        </Typography>
        <Typography
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
        >
          {jobStatus ? jobStatus.REJECTED : 0}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 3,
          display: "flex",
          gap: 3,
          // flexDirection: "column",
          borderRadius: 2,
          boxShadow: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.mode === "dark" ? slate[800] : "",
        }}
      >
        <MultiSegmentCircle
          segments={[
            { color: "#2196f3", value: percent(applied) }, // blue
            { color: "#ffeb3b", value: percent(interview) }, // yellow
            { color: "#4caf50", value: percent(offer) }, // green
            { color: "#f44336", value: percent(rejected) }, // red
          ]}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 8, height: 8, backgroundColor: "skyblue" }}></Box>
            <Typography>Applications</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 8, height: 8, backgroundColor: "orange" }}></Box>
            <Typography>Interviews</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 8, height: 8, backgroundColor: "green" }}></Box>
            <Typography>Offers</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 8, height: 8, backgroundColor: "red" }}></Box>
            <Typography>Rejects</Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Title;
