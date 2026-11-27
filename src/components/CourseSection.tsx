import { motion } from "framer-motion";
import { Database, Clock, Cloud, KeyRound, LifeBuoy, Route } from "lucide-react";
import labTerminal from "@/assets/lab-terminal.jpg";
import { useStudent } from "@/hooks/useStudent";

const highlights = [
  { icon: Database, title: "Integridad con ZFS", desc: "Pools RAID-Z, checksums, scrubs y datasets con cuotas: los datos se protegen desde el diseño del almacenamiento." },
  { icon: KeyRound, title: "Acceso controlado", desc: "Permisos Linux, ACL avanzadas y servicios SMB/NFS configurados con mínimo privilegio para cada equipo." },
  { icon: LifeBuoy, title: "Recuperación probada", desc: "Snapshots, replicación remota y rsync automatizados bajo la estrategia 3-2-1, con restauraciones cronometradas." },
  { icon: Cloud, title: "Off-site en la nube", desc: "Copias en DigitalOcean conectadas por VPN WireGuard como sitio de recuperación ante desastres." },
];

const CourseSection = () => {
  const student = useStudent();

  return (
    <section id="curso" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge-accent mb-4 inline-block">El curso</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            TrueNAS SysAdmin: Storage, Backup &amp; Disaster Recovery
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            El programa donde <span className="font-semibold text-foreground">{student.fullName}</span> aprendió
            a diseñar almacenamiento confiable con TrueNAS y ZFS, compartirlo de forma segura y
            garantizar que cualquier dato pueda recuperarse ante una falla, un error humano o un ransomware.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            className="relative overflow-hidden rounded-3xl min-h-[320px] bg-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={labTerminal}
              alt="Terminal administrando un servidor TrueNAS durante un laboratorio del curso"
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-foreground/60 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8">
              <Route className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                No es teoría: es una guardia de almacenamiento simulada
              </h3>
              <p className="text-white/80 mt-3 leading-relaxed">
                Cada módulo arranca con un incidente real: un disco degradado en el pool, un share SMB sin
                acceso, un borrado masivo por ransomware o una réplica remota fallida. Aprobar exige
                diagnosticar, restaurar con evidencia y documentar el post-mortem.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["TrueNAS", "ZFS", "RAID-Z", "SMB", "NFS", "ACL", "Snapshots", "rsync", "WireGuard", "DigitalOcean"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                className="card-surface p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-bold text-foreground">{h.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
            <motion.div
              className="card-surface p-6 sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Enfoque 80/20 invertido:</span> 80% laboratorio
                sobre servidores TrueNAS reales y 20% teoría. El resultado es un perfil que sabe leer un{" "}
                <code className="font-mono text-primary">zpool status</code> y probar una restauración antes de dar por bueno un respaldo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
