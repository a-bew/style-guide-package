// themes/theme.ts
export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    textColor: string;
  }
  
export const themes: {[key: string]: Theme} = {
    light: {
        primaryColor: 'white',
        secondaryColor: 'gray',
        tertiaryColor: 'black',
        textColor: 'black'
    },
    dark: {
        primaryColor: 'black',
        secondaryColor: 'darkgray',
        tertiaryColor: 'lightgray',
        textColor: 'white'
    },

    default: {
        primaryColor: '#9d470a',
        secondaryColor: '#ad4c07',
        tertiaryColor: '#f8c5a1',
        textColor: 'black'
    },
    dynamic: {
        primaryColor: '#9d470a',
        secondaryColor: '#ad4c07',
        tertiaryColor: '#f8c5a1',
        textColor: 'black'
    },
}
