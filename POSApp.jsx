
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const products = [
  { name: "Cerveza Águila 330ml", mesa: 4000, llevar: 3500 },
  { name: "Cerveza Águila Light 330ml", mesa: 4000, llevar: 3500 },
  { name: "Cerveza Poker 330ml", mesa: 4000, llevar: 3500 },
  { name: "Cerveza Costeña 330ml", mesa: 4000, llevar: 3500 },
  { name: "Cerveza Coronita 210ml", mesa: 4000, llevar: 3500 },
  { name: "Cerveza Club Colombia Dorada 330ml", mesa: 4000, llevar: 3500 },
  { name: "Cerveza Reds 269ml", mesa: 4000, llevar: 3500 },
  { name: "Gatorade 500ml", mesa: 4500, llevar: 4000 },
  { name: "Electrolit 625ml", mesa: 9500, llevar: 9000 },
  { name: "Agua 500ml", mesa: 3000, llevar: 2500 },
  { name: "Agua 250ml", mesa: 2000, llevar: 1500 },
  { name: "Cigarrillo", mesa: 1000, llevar: 1000 },
];

const mesas = Array.from({ length: 10 }, (_, i) => ({
  id: `M${i + 1}`,
  nombre: `Mesa ${i + 1}${i < 6 ? " (Exterior)" : " (Interior)"}`,
}));

export default function POSApp() {
  const [pedidos, setPedidos] = useState({});
  const [modo, setModo] = useState("mesa");

  const agregarProducto = (mesaId, producto) => {
    setPedidos((prev) => {
      const mesa = prev[mesaId] || [];
      return {
        ...prev,
        [mesaId]: [...mesa, producto],
      };
    });
  };

  const calcularTotal = (items) => items.reduce((acc, item) => acc + item[modo], 0);

  const cerrarCuenta = (mesaId) => {
    setPedidos((prev) => ({ ...prev, [mesaId]: [] }));
  };

  return (
    <div className="p-4 space-y-6">
      <Tabs value={modo} onValueChange={setModo} className="w-full">
        <TabsList>
          <TabsTrigger value="mesa">Consumo en Mesa</TabsTrigger>
          <TabsTrigger value="llevar">Para Llevar / Domicilio</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mesas.map((mesa) => {
          const items = pedidos[mesa.id] || [];
          const total = calcularTotal(items);
          return (
            <Card key={mesa.id} className="rounded-2xl shadow-md">
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{mesa.nombre}</h2>
                <div className="grid grid-cols-2 gap-2">
                  {products.map((prod) => (
                    <Button
                      key={prod.name}
                      variant="outline"
                      onClick={() => agregarProducto(mesa.id, prod)}
                    >
                      {prod.name}
                    </Button>
                  ))}
                </div>
                <div className="pt-2 text-sm">
                  <p><strong>Productos:</strong> {items.length}</p>
                  <p><strong>Total:</strong> ${total.toLocaleString()}</p>
                  {items.length > 0 && (
                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={() => cerrarCuenta(mesa.id)}
                    >
                      Cerrar Cuenta
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
