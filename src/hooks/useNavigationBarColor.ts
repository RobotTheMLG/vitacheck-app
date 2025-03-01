import * as NavigationBar from "expo-navigation-bar";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function useNavigationBarColor(color: string) {
  useFocusEffect(
    useCallback(() => {
      NavigationBar.setBackgroundColorAsync(color);
    }, [color])
  );
}
