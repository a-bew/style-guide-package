import { useSelector } from 'react-redux';
import { darkenColor } from '@/utils/functions';
import { useTheme } from '@/contexts/ThemeProvider';

const useCurentTheme = () => {
    
      const { color, secondaryColor, setTheme, addNewTheme, resetThemes } = useTheme();

    // const currentThemeName = useSelector((state: any) => state.theme.currentThemeName);

    // const themes = useSelector((state: any) => state.theme.themes);

    // const color = themes[currentThemeName].primaryColor;
    // const secondaryColor = themes[currentThemeName].secondaryColor;

    const darkenedColor = darkenColor(color, 0.1);

    return { color, secondaryColor, darkenedColor }
}

export default useCurentTheme