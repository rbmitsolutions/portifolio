import "styled-components";

interface ThemeType {
  title: string;
  colors: {
    primary_100: string;
    primary_90: string;
    primary_75: string;
    primary_50: string;
    primary_25: string;
    primary_0: string;

    purple_100: string;
    purple_75: string;
    purple_50: string;
    purple_25: string;
    purple_0: string;

    green_100: string;
    green_75: string;
    green_50: string;
    green_25: string;
    green_0: string;

    orange_100: string;
    orange_75: string;
    orange_50: string;
    orange_25: string;
    orange_0: string;

    yellow_100: string;
    yellow_75: string;
    yellow_50: string;
    yellow_25: string;
    yellow_0: string;

    red_100: string;
    red_75: string;
    red_50: string;
    red_25: string;
    red_0: string;

    blue_100: string;
    blue_75: string;
    blue_50: string;
    blue_25: string;
    blue_0: string;

    logo_100: string;

    text_100: string;
    text_75: string;
    text_50: string;
    text_25: string;
    text_0: string;
  };
}

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
