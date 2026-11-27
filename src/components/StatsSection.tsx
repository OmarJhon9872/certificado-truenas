import { motion } from "framer-motion";

const stats = [
  { value: "5", label: "Clústeres desplegados (k3s, DOKS, GKE)" },
  { value: "14", label: "Módulos cloud native completados" },
  { value: "28", label: "Laboratorios y manifiestos entregados" },
  { value: "99.9%", label: "Disponibilidad objetivo en el proyecto final" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black text-primary-foreground font-mono">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/70 mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
