import { Card, CardContent, Typography } from "@mui/material";
import { OrderProps } from "../../../Config/interface";
import { useMemo } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
const COLORS = ["#4caf50", "#ffeb3b", "#2196f3", "#f44336", "#3f4040"];

export default function OrderStatusPieChart({
  orderData,
}: {
  orderData: OrderProps[];
}) {
  const orderStatusMap = useMemo(() => {
    return new Map<string, number>([
      ["DELIVERED", 0],
      ["PROCESSING", 0],
      ["SHIPPING", 0],
      ["CANCELED", 0],
      ["RETURN", 0],
    ]);
  }, [orderData]);

  const storeOrderStatus = useMemo(() => {
    const total = orderData.reduce((sum, eachOrder) => {
      orderStatusMap.set(
        eachOrder.orderStatus,
        (orderStatusMap.get(eachOrder.orderStatus) || 0) + 1
      );

      return sum + 1;
    }, 0);
    const arr = Array.from(orderStatusMap.entries());
    return arr.map((each, index) => {
      return {
        id: index,
        value: each[1],
        label: `${each[0]} (${((each[1] / total) * 100).toFixed(2)}%)`,
        color: COLORS[index % COLORS.length],
      };
    });
  }, [orderData]);

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Status Overview
        </Typography>
        <PieChart
          series={[
            {
              data: storeOrderStatus,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={600}
          height={200}
          viewBox={{
            x: 150,
          }}
        />
      </CardContent>
    </Card>
  );
}
