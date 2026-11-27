import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import labTerminal from "@/assets/lab-terminal.jpg";
import labContainers from "@/assets/lab-containers.jpg";
import labSecurity from "@/assets/lab-security.jpg";
import labNetwork from "@/assets/lab-network.jpg";
import labObservability from "@/assets/lab-observability.jpg";
import { useStudent } from "@/hooks/useStudent";

type Evidence = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  snippet: string;
  outcome: string;
};

const evidences: Evidence[] = [
  {
    title: "Clúster k3s multi-nodo",
    description:
      "Instalación de un servidor k3s y unión de dos agentes sobre nodos RHEL 9, deshabilitando Traefik para instalar Ingress NGINX de forma explícita. Validación de CNI, CoreDNS y taints del nodo de control.",
    image: labTerminal,
    stack: ["k3s", "RHEL 9", "containerd"],
    snippet: "curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC='--disable traefik' sh -",
    outcome: "Clúster operativo en <10 min con kubeconfig distribuido y nodos Ready.",
  },
  {
    title: "DOKS en DigitalOcean",
    description:
      "Provisión de un clúster gestionado con node pool autoescalable, integración con Load Balancer y Block Storage vía CSI, y gestión del kubeconfig con doctl.",
    image: labNetwork,
    stack: ["DOKS", "doctl", "autoscaling"],
    snippet: "doctl kubernetes cluster create prod --count 3 --auto-scale --min-nodes 3 --max-nodes 6",
    outcome: "Escalado horizontal validado bajo carga sintética sin downtime.",
  },
  {
    title: "GKE y GCP",
    description:
      "Clúster en Google Kubernetes Engine con IAM por rol, VPC dedicada y Workload Identity. Comparativa operativa entre GKE Autopilot y Standard frente al clúster autoadministrado.",
    image: labContainers,
    stack: ["GCP", "GKE", "IAM"],
    snippet: "gcloud container clusters get-credentials prod --region us-central1",
    outcome: "Documento comparativo de costo/control entre las tres plataformas.",
  },
  {
    title: "Ingress NGINX y TLS",
    description:
      "Exposición de servicios por host y path con Ingress NGINX, terminación TLS, annotations de rewrite y rate limiting. Diagnóstico de 502/504 revisando endpoints y readiness.",
    image: labNetwork,
    stack: ["ingress-nginx", "TLS", "L7"],
    snippet: "kubectl -n ingress-nginx logs deploy/ingress-nginx-controller -f",
    outcome: "Enrutamiento L7 estable con certificado válido y health checks correctos.",
  },
  {
    title: "DNS interno con CoreDNS",
    description:
      "Descubrimiento de servicios dentro del clúster, pruebas de resolución FQDN, políticas dnsPolicy y depuración de fallos de resolución desde un pod efímero.",
    image: labSecurity,
    stack: ["CoreDNS", "dnsPolicy"],
    snippet: "kubectl run dnsutils --rm -it --image=busybox -- nslookup api.default.svc.cluster.local",
    outcome: "Resolución interna verificada y search domains ajustados.",
  },
  {
    title: "Gestión DNS en Cloudflare",
    description:
      "Zona delegada a Cloudflare, registros proxied vs. DNS-only, certificado Origin CA hacia el Ingress y reglas de caché para activos estáticos del clúster.",
    image: labNetwork,
    stack: ["Cloudflare", "Origin CA"],
    snippet: "dig +short app.ejemplo.com @1.1.1.1",
    outcome: "TLS extremo a extremo y superficie de origen oculta tras el proxy.",
  },
  {
    title: "Volúmenes efímeros y ConfigMaps",
    description:
      "Montaje de emptyDir para caché compartida entre contenedores, configMaps y secrets como volúmenes, y patrón sidecar para procesar archivos generados por la app.",
    image: labContainers,
    stack: ["emptyDir", "configMap", "sidecar"],
    snippet: "kubectl get pod app -o jsonpath='{.spec.volumes[*].name}'",
    outcome: "Configuración desacoplada del artefacto y recargable sin rebuild.",
  },
  {
    title: "PV, PVC y StatefulSet",
    description:
      "Aprovisionamiento estático y dinámico, binding PV/PVC, accessModes, reclaimPolicy y volumeClaimTemplates para desplegar una base de datos con estado persistente.",
    image: labTerminal,
    stack: ["PV", "PVC", "StatefulSet"],
    snippet: "kubectl get pvc,pv -o wide",
    outcome: "Datos sobrevivientes a reinicios y reprogramación de pods.",
  },
  {
    title: "StorageClass y provisioner CSI",
    description:
      "Creación de clases de almacenamiento con parámetros de rendimiento, volumeBindingMode WaitForFirstConsumer y definición de la clase por defecto del clúster.",
    image: labTerminal,
    stack: ["StorageClass", "CSI"],
    snippet: "kubectl patch sc fast -p '{\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"true\"}}}'",
    outcome: "Provisión dinámica sin intervención manual y PVCs fuera de Pending.",
  },
  {
    title: "LVM en los nodos worker",
    description:
      "Preparación del almacenamiento del nodo: physical volumes, volume group, logical volumes con XFS, extensión en caliente y snapshot previo a una actualización crítica.",
    image: labSecurity,
    stack: ["LVM", "XFS"],
    snippet: "lvextend -r -L +20G /dev/vg_data/lv_kube",
    outcome: "Capacidad ampliada en producción sin desmontar ni reiniciar.",
  },
  {
    title: "Prometheus y alertas",
    description:
      "Despliegue del stack de monitoreo, scrape configs con service discovery de Kubernetes, exporters, consultas PromQL de saturación y reglas de alerta hacia Alertmanager.",
    image: labObservability,
    stack: ["Prometheus", "PromQL", "Alertmanager"],
    snippet: "sum by (namespace) (rate(container_cpu_usage_seconds_total[5m]))",
    outcome: "Alertas accionables por namespace con umbrales justificados.",
  },
  {
    title: "Proyecto final: plataforma observable",
    description:
      "Aplicación con estado desplegada sobre el clúster, expuesta por Ingress NGINX y Cloudflare, respaldada por PV/PVC sobre StorageClass propia y monitorizada con Prometheus y dashboards de Grafana.",
    image: labObservability,
    stack: ["Kubernetes", "Grafana", "SLO"],
    snippet: "kubectl rollout status deploy/app --timeout=120s",
    outcome: "Despliegue reproducible con SLO definido y rollback verificado.",
  },
];

