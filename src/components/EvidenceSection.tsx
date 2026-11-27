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
  { title: "Pool ZFS en RAID-Z2", description: "Creación de un pool con seis discos en RAID-Z2, compresión LZ4 y scrub programado. Simulación de falla de dos discos sin pérdida de datos.", image: labTerminal, stack: ["ZFS", "RAID-Z2", "LZ4"], snippet: "zpool create tank raidz2 sda sdb sdc sdd sde sdf", outcome: "Pool ONLINE tolerante a la falla simultánea de dos discos." },
  { title: "Reemplazo de disco degradado", description: "Detección por SMART, offline del disco fallido, reemplazo y monitoreo del resilver hasta recuperar el estado ONLINE.", image: labSecurity, stack: ["SMART", "resilver"], snippet: "zpool replace tank sdc sdg && zpool status -v tank", outcome: "Resilver completado sin interrupción del servicio." },
  { title: "Datasets y cuotas por área", description: "Jerarquía de datasets por departamento con herencia de compresión, cuotas y reservas para garantizar capacidad a servicios críticos.", image: labContainers, stack: ["dataset", "quota"], snippet: "zfs create -o quota=500G -o reservation=100G tank/finanzas", outcome: "Crecimiento controlado y capacidad garantizada por área." },
  { title: "ACL por departamento", description: "Modelo de permisos con NFSv4 ACL heredables: lectura para auditoría, modificación para el equipo y control total para administradores.", image: labSecurity, stack: ["NFSv4 ACL", "setfacl"], snippet: "setfacl -m g:finanzas:rwx,d:g:finanzas:rwx /mnt/tank/finanzas", outcome: "Acceso mínimo necesario verificado con usuarios de prueba." },
  { title: "Share SMB con Shadow Copies", description: "Recurso SMB3 para clientes Windows con versiones anteriores expuestas desde snapshots ZFS y auditoría de accesos.", image: labNetwork, stack: ["SMB3", "shadow copies"], snippet: "smbclient -L //truenas.local -U analista", outcome: "Usuarios restauran archivos sin intervención de TI." },
  { title: "Export NFS para Linux", description: "Export NFSv4 restringido por red, montaje persistente en clientes Linux con fstab y diagnóstico de mapeo de UID/GID.", image: labNetwork, stack: ["NFSv4", "fstab"], snippet: "mount -t nfs4 truenas.local:/mnt/tank/apps /srv/apps", outcome: "Montaje estable tras reinicios con permisos coherentes." },
  { title: "Snapshots y rollback", description: "Política de snapshots cada hora con retención de 14 días; recuperación de un dataset tras un borrado masivo simulado.", image: labTerminal, stack: ["snapshot", "rollback"], snippet: "zfs rollback tank/docs@auto-2026-11-20_09-00", outcome: "Recuperación completa en segundos tras simular ransomware." },
  { title: "Backups automáticos programados", description: "Periodic Snapshot, Replication y Cloud Sync Tasks con horarios escalonados, retención y alertas por correo ante fallas.", image: labObservability, stack: ["cron", "Cloud Sync"], snippet: "midclt call pool.snapshottask.query", outcome: "Respaldos diarios sin intervención manual y con evidencia." },
  { title: "rsync incremental sobre SSH", description: "Sincronización de un servidor Linux hacia TrueNAS con exclusiones, límite de ancho de banda y verificación de integridad.", image: labContainers, stack: ["rsync", "SSH"], snippet: "rsync -aAXv --delete --bwlimit=20M /srv/ backup@truenas:/mnt/tank/srv/", outcome: "Transferencias incrementales en minutos en lugar de horas." },
  { title: "Replicación ZFS remota", description: "zfs send/receive incremental hacia un segundo TrueNAS fuera de sitio, cifrado por SSH y validado con restauración de prueba.", image: labNetwork, stack: ["zfs send", "replication"], snippet: "zfs send -i @lunes tank/docs@martes | ssh dr zfs recv -F backup/docs", outcome: "Copia off-site consistente con RPO de una hora." },
  { title: "VPN WireGuard site-to-site", description: "Túnel WireGuard entre la oficina y el sitio de recuperación para transportar réplicas sin exponer puertos de almacenamiento.", image: labSecurity, stack: ["WireGuard", "VPN"], snippet: "wg-quick up wg0 && wg show", outcome: "Réplicas cifradas sobre túnel privado con latencia estable." },
  { title: "Proyecto final: plan DR 3-2-1", description: "Plan completo de recuperación: copias locales en ZFS, réplica a segundo NAS y copia off-site en DigitalOcean Spaces, con runbook y prueba de restauración cronometrada.", image: labObservability, stack: ["3-2-1", "DigitalOcean", "RTO"], snippet: "rclone sync /mnt/tank/backup do-spaces:dr-bucket --checksum", outcome: "Restauración total documentada dentro del RTO objetivo." },
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
            Laboratorios de almacenamiento, respaldo y recuperación realizados por{" "}
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
