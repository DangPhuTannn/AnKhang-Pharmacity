import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./../../css/dashboard.css";
import { Avatar, Grid2 } from "@mui/material";
export default function SideBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="sideBar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Grid2 container spacing={2} className="storeIconRight">
            <Grid2 container spacing={1} className="storeInfor">
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Grid2 container spacing={1} className="storeName">
                <Grid2>Mark</Grid2>
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              </Grid2>
            </Grid2>

            <SettingsIcon className="settingIcon"></SettingsIcon>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
