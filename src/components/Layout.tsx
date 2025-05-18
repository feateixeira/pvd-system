import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { LogOut, ShoppingBag, BarChart3, PackageCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-pdv-orange text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={24} />
            <h1 className="text-xl font-bold">PDV System</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block">
              Olá, {currentUser.displayName}
            </span>
            <Button variant="outline" size="sm" onClick={logout} className="text-white border-white hover:text-pdv-orange hover:bg-white">
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
          </div>
        </div>
        
        <nav className="bg-pdv-light-orange">
          <div className="container mx-auto px-4 py-1">
            <ul className="flex space-x-4">
              <li>
                <Link 
                  to="/pdv" 
                  className={`text-white hover:text-pdv-secondary py-1 px-2 rounded ${
                    location.pathname === "/pdv" ? "bg-white/20" : ""
                  }`}
                >
                  <ShoppingBag className="inline-block mr-1" size={16} /> 
                  PDV
                </Link>
              </li>
              <li>
                <Link 
                  to="/relatorios" 
                  className={`text-white hover:text-pdv-secondary py-1 px-2 rounded ${
                    location.pathname === "/relatorios" ? "bg-white/20" : ""
                  }`}
                >
                  <BarChart3 className="inline-block mr-1" size={16} /> 
                  Relatórios
                </Link>
              </li>
              <li>
                <Link 
                  to="/estoque" 
                  className={`text-white hover:text-pdv-secondary py-1 px-2 rounded ${
                    location.pathname === "/estoque" ? "bg-white/20" : ""
                  }`}
                >
                  <PackageCheck className="inline-block mr-1" size={16} /> 
                  Estoque
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-gray-200 py-4 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Sistema PDV - Todos os direitos reservados DESENVOLVIDO POR @signbytex<a href="https://www.linkedin.com/in/feateixeira/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700"> Fellipe Teixeira</a></p>
      </footer>
    </div>
  );
};

export default Layout;
