import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey, lightBlue, blue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: blue[700]
    },
    secondary: {
      main: '#E24D4D',
    },
    text: {
      default: grey[400],
      white: '#FFF',
      grey: grey[700],
      lightGrey: grey[300]
    },
    lines: {
      light: grey[800],
      lightBlue: '#024465'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      content: '#ededed',
      drawer: '#212121',
      mainContainer: '#102331',
      paperBlue: '#0C2E45',
      lightGrey: grey[200],
      darkBlue: blue[900]
    },
  },
});

export default theme;