const EvidenceSection = () => {
  const [selected, setSelected] = useState<Evidence | null>(null);
  const student = useStudent();

  return (
    <section id="evidencia" className="section-padding bg-secondary/40">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-accent mb-4 inline-block">Portafolio</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Evidencia de Prácticas
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Laboratorios sobre clústeres de Kubernetes realizados por{" "}
            <span className="font-semibold text-primary">{student.shortName}</span> durante el curso.
            Cada tarjeta incluye el stack usado, el comando clave y el resultado obtenido.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {evidences.map((ev, i) => (
            <motion.button
              key={ev.title}
              type="button"
              onClick={() => setSelected(ev)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <img
                src={ev.image}
                alt={`Laboratorio: ${ev.title}`}
                width={1024}
                height={1024}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 text-left">
                <h3 className="text-white text-xs md:text-sm font-bold leading-tight drop-shadow-lg">
                  {ev.title}
                </h3>
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <div className="overflow-hidden rounded-lg -mt-2">
                <img
                  src={selected.image}
                  alt={`Laboratorio: ${selected.title}`}
                  className="w-full h-56 object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed pt-2">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2">
                {selected.stack.map((s) => (
                  <span key={s} className="badge-outline text-[11px] font-mono">{s}</span>
                ))}
              </div>

              <pre className="mt-1 overflow-x-auto rounded-xl bg-foreground text-primary-foreground/90 p-4 text-xs font-mono leading-relaxed">
                <code>$ {selected.snippet}</code>
              </pre>

              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Resultado: </span>
                {selected.outcome}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EvidenceSection;
