import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Service, Booking, BookingSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import StarField from "@/components/stars/StarField";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  date: Date;
  timeSlot: string;
  message: string;
  serviceId: number;
  serviceLevel: "standard" | "aurum" | "argentum";
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  questionForReading?: string;
};

const ServiceBooking = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const { data: service, isLoading: serviceLoading } = useQuery<Service>({
    queryKey: [`/api/services/${id}`],
  });

  const { data: availableTimeSlots, isLoading: timeSlotsLoading } = useQuery<{time: string, available: boolean}[]>({
    queryKey: [`/api/services/${id}/time-slots`],
  });

  // Estado para los niveles de servicio y precios
  const [selectedServiceLevel, setSelectedServiceLevel] = useState<"standard" | "aurum" | "argentum">("standard");
  
  // Query para obtener los niveles de precio
  const { data: pricingLevels, isLoading: pricingLoading } = useQuery({
    queryKey: [`/api/services/${id}/pricing`],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/services/${id}/pricing`, {});
      return response.json();
    },
    enabled: !!id
  });
  
  const form = useForm<FormValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      date: new Date(),
      timeSlot: "",
      message: "",
      serviceId: parseInt(id || "0"),
      serviceLevel: "standard",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      questionForReading: ""
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest('POST', '/api/bookings', data);
    },
    onSuccess: async () => {
      toast({
        title: "Booking Successful",
        description: "Your session has been scheduled. Check your email for confirmation details.",
        variant: "default",
      });
      
      // Redirect to success page
      setTimeout(() => {
        navigate("/services");
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

  if (serviceLoading) {
    return (
      <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-indigo-800/50 w-1/2 mx-auto rounded"></div>
              <div className="h-4 bg-indigo-800/50 w-3/4 mx-auto rounded"></div>
              <div className="h-96 bg-indigo-800/50 rounded-lg mt-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Service Not Found</h1>
            <p className="text-violet-300 mb-8">The service you're looking for doesn't exist or has been removed.</p>
            <a href="/services" className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-montserrat font-medium transition">
              Browse All Services
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getServiceColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'coaching': return '#3b82f6';
      case 'astrologia': return '#9333ea';
      case 'diseno-humano': return '#f59e0b';
      case 'constelaciones': return '#6366f1';
      case 'sanaciones': return '#14b8a6';
      case 'retiros': return '#f43f5e';
      default: return '#6366f1';
    }
  };

  const serviceColor = getServiceColor(service.type);

  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative text-center mb-12">
            <StarField count={50} />
            <FlowerOfLife size={200} opacity={0.1} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">{t('booking.title')}</h1>
              <p className="text-lg text-violet-300 max-w-2xl mx-auto">
                {t('booking.description', { service: service.title })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-indigo-500/20">
                <h2 className="text-xl font-montserrat font-semibold mb-6">{t('booking.personalInfo')}</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('booking.fullName')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t('booking.fullName')} 
                                {...field} 
                                className="bg-indigo-900/50 border-indigo-500/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('booking.email')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t('booking.email')}
                                type="email" 
                                {...field} 
                                className="bg-indigo-900/50 border-indigo-500/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('booking.phone')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('booking.phone')}
                              {...field} 
                              className="bg-indigo-900/50 border-indigo-500/30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{t('booking.selectDate')}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="bg-indigo-900/50 border-indigo-500/30 text-left font-normal"
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>{t('booking.selectDate')}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-indigo-900" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => 
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('booking.selectTime')}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-indigo-900/50 border-indigo-500/30">
                                  <SelectValue placeholder={t('booking.selectTime')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-indigo-900 border-indigo-500/30">
                                {timeSlotsLoading ? (
                                  <SelectItem value="loading">Loading time slots...</SelectItem>
                                ) : availableTimeSlots && availableTimeSlots.length > 0 ? (
                                  availableTimeSlots.map((slot) => (
                                    <SelectItem key={slot.time} value={slot.time}>
                                      {new Date(slot.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <>
                                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Niveles de servicio */}
                    {(service.type.toLowerCase() === 'astrologia' || service.type.toLowerCase() === 'diseño humano') && (
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="serviceLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('booking.serviceLevel')}</FormLabel>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedServiceLevel(value as "standard" | "aurum" | "argentum");
                                }} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-indigo-900/50 border-indigo-500/30">
                                    <SelectValue placeholder={t('booking.serviceLevel')} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-indigo-900 border-indigo-500/30">
                                  {pricingLoading ? (
                                    <SelectItem value="standard">Cargando niveles de servicio...</SelectItem>
                                  ) : pricingLevels && pricingLevels.length > 0 ? (
                                    pricingLevels.map((level: any) => (
                                      <SelectItem key={level.level} value={level.level}>
                                        {level.level === 'aurum' ? 'Aurum (Premium)' : 
                                         level.level === 'argentum' ? 'Argentum (Intermedio)' : 
                                         'Estándar'} - {level.price}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <>
                                      <SelectItem value="standard">Estándar</SelectItem>
                                      <SelectItem value="aurum">Aurum (Premium)</SelectItem>
                                      <SelectItem value="argentum">Argentum (Intermedio)</SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                              
                              {/* Información adicional sobre los niveles de servicio */}
                              <div className="mt-4 space-y-3">
                                {selectedServiceLevel === 'aurum' && (
                                  <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/30">
                                    <h4 className="text-amber-400 font-semibold mb-1">Nivel Aurum (Premium)</h4>
                                    <ul className="text-sm space-y-1 text-violet-200">
                                      <li>• Sesión extendida (30 minutos adicionales)</li>
                                      <li>• Informe detallado por escrito post-sesión</li>
                                      <li>• 1 sesión de seguimiento gratuita (15 min)</li>
                                      <li>• Acceso a herramientas y recursos premium</li>
                                    </ul>
                                    <p className="text-xs mt-2 text-violet-300">
                                      <span className="text-amber-400">Miembros Electrum:</span> 20% de descuento en este nivel de servicio
                                    </p>
                                  </div>
                                )}
                                
                                {selectedServiceLevel === 'argentum' && (
                                  <div className="p-3 rounded-md bg-gray-500/10 border border-gray-400/30">
                                    <h4 className="text-gray-300 font-semibold mb-1">Nivel Argentum (Intermedio)</h4>
                                    <ul className="text-sm space-y-1 text-violet-200">
                                      <li>• Sesión extendida (15 minutos adicionales)</li>
                                      <li>• Resumen por escrito de puntos clave</li>
                                      <li>• Materiales de apoyo digitales</li>
                                      <li>• Prioridad en la programación de citas</li>
                                    </ul>
                                    <p className="text-xs mt-2 text-violet-300">
                                      <span className="text-gray-300">Miembros Platinum:</span> 10% de descuento en este nivel de servicio
                                    </p>
                                  </div>
                                )}
                                
                                {selectedServiceLevel === 'standard' && (
                                  <div className="p-3 rounded-md bg-indigo-500/10 border border-indigo-500/30">
                                    <h4 className="text-indigo-300 font-semibold mb-1">Nivel Estándar</h4>
                                    <ul className="text-sm space-y-1 text-violet-200">
                                      <li>• Duración regular de sesión</li>
                                      <li>• Análisis básico</li>
                                      <li>• Preguntas y respuestas durante la sesión</li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Campos específicos para astrología y diseño humano */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('booking.birthDate')}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="AAAA-MM-DD" 
                                    {...field} 
                                    className="bg-indigo-900/50 border-indigo-500/30"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="birthTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('booking.birthTime')}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="HH:MM" 
                                    {...field} 
                                    className="bg-indigo-900/50 border-indigo-500/30"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="birthPlace"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('booking.birthPlace')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Ciudad, País" 
                                  {...field} 
                                  className="bg-indigo-900/50 border-indigo-500/30"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="questionForReading"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('booking.questionForReading')}</FormLabel>
                              <FormControl>
                                <textarea 
                                  placeholder={t('booking.questionForReading')}
                                  className="w-full min-h-[100px] rounded-md border border-indigo-500/30 bg-indigo-900/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('booking.additionalInfo')}</FormLabel>
                          <FormControl>
                            <textarea 
                              placeholder={t('booking.additionalInfo')}
                              className="w-full min-h-[120px] rounded-md border border-indigo-500/30 bg-indigo-900/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 rounded-full py-6 text-white font-montserrat font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('booking.processing') : t('booking.confirmBooking')}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-montserrat font-semibold mb-4">{t('booking.summary.title')}</h2>

                  <div className="flex items-center mb-6">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white"
                      style={{ backgroundColor: serviceColor }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold">{service.title}</h3>
                      <p className="text-sm text-violet-300">{service.type}</p>
                    </div>
                  </div>

                  <Separator className="bg-indigo-500/20 my-4" />

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-violet-300">{t('booking.summary.duration')}:</span>
                      <span className="text-white">{service.duration || "60 minutos"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-violet-300">{t('booking.summary.price')}:</span>
                      <span className="text-[#ffc83d] font-semibold">
                        ${typeof service.price === 'number' 
                          ? service.price.toFixed(2) 
                          : parseFloat(service.price as string).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-indigo-800/50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-sm mb-2">{t('booking.summary.whatToExpect')}:</h3>
                    <p className="text-xs text-violet-300">
                      {service.expectationsDescription || t('booking.summary.expectationDescription')}
                    </p>
                  </div>

                  <div className="text-center text-sm text-violet-300">
                    <p>{t('booking.summary.reschedule')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceBooking;
