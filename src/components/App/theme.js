import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
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
      main: '#edf1f0',
    },
  },
})

export default theme
