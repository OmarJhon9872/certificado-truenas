import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, X, Copy, ExternalLink } from "lucide-react";
import { useStudent } from "@/hooks/useStudent";
import { CERTIFICATE_DATE } from "@/data/students";

const CERTIFICATE_ID = "K8S-CNI-2026-SO-8842";
const VERIFICATION_URL = "#";

const CertificateModal = () => {
  const student = useStudent();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);


  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(CERTIFICATE_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silently ignored
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
      >
        <Award className="w-3.5 h-3.5" />
        Verificar certificado
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[calc(100%-2rem)] max-w-md bg-card rounded-3xl border border-border shadow-elegant p-6 md:p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Certificado válido</h3>
                    <p className="text-xs text-muted-foreground">TrueNAS SysAdmin: Storage, Backup &amp; Disaster Recovery</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Certificado emitido a
                  </div>
                  <div className="text-foreground font-semibold">{student.fullName}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{CERTIFICATE_DATE}</div>

                </div>

                <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    ID de verificación
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-sm font-mono text-primary break-all">{CERTIFICATE_ID}</code>
                    <button
                      type="button"
                      onClick={copyId}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Empresa capacitadora
                  </div>
                  <div className="text-foreground font-semibold">Selling One</div>
                  <div className="text-xs text-muted-foreground mt-1">Instructor: Ing. TIC's Jonathan Omar</div>
                </div>
              </div>

              <a
                href={VERIFICATION_URL}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Solicitar validación oficial
              </a>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Comparte este ID con reclutadores para validar tu certificación.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificateModal;
