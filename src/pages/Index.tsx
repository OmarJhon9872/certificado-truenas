import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CourseSection from "@/components/CourseSection";
import TopicsSection from "@/components/TopicsSection";
import ToolsSlider from "@/components/ToolsSlider";
import EvidenceSection from "@/components/EvidenceSection";
import InstructorSection from "@/components/InstructorSection";
import CompanySection from "@/components/CompanySection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CV · Kubernetes & Cloud Native Infrastructure | Selling One</title>
        <meta name="description" content="Portafolio profesional certificado en Kubernetes: k3s, DOKS, GKE, Ingress NGINX, PV/PVC, StorageClass, Prometheus y Grafana." />
        <link rel="canonical" href="/" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="profile" />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <CourseSection />
        <TopicsSection />
        <ToolsSlider />
        <EvidenceSection />
        <InstructorSection />
        <CompanySection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
