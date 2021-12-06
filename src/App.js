import React from "react";
import get from "lodash/get";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { BrowserRouter } from "react-router-dom";
import MainRouter from "./system/MainRouter";
import CustomLayout from "./modules/layout/Layout";
import Theme from "./system/Theme";

const GlobalStyle = createGlobalStyle`
  * {
    color: ${({ theme }) => get(theme, "colors.text")}
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <Theme>
          <CustomLayout>
            <MainRouter />
            <ReactQueryDevtools />
          </CustomLayout>
        </Theme>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
