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
        <title>Nombre Persona Demo Analista | TrueNAS SysAdmin · Selling One</title>
        <meta name="description" content="CV digital de Nombre Persona Demo Analista: TrueNAS, ZFS, RAID-Z, SMB/NFS, snapshots, respaldos 3-2-1, WireGuard y DigitalOcean." />
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
