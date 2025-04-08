import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getReadingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).length;
  // Assuming an average reading speed of 200 words per minute (adjust as needed)
  const readingTime = (words / 200 + 1).toFixed();
  return `${readingTime} minutos de lectura`;
}
