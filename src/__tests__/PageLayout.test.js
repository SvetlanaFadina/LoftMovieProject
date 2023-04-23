import { ThemeProvider, THEME } from "../ThemeContext";
import { render, screen } from "@testing-library/react";
import { PageLayout } from "../components/PageLayout";
import "@testing-library/jest-dom";

function renderWithContext(component, { theme = THEME.Light }) {
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  );

  return render(component, { wrapper: Wrapper });
}

test(`render the light styles for light theme`, () => {
  renderWithContext(<PageLayout>body</PageLayout>, { theme: THEME.Light });

  const layoutId = screen.getByTestId("page-layout");

  expect(layoutId).toHaveClass("theme-light");
});
test(`render the dark styles for dark theme`, () => {
  renderWithContext(<PageLayout>body</PageLayout>, { theme: THEME.Dark });

  const layoutId = screen.getByTestId("page-layout");

  expect(layoutId).toHaveClass("theme-dark");
});
