"use client";

import React from "react";
import {
  Box,
  TableCell,
  TableRow,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@/app/component/Table";
import { getTableRowNo } from "@/utils/Table";
import { slate } from "@/theme/Color";
import { formatDate } from "@/utils/Date";
import Link from "next/link";

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

const optionItems = [
  { label: "Edit", key: "edit" },
  { label: "Delete", key: "delete" },
];

interface JobTableProps {
  data?: JobApplication[];
  setUpdateForm: (value: { open: boolean }) => void;
  setSelected: (value: any) => void;
  setOpenComfirmedBox: (value: boolean)=>void;
}

const rowsPerPage = 5;

const statusColors: Record<string, string> = {
    REJECTED: "red",
    OFFER: "green",
    APPLIED: "skyblue",
    INTERVIEW: "orange",
  };

export default function JobTable({
  data = [],
  setUpdateForm,
  setSelected,
  setOpenComfirmedBox
}: JobTableProps) {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);

  // Menu controls
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = React.useState<number | null>(null);

  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleOption = (key: string, row: JobApplication) => {
    handleMenuClose();

    if (key === "edit") {
      setUpdateForm({ open: true });
      setSelected(row);
    }

    if (key === "delete") {
      setSelected(row);
      setOpenComfirmedBox(true)
    }
  };

  // Pagination fix — always compute correct maxPage
  React.useEffect(() => {
    const maxPage = Math.ceil((data?.length ?? 0) / rowsPerPage) || 1;

    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [data, page]);

  // Slice data for pagination (1-based)
  const start = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(start, start + rowsPerPage);

  
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
            <TableCell sx={{ fontSize: 20, color: statusColors[row.status] || "inherit", }}>{row.status}</TableCell>
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

            {/* Menu Button */}
            <TableCell sx={{ fontSize: 20 }}>
              <IconButton onClick={(e) => handleMenuOpen(e, row.id)}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={openMenu && menuRowId === row.id}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {optionItems.map((o) => (
                  <MenuItem
                    key={o.key}
                    onClick={() => handleOption(o.key, row)}
                    sx={{ width: "200px", p: 1 }}
                  >
                    {o.label}
                  </MenuItem>
                ))}
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Box>
  );
}
