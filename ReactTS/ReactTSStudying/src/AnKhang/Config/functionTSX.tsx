
import { confirmDialog } from "primereact/confirmdialog";
export const showConfirmDialog = ({
  message,
  accept = () => {},
  reject = () => {},
  header = "Confirmation",
  icon = "pi pi-exclamation-triangle",
}) => {
  confirmDialog({
    message,
    header,
    icon,
    accept,
    reject,
  });
};
