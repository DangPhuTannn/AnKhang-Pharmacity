import { Grid } from "@mui/material";
import { OrderProps, UserProps } from "../../../../Config/interface";
import EachKPI from "./EachKPI";
import { useMemo } from "react";

interface Data {
  userData: UserProps[];
  orderData: OrderProps[];
}

export default function KPIRow({ userData, orderData }: Data) {
  const {
    totalRevenue,
    totalSoldQuantityMedicine,
    totalOrders,
    totalCustomers,
  } = useMemo(() => {
    const totalRevenue =
      orderData
        .reduce((sum, eachOrder) => eachOrder.finalPrice + sum, 0)
        .toLocaleString("vi-VN") + "đ";
    const totalOrders = orderData.length;
    const storeOrderItems = orderData.flatMap(
      (eachOrder) => eachOrder.orderItems
    );
    const totalSoldQuantityMedicine = storeOrderItems.reduce(
      (sum, eachOrderItem) => eachOrderItem.quantity + sum,
      0
    );
    const totalCustomers = userData.length;
    return {
      totalRevenue,
      totalSoldQuantityMedicine,
      totalOrders,
      totalCustomers,
    };
  }, [userData, orderData]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <EachKPI title="Total Revenue" value={totalRevenue} />
      </Grid>
      <Grid item xs={12} md={3}>
        <EachKPI title="Total Orders" value={totalOrders} />
      </Grid>
      <Grid item xs={12} md={3}>
        <EachKPI title="New Customers" value={totalCustomers} />
      </Grid>
      <Grid item xs={12} md={3}>
        <EachKPI
          title="Total Sold Quantity Medicines"
          value={totalSoldQuantityMedicine}
        />
      </Grid>
    </Grid>
  );
}
