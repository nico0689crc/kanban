'use client';

import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { paths } from "@/routes/paths";
import Logo from "../Logo";
import NavbarItem from "./NavbarItem";


const Navbar = () => {
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        ...(!isUpToMd && {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        })
      }}
    >
      <Stack 
        sx={{ 
          height: '100%',
          backgroundColor: theme.palette.background.paper, 
          boxShadow: theme.customShadows.card, 
          ...( isUpToMd && { 
            borderRight: `1px solid ${theme.palette.primary.main}`,
            py: 3,
            px: 1
          }),
          ...( !isUpToMd && {
            borderTop: `1px solid ${theme.palette.primary.main}`,
            border: `1px solid ${theme.palette.primary.main}`,
            py: 0.5
          }) 
        }}
        justifyContent='space-between'
      >
        { isUpToMd && <Logo /> }
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          justifyContent={{ xs: 'space-around' }}
          py={{ xs: 1, md: 0 }}
          alignItems='center'
          rowGap={3}
        >
          <NavbarItem href={paths.dashboard.root} label="Kanban" icon="iconoir:kanban-board" />
          <NavbarItem href={paths.dashboard.userProfile} label="Profile" icon="iconoir:user" />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Navbar