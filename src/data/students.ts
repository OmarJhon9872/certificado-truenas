// Registro de alumnos certificados.
// Clave: ID numérico de EXACTAMENTE 10 caracteres (se lee de la URL: ?id=1234567890)
// Valor: [ nombre completo (index 0), nombre corto (index 1) ]
export const students: Record<string, [string, string]> = {
  "1000000001": ["Raúl Pérez Hernández", "Raúl Pérez"],
  "1000000002": ["María Fernanda Solís Vega", "María Solís"],
  "1000000003": ["Jonathan Omar Ramírez Cruz", "Jonathan Ramírez"],
  "1000000004": ["Ana Lucía Torres Medina", "Ana Torres"],
  "1000000005": ["Carlos Eduardo Nava Ríos", "Carlos Nava"],
};

export const DEFAULT_STUDENT: [string, string] = [
  "Nombre Persona Demo Analista",
  "Nombre Persona Demo",
];

export const CERTIFICATE_DATE = "Agosto, 2026";

export type Student = {
  /** ID de 10 dígitos si es válido, null si no */
  id: string | null;
  /** Nombre completo (index 0) */
  fullName: string;
  /** Nombre corto (index 1) */
  shortName: string;
  /** Iniciales derivadas del nombre corto */
  initials: string;
  /** true cuando el ID de la URL es válido y existe en el registro */
  verified: boolean;
};

const isValidId = (value: string | null): value is string =>
  !!value && /^\d{10}$/.test(value);

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export function resolveStudent(search: string): Student {
  const id = new URLSearchParams(search).get("id");

  if (isValidId(id) && students[id]) {
    const [fullName, shortName] = students[id];
    return { id, fullName, shortName, initials: getInitials(shortName), verified: true };
  }

  const [fullName, shortName] = DEFAULT_STUDENT;
  return {
    id: isValidId(id) ? id : null,
    fullName,
    shortName,
    initials: getInitials(shortName),
    verified: false,
  };
}
