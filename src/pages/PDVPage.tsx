import { useState } from "react";
import { usePDV } from "../context/PDVContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog } from "../components/ui/dialog";
import { PaymentMethod, Product } from "../types";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "../components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SauceSelection } from "../components/SauceSelection";
import { DrinkBrandsModal } from "../components/DrinkBrandsModal";
import { Printer, ShoppingCart } from "lucide-react";
import ProductGrid from "@/components/pdv/ProductGrid";
import CartItem from "@/components/pdv/CartItem";
import CustomerInfo from "@/components/pdv/CustomerInfo";
import CheckoutDialog from "@/components/pdv/CheckoutDialog";
import { categoryItems } from "@/data/products";

const PDVPage = () => {
  const { 
    products, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartItemQuantity, 
    updateCartItemObservation, 
    getCartTotal, 
    finalizeSale,
    isDelivery,
    setIsDelivery,
    customerName,
    setCustomerName,
    deliveryAddress,
    setDeliveryAddress
  } = usePDV();
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("dinheiro");
  const [observation, setObservation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [sauceDialogOpen, setSauceDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drinkDialogOpen, setDrinkDialogOpen] = useState(false);
  const [selectedDrinkType, setSelectedDrinkType] = useState<string | null>(null);

  const handleFinalizeSale = () => {
    finalizeSale(
      paymentMethod, 
      observation,
      customerName,
      deliveryAddress,
      isDelivery
    );
    setIsCheckoutOpen(false);
    setPaymentMethod("dinheiro");
    setObservation("");
    toast.success("Venda finalizada com sucesso!");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleProductClick = (product: Product) => {
    const isHamburger = product.name.includes("Na Brasa") && 
      !product.name.includes("Batata") && 
      !product.category?.includes("molhos");
      
    const isChickenBurger = product.name.includes("Frango") && 
      !product.name.includes("Pote") &&
      !product.category?.includes("molhos");
      
    const isChickenPot = product.name.includes("Frango no Pote");
      
    const isDrink = ["Refrigerante Lata", "Refrigerante 600ml", "Refrigerante 2L", "Suco 1L"].includes(product.name);
    
    if (isHamburger || isChickenBurger || isChickenPot) {
      setSelectedProduct(product);
      setSauceDialogOpen(true);
    } else if (isDrink) {
      setSelectedDrinkType(product.name);
      setDrinkDialogOpen(true);
    } else {
      addToCart(product);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || 
      categoryItems[activeCategory as keyof typeof categoryItems]?.some(item => product.name.includes(item));
    
    if (product.name.includes("Molho")) return false;
    if (product.brand) return false;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="col-span-2">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-800">Na Brasa - Produtos</h2>
            <div className="w-64">
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <Tabs defaultValue="todos" className="w-full" onValueChange={(value) => setActiveCategory(value === "todos" ? null : value)}>
            <TabsList className="w-full justify-start mb-4 overflow-x-auto">
              <TabsTrigger value="todos" className="px-4">Todos</TabsTrigger>
              <TabsTrigger value="hamburgueres" className="px-4">Hamburgueres</TabsTrigger>
              <TabsTrigger value="batatas" className="px-4">Batatas</TabsTrigger>
              <TabsTrigger value="frango" className="px-4">Frango</TabsTrigger>
              <TabsTrigger value="bebidas" className="px-4">Bebidas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="mt-0">
              <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
            </TabsContent>
            {Object.entries(categoryItems).filter(([category]) => category !== "molhos").map(([category, _]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      {/* Cart Section */}
      <div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center text-gray-800">
              <ShoppingCart className="mr-2" size={20} /> 
              Carrinho
            </h2>
            <span className="text-sm text-gray-500">
              {cart.length} {cart.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
          
          <CustomerInfo 
            customerName={customerName}
            setCustomerName={setCustomerName}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            isDelivery={isDelivery}
            setIsDelivery={setIsDelivery}
            formatPrice={formatPrice}
          />
          
          <ScrollArea className="h-[calc(100vh-500px)] pr-4">
            {cart.length > 0 ? (
              <div className="space-y-3">
                {cart.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.sauces?.map(s => s.id).join('-')}`}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateCartItemQuantity}
                    onUpdateObservation={updateCartItemObservation}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="mx-auto mb-2" size={24} />
                <p>Seu carrinho está vazio</p>
              </div>
            )}
          </ScrollArea>
          
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">Total</span>
              <span className="font-bold text-xl text-pdv-orange">
                {formatPrice(getCartTotal())}
              </span>
            </div>
            
            <Button 
              className="w-full bg-pdv-orange hover:bg-pdv-light-orange"
              onClick={() => setIsCheckoutOpen(true)}
              disabled={cart.length === 0}
            >
              <Printer className="mr-2" size={18} />
              Imprimir Pedido
            </Button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <CheckoutDialog
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          observation={observation}
          setObservation={setObservation}
          customerName={customerName}
          deliveryAddress={deliveryAddress}
          isDelivery={isDelivery}
          total={getCartTotal()}
          formatPrice={formatPrice}
          onClose={() => setIsCheckoutOpen(false)}
          onPrint={handleFinalizeSale}
        />
      </Dialog>
      
      <SauceSelection 
        isOpen={sauceDialogOpen} 
        onClose={() => {
          setSauceDialogOpen(false);
          setSelectedProduct(null);
        }} 
        product={selectedProduct} 
      />
      
      <DrinkBrandsModal
        isOpen={drinkDialogOpen}
        onClose={() => {
          setDrinkDialogOpen(false);
          setSelectedDrinkType(null);
        }}
        drinkType={selectedDrinkType}
      />
    </div>
  );
};

export default PDVPage;
