import { motion } from "framer-motion";

const tools = [
  "Kubernetes", "k3s", "kubectl", "Helm", "containerd", "DOKS",
  "DigitalOcean", "GCP", "GKE", "Ingress NGINX", "CoreDNS", "Cloudflare",
  "PV / PVC", "StorageClass", "CSI", "LVM", "RHEL 9", "SELinux",
  "Prometheus", "PromQL", "Alertmanager", "Grafana", "kube-state-metrics", "Terraform-ready",
];

const ToolsSlider = () => {
  return (
    <section className="py-16 bg-secondary/40 overflow-hidden border-y border-border/50">
      <div className="container mx-auto px-4 mb-8">
        <motion.p
          className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Stack Técnico · Ecosistema Cloud Native
        </motion.p>
      </div>
      <div className="relative">
        <div className="flex animate-slide-left w-max">
          {[...tools, ...tools].map((tool, i) => (
            <div
              key={`${tool}-${i}`}
              className="flex-shrink-0 mx-3 px-6 py-3 rounded-xl bg-card font-mono text-sm text-foreground border border-border/50 hover:border-primary/40 hover:text-primary hover:shadow-md transition-all cursor-default"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSlider;
