import { MetadataRoute } from "next";
import { MY_PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vikaskannur.com"; // Replace with actual domain

  // Homepage
  const rootRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  // Dynamic project routes
  const projectRoutes = MY_PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [rootRoute, ...projectRoutes];
}
