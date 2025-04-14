import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { OrderProps } from "../../../Config/interface";

export default function OrdersLineChart({
  orderData,
}: {
  orderData: OrderProps[];
}) {
  const orderQuantityMap = new Map<string, number>();

  orderData.forEach((eachOrder) => {
    const orderDate = eachOrder.orderDate.split("/");
    const date = orderDate[1] + "/" + orderDate[2];
    orderQuantityMap.set(date, (orderQuantityMap.get(date) || 0) + 1);
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Total Order By Date
        </Typography>
        <LineChart
          xAxis={[
            { scaleType: "point", data: Array.from(orderQuantityMap.keys()) },
          ]}
          series={[{ data: Array.from(orderQuantityMap.values()) }]}
          width={600}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
