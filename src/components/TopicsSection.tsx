import { motion } from "framer-motion";
import {
  Database, Layers, ShieldCheck, FolderTree, Gauge, Lock, KeyRound, Share2, Server,
  Terminal, Users, Camera, CalendarClock, LifeBuoy, RefreshCw, Globe, Network, Cloud, HardDrive,
} from "lucide-react";

type Topic = {
  icon: typeof Database;
  title: string;
  desc: string;
  tags: string[];
};

const topics: Topic[] = [
  { icon: Database, title: "ZFS: el sistema de archivos con integridad", desc: "Pools, vdevs, copy-on-write, checksums end-to-end, scrubs, compresión LZ4 y ARC/L2ARC. Por qué ZFS detecta y corrige corrupción silenciosa.", tags: ["zpool", "scrub", "ARC"] },
  { icon: HardDrive, title: "RAID y RAID-Z", desc: "Mirror, RAID-Z1/Z2/Z3 frente a RAID 0/1/5/6/10 clásico: capacidad útil, rendimiento IOPS, tiempos de resilver y elección del layout según la carga.", tags: ["RAID-Z2", "mirror", "resilver"] },
  { icon: ShieldCheck, title: "Redundancia y tolerancia a fallos", desc: "Hot spares, reemplazo de discos degradados, SMART, alertas por correo y diseño sin punto único de falla a nivel de disco, energía y red.", tags: ["SMART", "hot spare", "HA"] },
  { icon: FolderTree, title: "Datasets y zvols", desc: "Jerarquía de datasets, herencia de propiedades, recordsize, compresión y zvols para iSCSI. Organización por área, servicio y política de respaldo.", tags: ["dataset", "zvol", "recordsize"] },
  { icon: Gauge, title: "Cuotas y reservas", desc: "quota, refquota, reservation y refreservation por dataset y por usuario/grupo para controlar crecimiento y garantizar capacidad a servicios críticos.", tags: ["quota", "reservation"] },
  { icon: Lock, title: "Permisos Linux básicos", desc: "Usuarios, grupos, propietario, modo rwx, umask, chmod/chown y bits especiales setuid, setgid y sticky bit aplicados a recursos compartidos.", tags: ["chmod", "chown", "umask"] },
  { icon: KeyRound, title: "Permisos avanzados con ACL", desc: "POSIX ACL y NFSv4 ACL en TrueNAS: herencia, entradas por usuario/grupo, máscaras, getfacl/setfacl y modelos de permisos por departamento.", tags: ["NFSv4 ACL", "setfacl"] },
  { icon: Share2, title: "Servidor SMB", desc: "Shares SMB para clientes Windows y macOS: usuarios locales, ACL, shadow copies con snapshots, auditoría y buenas prácticas de seguridad SMB3.", tags: ["SMB3", "Samba", "shadow copies"] },
  { icon: Server, title: "NFS para Linux", desc: "Exports NFSv3/v4, mapeo de usuarios, redes autorizadas, montaje persistente en fstab y autofs, y diagnóstico de permisos entre cliente y servidor.", tags: ["NFSv4", "fstab", "autofs"] },
  { icon: Terminal, title: "Gestión básica de Linux", desc: "Shell, sistema de archivos, procesos, servicios con systemd, red, logs con journalctl y administración de discos desde la terminal.", tags: ["bash", "systemd", "journalctl"] },
  { icon: Users, title: "Usuarios, grupos y permisos en TrueNAS", desc: "Alta de cuentas locales, grupos por rol, directorios home, llaves SSH y principio de mínimo privilegio aplicado a datasets y servicios.", tags: ["RBAC", "SSH keys"] },
  { icon: Camera, title: "Snapshots ZFS", desc: "Snapshots instantáneos, clones, rollback y restauración granular de archivos. Retención por política y recuperación ante ransomware.", tags: ["snapshot", "rollback", "clone"] },
  { icon: CalendarClock, title: "Backups programados automáticos", desc: "Periodic Snapshot Tasks, Replication Tasks, Cloud Sync y Rsync Tasks programadas con retención, notificaciones y verificación de resultados.", tags: ["cron", "retención", "Cloud Sync"] },
  { icon: LifeBuoy, title: "Estrategia de recuperación 3-2-1", desc: "Tres copias, dos medios distintos, una fuera de sitio. RPO/RTO, runbooks de desastre y pruebas periódicas de restauración documentadas.", tags: ["3-2-1", "RPO", "RTO"] },
  { icon: RefreshCw, title: "rsync", desc: "Sincronización incremental local y remota sobre SSH: --archive, --delete, exclusiones, ancho de banda limitado y tareas rsync en TrueNAS.", tags: ["rsync", "SSH"] },
  { icon: Layers, title: "Replicación ZFS remota", desc: "zfs send/receive incremental entre servidores TrueNAS, replicación cifrada por SSH y conmutación a un sitio secundario.", tags: ["zfs send", "replication"] },
  { icon: Network, title: "VPN con WireGuard", desc: "Túneles WireGuard entre sitios y para administración remota: llaves, peers, AllowedIPs y transporte seguro de réplicas sin exponer servicios.", tags: ["WireGuard", "site-to-site"] },
  { icon: Cloud, title: "Cloud computing con DigitalOcean", desc: "Droplets, Volumes, Spaces (S3-compatible) y firewalls cloud como destino off-site de respaldos y sitio de recuperación ante desastres.", tags: ["Droplets", "Spaces", "off-site"] },
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
            Dieciocho bloques con profundidad de producción: de ZFS y RAID-Z a permisos con ACL,
            servicios SMB/NFS, respaldos automáticos y recuperación ante desastres en la nube.
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
