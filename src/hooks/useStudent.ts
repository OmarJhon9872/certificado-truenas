import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { resolveStudent, type Student } from "@/data/students";

/**
 * Lee la variable GET "id" (numérica, exactamente 10 caracteres) y devuelve
 * los datos del alumno asociado. Si no existe, devuelve el alumno demo.
 */
export function useStudent(): Student {
  const location = useLocation();
  const search = location.search || (typeof window !== "undefined" ? window.location.search : "");
  return useMemo(() => resolveStudent(search), [search]);
}
