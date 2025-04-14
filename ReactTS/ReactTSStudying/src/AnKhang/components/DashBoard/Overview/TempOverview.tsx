import { Box, Grid, TextField } from "@mui/material";
import TopMedicinesTable from "./TopMedicinesTable";
import RecentOrdersTable from "./RecentOrdersTable";
import OrdersLineChart from "./OrdersLineChart";
import OrderStatusPieChart from "./OrderStatusPieChart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker, DateRange } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import KPIRow from "./KPI/KPIRow";
import { OrderProps, UserProps } from "../../../Config/interface";
import useAxios from "../../../Config/axiosInstance";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";

interface Data {
  userData: UserProps[];
  orderData: OrderProps[];
}
export default function TempOverview() {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    dayjs().startOf("year"),
    dayjs(),
  ]);
  const [storeData, setStoreData] = useState<Data>({
    userData: [],
    orderData: [],
  });
  const axiosInstance = useAxios();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  useEffect(() => {
    async function getData() {
      showBackdrop();
      const date = {
        startDate: dateRange[0]?.format("DD/MM/YYYY"),
        endDate: dateRange[1]?.format("DD/MM/YYYY"),
      };
      try {
        const response = await Promise.all([
          axiosInstance.post("/clients/getClientsByDateRange", date),
          axiosInstance.post("/order/getOrdersByDateRange", date),
        ]);
        setStoreData({
          userData: response[0].data.result,
          orderData: response[1].data.result,
        });
      } catch (error) {
        console.error("Error getting data", error);
      } finally {
        hideBackdrop();
      }
    }

    getData();
  }, [dateRange]);
  return (
    <Box
      p={2}
      sx={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div className="flex justify-end">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            slots={{
              textField: TextField,
            }}
            slotProps={{
              textField: ({ position }) => ({
                size: "small",
                label: position === "start" ? "From" : "To",
                sx: { minWidth: 140 },
              }),
            }}
          />
        </LocalizationProvider>
      </div>
      <KPIRow orderData={storeData.orderData} userData={storeData.userData} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <OrdersLineChart orderData={storeData.orderData} />
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderStatusPieChart orderData={storeData.orderData} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TopMedicinesTable orderData={storeData.orderData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentOrdersTable orderData={storeData.orderData} />
        </Grid>
      </Grid>
    </Box>
  );
}
