import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderProps } from "../../../Config/interface";

interface MedicineLineChartProps {
  totalQuantity: number;
  totalRevenue: number;
}

export default function TopMedicinesTable({
  orderData,
}: {
  orderData: OrderProps[];
}) {
  const medicineMap = new Map<string, MedicineLineChartProps>();
  orderData.forEach((eachOrder) => {
    eachOrder.orderItems.forEach((eachOrderItem) => {
      const prev = medicineMap.get(eachOrderItem.medicineName) || {
        totalQuantity: 0,
        totalRevenue: 0,
      };
      medicineMap.set(eachOrderItem.medicineName, {
        totalQuantity: prev.totalQuantity + eachOrderItem.quantity,
        totalRevenue: prev.totalRevenue + eachOrderItem.finalPrice,
      });
    });
  });
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top 5 Medicines Sold
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Medicine</TableCell>
              <TableCell align="center">Quantity</TableCell>{" "}
              <TableCell align="center">Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(medicineMap.entries())
              .sort((a, b) => b[1].totalQuantity - a[1].totalQuantity)
              .slice(0, 5)
              .map(([medicineName, data], idx) => (
                <TableRow key={idx}>
                  <TableCell>{medicineName}</TableCell>
                  <TableCell align="center">{data.totalQuantity}</TableCell>
                  <TableCell align="center">
                    {data.totalRevenue.toLocaleString("vi-VN") + "đ"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
