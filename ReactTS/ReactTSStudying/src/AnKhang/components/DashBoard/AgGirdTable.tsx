/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MutableRefObject, useMemo } from "react";
import "./../../css/DashBoard/aggrid.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import {
  ModuleRegistry,
  AllEnterpriseModule,
  themeAlpine,
  IntegratedChartsModule,
  LicenseManager,
  ColDef,
  GridApi,
  GetRowIdFunc,
  GridOptions,
} from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
]);
LicenseManager.setLicenseKey(
  "[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076336}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{31 March 2025}____[v3]_[0102]_MTc0MzM3NTYwMDAwMA==c6567fdb808acaba121aed5798506e61"
);

export default function AgGridTable({
  rowData,
  colDefs,
  actionColumnParam,
  gridApiRef,
  getRowId,
  gridOptions,
}: {
  rowData: any[];
  colDefs: ColDef<any>[];
  actionColumnParam: ColDef<any, any>;
  gridApiRef: MutableRefObject<GridApi<any> | null>;
  getRowId: GetRowIdFunc<any>;
  gridOptions?: GridOptions<any>;
}) {
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      headerClass: "bg-[#4cb551] text-white text-[15px]",
      filter: true,
      filterParams: { debounceMs: 500 },
    };
  }, []);

  const onGridReady = (params: { api: GridApi<any> | null }) => {
    gridApiRef.current = params.api;
  };

  const actionColumn: ColDef<any> = useMemo(() => {
    return actionColumnParam;
  }, []);
  return (
    <div style={{ height: "calc(100vh - 78px)", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={[...colDefs, actionColumn]}
        theme={themeAlpine}
        defaultColDef={defaultColDef}
        pagination={true}
        onGridReady={onGridReady}
        paginationPageSize={20}
        paginationPageSizeSelector={[20, 50, 100, 500, 1000]}
        rowSelection={"multiple"}
        getRowId={getRowId}
        gridOptions={gridOptions}
      />
    </div>
  );
}
