import React from 'react';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';
import MainRouter from './system/MainRouter';
import CustomLayout from './modules/layout/Layout';
import Theme from './system/Theme';
import store from './system/store';

const GlobalStyle = createGlobalStyle`
  * {
    color: ${({ theme }) => get(theme, 'colors.text')}
  }

  body {
    background-color: white;
    font-size: 14px;
  }

  p {
    margin: 0;
  }
`;


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Theme>
          <CustomLayout>
            <MainRouter />
          </CustomLayout>
        </Theme>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
