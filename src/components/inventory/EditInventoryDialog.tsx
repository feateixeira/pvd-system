
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InventoryItem } from "@/types";
import { toast } from "@/components/ui/sonner";

interface EditInventoryDialogProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: InventoryItem) => void;
}

interface FormValues {
  quantity: number;
}

const EditInventoryDialog: React.FC<EditInventoryDialogProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      quantity: item?.quantity || 0,
    },
  });

  React.useEffect(() => {
    if (item) {
      form.reset({
        quantity: item.quantity,
      });
    }
  }, [form, item]);

  const handleSubmit = (values: FormValues) => {
    if (!item) return;
    
    const updatedItem: InventoryItem = {
      ...item,
      quantity: Number(values.quantity),
    };
    
    onSave(updatedItem);
    toast.success("Estoque atualizado com sucesso!");
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar Estoque: {item.name}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Quantidade</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      step="0.01"
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="text-sm text-gray-500">
              <p>Quantidade mínima: {item.minQuantity || 'Não definida'}</p>
              <p>Unidade: {item.unit}</p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventoryDialog;
