import { motion } from "framer-motion";
import { Boxes, Clock, Cloud, HardDrive, Activity, Route } from "lucide-react";
import labTerminal from "@/assets/lab-terminal.jpg";
import { useStudent } from "@/hooks/useStudent";

const highlights = [
  {
    icon: Boxes,
    title: "Orquestación declarativa",
    desc: "Manifiestos versionados, controladores, probes, rolling updates y rollback: el estado deseado como única fuente de verdad.",
  },
  {
    icon: Cloud,
    title: "Multi-nube real",
    desc: "El mismo workload sobre k3s autoadministrado, DOKS en DigitalOcean y GKE en GCP, comparando costo, control y operación.",
  },
  {
    icon: HardDrive,
    title: "Estado y almacenamiento",
    desc: "LVM en los nodos, PV/PVC, StorageClass y provisioners CSI para correr cargas con estado sin perder datos.",
  },
  {
    icon: Activity,
    title: "Observabilidad de primera clase",
    desc: "Prometheus + Grafana desde el día uno: métricas, PromQL, alertas y dashboards que sustentan decisiones de capacidad.",
  },
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
            Kubernetes &amp; Cloud Native Infrastructure
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            El programa donde <span className="font-semibold text-foreground">{student.fullName}</span> aprendió
            a diseñar, desplegar y operar clústeres de Kubernetes en producción: desde k3s sobre
            nodos RHEL hasta plano de control gestionado en DigitalOcean y GCP.
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
              alt="Terminal operando un clúster de Kubernetes durante un laboratorio del curso"
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-foreground/60 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8">
              <Route className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                No es teoría de YAML: es una guardia de SRE simulada
              </h3>
              <p className="text-white/80 mt-3 leading-relaxed">
                Cada módulo arranca con un síntoma real: pods en CrashLoopBackOff, un PVC en Pending
                porque falta StorageClass, un Ingress que devuelve 502 o una alerta de Prometheus
                disparada a las 3 a.m. Aprobar exige diagnosticar con evidencia, corregir con
                manifiestos y documentar el post-mortem.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["k3s", "DOKS", "GKE", "Ingress NGINX", "PV/PVC", "StorageClass", "Prometheus", "Grafana", "Cloudflare"].map((t) => (
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
                sobre clústeres reales — autoadministrados y gestionados — y 20% teoría. El resultado
                es un perfil que sabe leer un <code className="font-mono text-primary">kubectl describe</code> y
                un panel de Grafana antes de tocar nada.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
