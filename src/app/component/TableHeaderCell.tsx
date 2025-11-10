import TableCell, { TableCellProps } from "@mui/material/TableCell";

export default function TableHeaderCell(props: TableCellProps) {
  return (
    <TableCell sx={{ color: 'skyblue'}} {...props}>
      {props.children}
    </TableCell>
  );
}
