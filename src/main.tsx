
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { ThemeProvider } from "./app/components/ui/theme-provider";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <App />
    </ThemeProvider>
  );
  
