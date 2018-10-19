import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      `'Josefin Sans'`,
      `sans-serif`
    ].join(',')
  },
  palette: {
    primary: {
      main: '#FF6663',
    },
    secondary: {
      main: '#00ff00',
    },
  },
})

export default theme
