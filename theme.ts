const sharedColors = {
  azureRadiance: '#007AFF',
  limedSpruce: '#38434D',
  cornflowerBlue: '#6366F1',
  astral: '#2E78B7',
} as const;

export const lightTheme = {
  colors: {
    ...sharedColors,
    typography: '#1A1A1A',
    secondary: '#555555',
    background: '#FCF5C7',
    card1: '#79ADDC', // Previously "Passwords"
    card2: '#FFC09F', // Previously "Notes"
    card3: '#E4FFEA', // Previously "Credit cards"
    card4: '#F4E4FF', // Previously "Secure Notes"
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;

export const darkTheme = {
  colors: {
    ...sharedColors,
    typography: '#ffffff',
    secondary: '#AAAAAA',
    background: '#1a1a1a',
    // card1: '#6b9ac4', // Previously "Passwords"
    // card2: '#97d8c4', // Previously "Notes"
    // card3: '#4059ad', // Previously "Credit cards"
    // card4: '#f4b942', // Previously "Secure Notes"
    card1: '#203A5A', // Previously "Passwords"
    card2: '#5A3A20', // Previously "Notes"
    card3: '#203A2A', // Previously "Credit cards"
    card4: '#3A203A', // Previously "Secure Notes"
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;
