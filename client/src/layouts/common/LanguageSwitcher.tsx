import React from "react";
import Iconify from "@/components/iconify"
import usePopover from "@/hooks/usePopover";
import { useLocales } from "@/locales"
import { IconButton, MenuItem, Popover, Stack } from "@mui/material"

const LanguageSwitcher = () => {
  const { currentLang, allLangs, onChangeLang } = useLocales();
  const { open, onClose, onOpen } = usePopover();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpen(event);
  };
  
  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <Iconify icon={currentLang.icon} sx={{ borderRadius: 0.65, width: 25 }} />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 'auto',
              overflow: 'inherit',
              ml: -1
            },
          },
        }}
      >
        {allLangs.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang.value}
            onClick={() => onChangeLang(option.value)}
          >
            <Stack direction="row" py={1} columnGap={1} alignItems="center">
              <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />
              {option.label}
            </Stack>
          </MenuItem>
        ))}
      </Popover>
    </>
  )
}

export default LanguageSwitcher