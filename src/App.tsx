
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PDVProvider } from "./context/PDVContext";
import LoginPage from "./pages/LoginPage";
import PDVPage from "./pages/PDVPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import EstoquePage from "./pages/EstoquePage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <PDVProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route path="/pdv" element={<PDVPage />} />
                  <Route path="/relatorios" element={<RelatoriosPage />} />
                  <Route path="/estoque" element={<EstoquePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PDVProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
