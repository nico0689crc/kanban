'use client';

import Iconify from "@/components/iconify";
import { Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useActiveLink } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

type NavbarItemProps = {
  icon: string,
  label: string,
  href: string
}

const NavbarItem = ({ icon, label, href } : NavbarItemProps) => {
  const theme = useTheme();
  const isActiveLink = useActiveLink(href, false);

  return (
    <Link 
      component={RouterLink} 
      href={href}
      sx={{
        display: "flex",
        flexDirection: 'column', 
        alignItems: "center", 
        position: 'relative',
        fontWeight: '600',
        textDecoration: 'none',
        color: isActiveLink ? theme.palette.primary.main : 'inherit',
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
          backgroundColor: isActiveLink ? theme.palette.primary.main : theme.palette.background.paper,
          padding: 1,
          borderRadius: '50%',
          color: isActiveLink ? 'white' : 'inherit',
          '&:hover': {
            '.navbar-button-label': {
              opacity: 1,
              width: 'fit-content',
              py: 1,
              pl: 5,
              pr: 2,
            }
          }, 
        }
      }}
    >
      <Iconify icon={icon} sx={{ zIndex: 2 }}></Iconify>
      <Box 
        component="span"
        className="navbar-button-label"
        sx={{
          position: 'relative',
          opacity: 1,
          [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: 0,
            opacity: 0,
            padding: 0,
            backgroundColor: isActiveLink ? theme.palette.primary.main : theme.palette.background.paper, 
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.customShadows.card,
            border: `1px solid ${theme.palette.primary.main}`,
            width: '0px',
            transition: 'all 300ms',
            zIndex: 1
          },
        }}
      >
        {label}
      </Box>
    </Link>
  );
}

export default NavbarItem;