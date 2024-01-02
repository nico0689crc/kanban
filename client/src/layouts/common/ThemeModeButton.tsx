import Iconify from "@/components/iconify"
import { useSettingsContext } from "@/components/settings"
import { IconButton } from "@mui/material"

const ThemeModeButton = () => {
  const { themeMode, onUpdate } = useSettingsContext();

  const icon = themeMode === 'dark' ? "ph:sun-bold" : "akar-icons:moon-fill";

  const onChangeThemeMode = () => {
    onUpdate("themeMode", themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton color="primary" onClick={onChangeThemeMode}>
      <Iconify icon={icon} width={25} />
    </IconButton>
  )
}

export default ThemeModeButton;