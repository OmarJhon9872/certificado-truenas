import { motion } from "framer-motion";
import {
  Boxes, Cloud, CloudCog, HardDrive, Server, Network, Globe, Database,
  Layers, LineChart, Activity, ShieldCheck, GitBranch, Route,
} from "lucide-react";

type Topic = {
  icon: typeof Boxes;
  title: string;
  desc: string;
  tags: string[];
};

const topics: Topic[] = [
  {
    icon: Boxes,
    title: "Kubernetes: arquitectura del plano de control",
    desc: "API server, etcd, scheduler y controller-manager. Ciclo de reconciliación declarativa, objetos (Deployment, StatefulSet, DaemonSet, Job) y el modelo de recursos con requests/limits y QoS classes.",
    tags: ["kubectl", "etcd", "reconcile loop"],
  },
  {
    icon: Server,
    title: "k3s: Kubernetes ligero en el edge",
    desc: "Distribución certificada CNCF con binario único: SQLite/etcd embebido, servidor + agentes, Traefik y servicelb sustituibles. Instalación multi-nodo, tokens de unión y HA con datastore externo.",
    tags: ["k3s", "edge", "single-binary"],
  },
  {
    icon: Cloud,
    title: "Kubernetes gestionado en DigitalOcean",
    desc: "Provisión de DOKS: node pools, autoescalado, integración con Load Balancers y Block Storage vía CSI, doctl y kubeconfig. Costos, límites de cuota y estrategia de upgrade de versiones.",
    tags: ["DOKS", "doctl", "node pools"],
  },
  {
    icon: CloudCog,
    title: "Google Cloud Platform y GKE",
    desc: "Proyectos, IAM y VPC en GCP; clústeres GKE Standard y Autopilot, Workload Identity, Cloud Logging y persistencia con Persistent Disk. Comparativa entre plano de control gestionado y autoadministrado.",
    tags: ["GCP", "GKE", "IAM"],
  },
  {
    icon: Route,
    title: "Ingress NGINX y enrutamiento L7",
    desc: "Ingress Controller NGINX: host/path routing, terminación TLS, annotations de rewrite, rate limiting y proxy buffers. Diferencias entre Service (ClusterIP, NodePort, LoadBalancer) e Ingress.",
    tags: ["ingress-nginx", "TLS", "L7"],
  },
  {
    icon: Network,
    title: "DNS: resolución interna y externa",
    desc: "CoreDNS y descubrimiento de servicios (svc.namespace.svc.cluster.local), políticas dnsPolicy y search domains; registros A, CNAME, TXT y propagación para exponer aplicaciones al exterior.",
    tags: ["CoreDNS", "service discovery"],
  },
  {
    icon: Globe,
    title: "Gestión DNS en Cloudflare",
    desc: "Zonas, registros proxied vs. DNS-only, certificados Origin, reglas de caché y protección frente al Ingress. Publicación segura de servicios del clúster con TLS de extremo a extremo.",
    tags: ["Cloudflare", "proxy", "Origin CA"],
  },
  {
    icon: Layers,
    title: "Volúmenes: efímeros y persistentes",
    desc: "emptyDir, hostPath, configMap y secret como volúmenes; ciclo de vida frente al Pod, montaje en múltiples contenedores y patrones sidecar para compartir estado.",
    tags: ["volumes", "sidecar"],
  },
  {
    icon: Database,
    title: "PersistentVolume y PersistentVolumeClaim",
    desc: "Aprovisionamiento estático y dinámico, binding PV/PVC, accessModes (RWO, ROX, RWX), reclaimPolicy y expansión de volúmenes. Cómo un StatefulSet consume volumeClaimTemplates.",
    tags: ["PV", "PVC", "RWO"],
  },
  {
    icon: HardDrive,
    title: "StorageClass y CSI",
    desc: "Definición de clases de almacenamiento, provisioners CSI, parámetros de rendimiento, volumeBindingMode (Immediate vs. WaitForFirstConsumer) y clase por defecto del clúster.",
    tags: ["StorageClass", "CSI"],
  },
  {
    icon: HardDrive,
    title: "LVM sobre nodos Linux",
    desc: "Physical volumes, volume groups y logical volumes; extensión en caliente, snapshots y thin provisioning para respaldar el almacenamiento de los nodos worker antes de exponerlo al clúster.",
    tags: ["LVM", "XFS", "snapshots"],
  },
  {
    icon: ShieldCheck,
    title: "RHEL como nodo base",
    desc: "Red Hat Enterprise Linux 9 preparado para Kubernetes: systemd, SELinux, firewalld, cgroups v2, módulos de kernel y runtime containerd. Hardening y afinación previa al join del nodo.",
    tags: ["RHEL 9", "SELinux", "containerd"],
  },
  {
    icon: Activity,
    title: "Prometheus: métricas y alertas",
    desc: "Modelo pull, scrape configs y service discovery en Kubernetes, exporters (node, kube-state-metrics), PromQL para tasas y percentiles, reglas de alerta y Alertmanager.",
    tags: ["PromQL", "exporters", "alerting"],
  },
  {
    icon: LineChart,
    title: "Grafana: observabilidad y SLO",
    desc: "Dashboards por namespace y workload, variables y paneles de saturación, latencia y errores. Lectura de señales doradas (RED/USE) para sustentar SLO y capacidad del clúster.",
    tags: ["dashboards", "SLO", "RED/USE"],
  },
  {
    icon: GitBranch,
    title: "Cloud computing: modelos y arquitectura",
    desc: "IaaS, PaaS y CaaS; regiones y zonas de disponibilidad, elasticidad, modelo de responsabilidad compartida, FinOps básico y criterios para elegir entre nube gestionada y self-hosted.",
    tags: ["IaaS", "multi-AZ", "FinOps"],
  },
];

const TopicsSection = () => {
  return (
    <section id="temas" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-accent mb-4 inline-block">Syllabus técnico</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Temas Cursados
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Quince bloques de contenido con profundidad de producción: del plano de control de
            Kubernetes al almacenamiento persistente, el enrutamiento L7 y la observabilidad del
            clúster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              className="card-surface p-8 group cursor-default flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            >
              <span className="text-mono text-primary/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <topic.icon className="w-6 h-6 text-primary mt-3 mb-4" />
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                {topic.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {topic.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground border border-border/60">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
