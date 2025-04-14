import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { OrderProps } from "../../../Config/interface";
import { getStatusStyle } from "../../../Config/function";

export default function RecentOrdersTable({
  orderData,
}: {
  orderData: OrderProps[];
}) {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Orders
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.slice(0, 5).map((eachOrder) => (
              <TableRow key={eachOrder.orderId}>
                <TableCell>{eachOrder.orderId}</TableCell>
                <TableCell>{eachOrder.name}</TableCell>
                <TableCell>{eachOrder.orderDate}</TableCell>
                <TableCell>
                  <Chip
                    label={eachOrder.orderStatus}
                    size="small"
                    className={getStatusStyle(eachOrder.orderStatus)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
