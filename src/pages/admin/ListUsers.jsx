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
import userApi from "../../api/userApi";

const columns = [
  { id: "name", label: "Tên", minWidth: 100 },
  {
    id: "orderCount",
    label: "Số đơn hàng",
    minWidth: 30,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "imageUrl",
    label: "Avatar",
    minWidth: 100,
    align: "right",
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
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const getUsers = async () => {
      const res = await userApi.getUsersForAdmin();
      setUsers(res);
    };
    getUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (row) => {
    const newUsers = users.filter((user) => user._id !== row._id);
    setUsers(newUsers);
    // call api delete user
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
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column, idx) => {
                      const value = row[column.id];
                      console.log(value);
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
                      <Button onClick={() => handleDelete(row)}>Xoá</Button>
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
