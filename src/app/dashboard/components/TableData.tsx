"use client";

import React from "react";
import { Box, TableCell, TableRow, useTheme } from "@mui/material";
import Table from "@/app/component/Table";
import { getTableRowNo } from "@/utils/Table";
import { slate } from "@/theme/Color";
import { formatDate } from "@/utils/Date";
import Link from "next/link";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type JobApplication = {
  id: number;
  company: string;
  position: string;
  status: string;
  salary: string;
  appliedDate: string;
  jobLink: string;
  notes: string;
};

type TableHeaderDataType = {
  text: string;
  style: {
    width: string;
    textAlign?: "left" | "right" | "center";
  };
};

const tableHeaderData: TableHeaderDataType[] = [
  { text: "No", style: { width: "5%" } },
  { text: "Company", style: { width: "12%" } },
  { text: "Position", style: { width: "10%" } },
  { text: "Status", style: { width: "8%" } },
  { text: "Salary", style: { width: "10%" } },
  { text: "Applied Date", style: { width: "12%" } },
  { text: "Resume", style: { width: "10%" } },
  { text: "Notes", style: { width: "12%" } },
  { text: "", style: { width: "5%" } },
];

const Option = [
  {
    lable: "Edit",
    key: "edit",
  },
  {
    lable: "Delete",
    key: "delete",
  },
];

interface JobTableProps {
  data?: JobApplication[];
  setUpdateForm: (value: { open: boolean }) => void;
  open: boolean;
}

const rowsPerPage = 5;

const JobTable = ({ data = [], setUpdateForm, open }: JobTableProps) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(1); // 1-based page
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openOption = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption = (key: string) => {
    handleClose(); // close menu

    if (key === "edit") {
      setUpdateForm({ open: true });
    }

    if (key === "delete") {
      console.log("delete clicked");
    }
  };

  // Ensure page is valid when data length changes
  React.useEffect(() => {
    const maxPage = Math.max(3, Math.ceil((data?.length ?? 0) / rowsPerPage));
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [data, page]);

  // Safe slicing (1-based page)
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = (data ?? []).slice(start, end);

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        boxShadow: 4,
        backgroundColor:
          theme.palette.mode === "dark" ? slate[800] : "transparent",
      }}
    >
      <Table
        headerData={tableHeaderData}
        totalLength={data.length}
        page={page}
        onChangePage={(newPage: number) => setPage(newPage)}
      >
        {paginatedData.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell align="left" sx={{ fontSize: 20 }}>
              {getTableRowNo(page, index)}
            </TableCell>
            <TableCell sx={{ fontSize: 20 }}>{row.company}</TableCell>
            <TableCell sx={{ fontSize: 20 }}>{row.position}</TableCell>
            <TableCell sx={{ fontSize: 20 }}>{row.status}</TableCell>
            <TableCell sx={{ fontSize: 20 }}>{row.salary}</TableCell>
            <TableCell sx={{ fontSize: 20 }}>
              {formatDate(row.appliedDate, "short")}
            </TableCell>
            <TableCell sx={{ fontSize: 20 }}>
              {row.jobLink && (
                <Link
                  href={`/uploads/${row.jobLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </Link>
              )}
            </TableCell>
            <TableCell sx={{ fontSize: 20 }}>{row.notes}</TableCell>
            <TableCell sx={{ fontSize: 20 }}>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={openOption}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {Option.map((o, i) => (
                  <MenuItem
                    onClick={() => handleOption(o.key)}
                    sx={{ width: "200px", p: 1 }}
                  >
                    {o.lable}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Box>
  );
};

export default JobTable;
