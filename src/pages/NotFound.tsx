import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { HardDrive, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página no encontrada (404) · TrueNAS SysAdmin</title>
        <meta name="description" content="La página que buscas no existe. Vuelve al inicio del portafolio." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground px-4">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
        <main className="relative max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-background/20 bg-background/10">
            <HardDrive className="h-8 w-8 text-primary" />
          </div>
          <h1 className="metal-text text-8xl md:text-9xl font-black tracking-tighter">404</h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-background/60">
            dataset not found
          </p>
          <pre className="mx-auto mt-6 w-fit rounded-xl border border-background/15 bg-background/5 px-5 py-3 text-left font-mono text-xs text-background/70">
{`$ zfs list tank${location.pathname}
cannot open 'tank${location.pathname}': dataset does not exist`}
          </pre>
          <p className="mt-6 text-background/70">
            La página que buscas no existe o fue movida. Tus datos están a salvo: volvamos a un punto seguro.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              <Home className="h-4 w-4" /> Volver al inicio
            </Link>
            <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 rounded-xl border border-background/20 bg-background/10 px-6 py-3 font-semibold text-background transition-colors hover:bg-background/20">
              <ArrowLeft className="h-4 w-4" /> Página anterior
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
