import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const columns = [
  { id: "name", label: "Tên", minWidth: 100 },
  {
    id: "orderNums",
    label: "Số đơn hàng",
    minWidth: 30,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paidPrice",
    label: "Tổng tiền thanh toán",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ipAddress",
    label: "Địa chỉ ip",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, orderNums, paidPrice, ipAddress) {
  return { name, orderNums, paidPrice, ipAddress };
}

const rows = [
  createData("John Smith", 12345, 45.99, "192.168.1.1"),
  createData("Jane Doe", 67890, 20.0, "10.0.0.1"),
  createData("Bob Johnson", 54321, 99.99, "172.16.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
  createData("Alice Williams", 98765, 69.99, "192.168.0.1"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (row) => {
    console.log("row", row);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      console.log(column.id);
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell id="actions">
                      <Button onClick={() => handleClick(row)}>Xoá</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
