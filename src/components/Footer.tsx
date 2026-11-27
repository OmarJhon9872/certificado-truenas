import { Github, Linkedin, Mail, ExternalLink, Terminal } from "lucide-react";
import { useStudent } from "@/hooks/useStudent";

const Footer = () => {
  const student = useStudent();

  return (
    <footer id="contacto" className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold">{student.shortName}</h3>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Certificado en <span className="text-white font-semibold">Kubernetes &amp; Cloud Native Infrastructure</span> por
              Selling One. Buscando mi siguiente reto operando plataformas de contenedores en producción.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary-foreground/50">
              Enlaces
            </h4>
            <div className="space-y-3">
              {[
                { label: "Curso", href: "#curso" },
                { label: "Temas", href: "#temas" },
                { label: "Evidencia", href: "#evidencia" },
                { label: "Instructor", href: "#instructor" },
                { label: "Empresa", href: "#empresa" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-primary-foreground/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary-foreground/50">
              Contáctame
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              ¿Eres reclutador o SRE lead? Conversemos sobre cómo puedo aportar a tu plataforma.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Mail, href: "mailto:contacto@ejemplo.com", label: "Enviar email" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: ExternalLink, href: "#", label: "Sitio web personal" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover-scale"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-primary-foreground/40">
          <div>© 2026 {student.shortName} · Certificación Kubernetes &amp; Cloud Native Infrastructure</div>
          <div>Impartido por <span className="text-white/70">Selling One</span> · Instructor: <span className="text-white/70">Ing. TIC's Jonathan Omar</span></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
