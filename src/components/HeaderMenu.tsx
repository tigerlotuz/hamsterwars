import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

const HeaderMenu = () => {
  const [mobileMenu, setMobileMenu] = useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMenu);

  const handleMobileMenuClose = () => {
    setMobileMenu(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenu(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      className="header-mobile-nav"
      anchorEl={mobileMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/"> Startsida </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/compete"> Tävla </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/gallery"> Galleri </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/statistics"> Statistik </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/history"> Historik</Link>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ background: "#333D79FF" }}>
        <Toolbar className="header-content">
          <div className="header-logo-container">
            <div className="header-logo"></div>
            <h2>HamsterWars</h2>
          </div>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <nav className="header-nav">
              <Link to="/"> Startsida </Link>
              <Link to="/compete"> Tävla </Link>
              <Link to="/gallery"> Galleri </Link>
              <Link to="/statistics"> Statistik </Link>
              <Link to="/history"> Historik</Link>
            </nav>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              color="inherit"
              aria-haspopup="true"
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default HeaderMenu;
