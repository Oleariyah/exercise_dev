import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme } from "@material-ui/core/";
import {red, amber} from "@material-ui/core/colors";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: amber[500]
    },
    type:'dark'
  },
  spacing:{
    unit: 10
  }
});


ReactDOM.render(
 
    <ApolloProvider client={client} >
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>,
     
  document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
