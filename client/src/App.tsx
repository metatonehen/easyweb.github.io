import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Courses from "@/pages/courses/index";
import CourseCategory from "@/pages/courses/[category]";
import CourseDetails from "@/pages/courses/details/[id]";
import Services from "@/pages/services/index";
import ServiceType from "@/pages/services/[type]";
import ServiceBooking from "@/pages/services/booking/[id]";
import Blog from "@/pages/blog/index";
import BlogPost from "@/pages/blog/[id]";
import Events from "@/pages/events";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Membership from "@/pages/membership";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:category" component={CourseCategory} />
        <Route path="/courses/details/:id" component={CourseDetails} />
        <Route path="/services" component={Services} />
        <Route path="/services/:type" component={ServiceType} />
        <Route path="/services/booking/:id" component={ServiceBooking} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route path="/events" component={Events} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/membership" component={Membership} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
