import { useEffect, useState } from "react";
import {
  MedicineProps,
  OrderProps,
  UserProps,
} from "../../../Config/interface";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardOverview from "./DashboardOverview";
import useAxios from "../../../Config/axiosInstance";
import { useBackdrop } from "../../../GlobalUtils/BackdropGlobal";
import RecentOrdersTable from "./RecentOrdersTable";

export default function Overview() {
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [orderData, setOrderData] = useState<OrderProps[]>([]);
  const [medicineData, setMedicineData] = useState<MedicineProps[]>([]);
  const axiosInstance = useAxios();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  useEffect(() => {
    async function getAllData() {
      try {
        showBackdrop();
        const [userRes, orderRes, medicineRes] = await Promise.all([
          axiosInstance.get("/clients"),
          axiosInstance.get("order/getAllOrders"),
          axiosInstance.get("/medicines/getAllMedicines"),
        ]);
        setUserData(userRes.data.result);
        setOrderData(orderRes.data.result);
        setMedicineData(medicineRes.data.result);
    
      } catch (error) {
        console.error("Error getting data for overview dashboard", error);
      } finally {
        hideBackdrop();
      }
    }
    getAllData();
  }, []);
  return (
    <div className="space-y-1 bg-white">
      <DashboardOverview
        users={userData}
        medicines={medicineData}
        orders={orderData}
      />
      {/* <DashboardAnalytics orders={orderData} /> */}
      <RecentOrdersTable />
    </div>
  );
}
