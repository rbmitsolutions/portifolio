import React, { useState } from "react";

//styles
import { GlobalStyle } from "@src/styles/GlobalStyle";
import dark from "@src/styles/theme/dark";
import light from "@src/styles/theme/light";
import { DefaultTheme, ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: any): JSX.Element {
  const [theme, setTheme] = useState<DefaultTheme>(light);
  const Layout = Component.layout || (({ children }: any) => <>{children}</>);

  function toggleTheme() {
    // setCookie(
    //   null,
    //   "rbmitsolutions.theme",
    //   JSON.stringify(theme.title === "light" ? dark : light),
    //   {
    //     maxAge: 30 * 60 * 24,
    //   }
    // );

    setTheme(theme.title === "light" ? dark : light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout toggleTheme={toggleTheme}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
