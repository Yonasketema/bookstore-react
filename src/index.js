import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { UserProvider } from "./context/user-context";
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);

reportWebVitals();
