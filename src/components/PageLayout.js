import { useTheme } from "../ThemeContext";
import { Header } from "./Header";

export function PageLayout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`page theme-${theme}`} data-testid="page-layout">
      <Header />
      <main>
        <div className="page-layout container">{children}</div>
      </main>
    </div>
  );
}
