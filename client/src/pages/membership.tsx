import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MembershipPlan } from "@shared/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import React, { useState, useEffect } from "react";

export default function MembershipPage() {
  const { toast } = useToast();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  
  const { data: membershipPlans, isLoading, error } = useQuery({
    queryKey: ["/api/membership-plans"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/membership-plans");
      return response.json() as Promise<MembershipPlan[]>;
    }
  });
  
  // Usamos useEffect para mostrar toast de error solo una vez
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los planes de membresía",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="cosmic-bg font-poppins text-white min-h-screen overflow-x-hidden">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10">
              <FlowerOfLife size={500} opacity={0.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Planes de Membresía</h1>
            <p className="text-violet-300 text-lg max-w-2xl mx-auto">
              Únete a nuestra comunidad cósmica y accede a beneficios exclusivos con nuestros planes de membresía
            </p>
            
            <div className="flex justify-center mt-10 mb-16">
              <div className="bg-indigo-900/30 p-1 rounded-full">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setBillingInterval("monthly")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                      billingInterval === "monthly"
                        ? "bg-indigo-600 text-white"
                        : "text-violet-300 hover:text-white"
                    }`}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => setBillingInterval("annual")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                      billingInterval === "annual"
                        ? "bg-indigo-600 text-white"
                        : "text-violet-300 hover:text-white"
                    }`}
                  >
                    Anual 
                    {billingInterval === "annual" && (
                      <span className="ml-1.5 inline-flex items-center rounded-full border border-violet-200 bg-indigo-500 px-1.5 py-0.5 text-xs text-white">
                        Ahorro
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="bg-indigo-900/30 h-[600px] rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {membershipPlans?.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`
                    bg-indigo-900/30 backdrop-blur-sm border rounded-xl p-8
                    ${plan.level === "electrum" 
                      ? "border-amber-500/50 ring-2 ring-amber-500/20" 
                      : "border-gray-500/30"}
                  `}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-montserrat font-bold">
                      {plan.name}
                    </h3>
                    {plan.level === "electrum" && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">Premium</Badge>
                    )}
                  </div>
                  
                  <p className="text-violet-300 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold">
                        ${billingInterval === "monthly" 
                          ? parseFloat(plan.monthlyPrice).toFixed(2) 
                          : parseFloat(plan.annualPrice).toFixed(2)}
                      </span>
                      <span className="text-violet-300 ml-2 mb-1">
                        /{billingInterval === "monthly" ? "mes" : "año"}
                      </span>
                    </div>
                    
                    {billingInterval === "annual" && (
                      <div className="text-sm text-violet-300 mt-1">
                        Ahorro del {plan.annualDiscount}% comparado con el pago mensual
                      </div>
                    )}
                  </div>
                  
                  <Separator className="bg-indigo-500/20 my-6" />
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.level === "electrum" 
                        ? "bg-amber-500 hover:bg-amber-600" 
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    Suscribirse
                  </Button>
                  
                  <p className="text-center text-xs text-violet-300 mt-4">
                    Puedes cancelar en cualquier momento
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-montserrat font-bold mb-8">Niveles de Servicio Exclusivos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-indigo-800/30 rounded-lg p-6 border border-amber-500/30">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">Nivel Aurum</h3>
                <p className="text-violet-200 mb-4">
                  Nuestro nivel premium de servicios con acceso a lecturas y análisis más profundos y detallados.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5" />
                    <span>Sesiones extendidas (30 minutos adicionales)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5" />
                    <span>Informe detallado por escrito post-sesión</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5" />
                    <span>1 sesión de seguimiento gratuita (15 min)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5" />
                    <span>Acceso a herramientas y recursos premium</span>
                  </li>
                </ul>
                <div className="mt-4 text-sm text-violet-300">
                  <span className="font-semibold text-amber-400">Miembros Electrum:</span> 20% de descuento en sesiones Aurum
                </div>
              </div>
              
              <div className="bg-indigo-800/30 rounded-lg p-6 border border-gray-400/30">
                <h3 className="text-xl font-semibold text-gray-300 mb-3">Nivel Argentum</h3>
                <p className="text-violet-200 mb-4">
                  Nuestro nivel intermedio con beneficios adicionales a las sesiones estándar.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
                    <span>Sesiones extendidas (15 minutos adicionales)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
                    <span>Resumen por escrito de puntos clave</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
                    <span>Materiales de apoyo digitales</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
                    <span>Prioridad en la programación de citas</span>
                  </li>
                </ul>
                <div className="mt-4 text-sm text-violet-300">
                  <span className="font-semibold text-gray-300">Miembros Platinum:</span> 10% de descuento en sesiones Argentum
                </div>
              </div>
            </div>
            
            <Separator className="bg-indigo-500/20 my-10" />
            
            <h2 className="text-2xl font-montserrat font-bold mb-6">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">¿Cómo funciona la membresía?</h3>
                <p className="text-violet-300">
                  Al suscribirte a uno de nuestros planes, obtendrás acceso a beneficios exclusivos como descuentos en servicios, contenido premium y sesiones especiales. Puedes elegir entre un plan mensual o anual con la posibilidad de cancelar en cualquier momento.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">¿Cuál es la diferencia entre los planes?</h3>
                <p className="text-violet-300">
                  El plan Electrum ofrece todos los beneficios premium, incluyendo un 20% de descuento en todas las sesiones y acceso a sesiones exclusivas de nivel Aurum. El plan Platinum ofrece un 10% de descuento en sesiones de nivel Argentum y beneficios básicos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">¿Puedo cambiar mi plan después?</h3>
                <p className="text-violet-300">
                  Sí, puedes actualizar o cambiar tu plan en cualquier momento desde tu perfil. Si decides actualizar de Platinum a Electrum, el cambio se aplicará inmediatamente y se te cobrará la diferencia prorrateada.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">¿Cómo se aplican los descuentos?</h3>
                <p className="text-violet-300">
                  Los descuentos se aplican automáticamente cuando reservas cualquier servicio estando registrado con tu cuenta de miembro. Verás el precio con descuento aplicado directamente en la página de reserva.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}