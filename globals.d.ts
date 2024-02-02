import { AppTheme } from "./src/themes/types";

declare module "@react-navigation/native" {
  export function useTheme(): AppTheme;
}
