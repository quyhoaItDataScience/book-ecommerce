import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, Container, AvatarGroup, Avatar } from "@mui/material";
import orderApi from "../api/orderApi";
import { useAuthCtx } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import moment from "moment";

function createData(date, status, price) {
  return { date, status, price };
}

const rows = [
  createData(new Date(), false, "200,000VND"),
  createData(new Date(), true, "200,000VND"),
  createData(new Date(), false, "200,000VND"),
  createData(new Date(), false, "200,000VND"),
];

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvKLyHhhD-fvtCy4gcYRs4hVdWJ4xPIHD8g9Lc75hiNPVB-dG9L1CLlQAy5kEbbsWWJ7w&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvKLyHhhD-fvtCy4gcYRs4hVdWJ4xPIHD8g9Lc75hiNPVB-dG9L1CLlQAy5kEbbsWWJ7w&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvKLyHhhD-fvtCy4gcYRs4hVdWJ4xPIHD8g9Lc75hiNPVB-dG9L1CLlQAy5kEbbsWWJ7w&usqp=CAU",
];

export default function OrderListPage() {
  const [orders, setOrders] = React.useState([]);
  const { token } = useAuthCtx();
  const { id: userId } = jwtDecode(token);
  React.useEffect(() => {
    const getOrders = async () => {
      const res = await orderApi.getOrdersByUser(userId);
      console.log(res);
      setOrders(res);
    };
    getOrders();
  }, []);

  return (
    <Container>
      <Box marginY="20px">
        <Box marginY="20px">
          <Typography variant="h5">Đơn hàng đã đặt</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ngày đặt hàng</TableCell>
                <TableCell align="left">Sách</TableCell>
                <TableCell align="left">Tình trạng</TableCell>
                <TableCell align="left">Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">
                    {moment(row?.orderDate).format("DD/MM/YYYY, h:mm a")}
                  </TableCell>
                  <TableCell align="left">
                    <AvatarGroup
                      max={3}
                      sx={{
                        justifyContent: "left",
                      }}
                    >
                      {images?.map((image) => (
                        <Avatar alt="Remy Sharp" src={image} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    {row.status === "Đã xử lý" ? (
                      <Box
                        backgroundColor="green"
                        width="80%"
                        textAlign="center"
                        borderRadius="20px"
                        paddingY="5px"
                      >
                        <Typography color="white">Đã thanh toán</Typography>
                      </Box>
                    ) : (
                      <Box
                        backgroundColor="red"
                        width="80%"
                        textAlign="center"
                        borderRadius="20px"
                        paddingY="5px"
                      >
                        <Typography color="white">Chưa thanh toán</Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.cartItems?.reduce((acc, item) => acc + item.price, 0)}{" "}
                    VND
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
