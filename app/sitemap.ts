import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories, products } = await getCatalog();
  const staticRoutes = [
    "",
    "/produse",
    "/ghiduri",
    "/intrebari-frecvente",
    "/termeni-si-conditii",
    "/politica-de-retur",
    "/confidentialitate",
    "/cookies",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/produse/${category.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/produse/${product.categorySlug}/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
