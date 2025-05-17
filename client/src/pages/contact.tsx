import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/stars/StarField";
import FlowerOfLife from "@/components/sacred-geometry/FlowerOfLife";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <div className="cosmic-bg font-poppins text-white overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <StarField count={100} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FlowerOfLife size={300} opacity={0.15} />
          </div>
          
          <div className="container mx-auto z-10 text-center max-w-4xl relative">
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                Connect With Us
              </span>
            </h1>
            <p className="text-lg text-violet-300 mb-8">
              Have questions or looking for guidance? Reach out and let us know how we can assist in your cosmic journey.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-indigo-500/20">
                <h2 className="text-2xl font-montserrat font-semibold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              type="email" 
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
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-indigo-900/50 border-indigo-500/30">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-indigo-900 border-indigo-500/30">
                              <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                              <SelectItem value="course_information">Course Information</SelectItem>
                              <SelectItem value="booking_assistance">Booking Assistance</SelectItem>
                              <SelectItem value="technical_support">Technical Support</SelectItem>
                              <SelectItem value="collaboration">Collaboration Proposal</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share your question or request" 
                              className="min-h-[120px] bg-indigo-900/50 border-indigo-500/30"
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
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information */}
              <div>
                <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-indigo-500/20 mb-8">
                  <h2 className="text-2xl font-montserrat font-semibold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold mb-1">Email</h3>
                        <p className="text-violet-300">info@neogaiam.com</p>
                        <p className="text-violet-300">support@neogaiam.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold mb-1">Phone</h3>
                        <p className="text-violet-300">+1 (555) 123-4567</p>
                        <p className="text-violet-300">Monday - Friday: 9am - 5pm EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold mb-1">Location</h3>
                        <p className="text-violet-300">1234 Cosmic Way</p>
                        <p className="text-violet-300">Universe City, Planet Earth</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-indigo-500/20">
                  <h2 className="text-2xl font-montserrat font-semibold mb-6">Connect With Us</h2>
                  
                  <p className="text-violet-300 mb-6">
                    Follow us on social media to stay updated with our latest courses, events, and cosmic insights.
                  </p>
                  
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-indigo-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-montserrat font-bold mb-12 text-center">Common Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">How quickly will I receive a response?</h3>
                <p className="text-violet-300">
                  We strive to respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate this in your message subject.
                </p>
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">Can I schedule a free consultation?</h3>
                <p className="text-violet-300">
                  Yes! We offer 15-minute free consultations to help determine which of our services would best suit your needs. Please mention "Free Consultation Request" in your message.
                </p>
              </div>
              
              <div className="bg-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-xl font-montserrat font-semibold mb-3">Do you offer services internationally?</h3>
                <p className="text-violet-300">
                  Absolutely. Our online courses and virtual sessions are available worldwide. We adjust scheduling to accommodate different time zones for our global community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="bg-indigo-900/50 backdrop-blur-md rounded-xl p-8 md:p-12 border border-indigo-500/30">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">Stay Connected</h2>
              <p className="text-violet-300 mb-8">
                Subscribe to our newsletter and receive the latest insights, guided meditations, and exclusive content.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow bg-indigo-900/50 border-indigo-500/30"
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 rounded-full px-6 py-2 text-white font-montserrat font-medium whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-violet-300 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>

        {/* Map (Optional - Replace with an actual map in production) */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl overflow-hidden h-[400px] border border-indigo-500/20 flex items-center justify-center">
              <div className="text-center">
                <p className="text-violet-300 mb-2">Map would be displayed here in production.</p>
                <p className="text-violet-300 text-sm">1234 Cosmic Way, Universe City, Planet Earth</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
