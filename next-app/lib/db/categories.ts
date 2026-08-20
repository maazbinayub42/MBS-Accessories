import { prisma } from "./client";

// ─── Categories ──────────────────────────────
export async function getCategories(options?: { featured?: boolean; enabled?: boolean }) {
  return prisma.category.findMany({
    where: {
      ...(options?.featured !== undefined && { featured: options.featured }),
      ...(options?.enabled !== undefined && { enabled: options.enabled }),
    },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function createCategory(data: {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  heroImage?: string;
  bannerImage?: string;
  displayOrder?: number;
  featured?: boolean;
  enabled?: boolean;
}) {
  return prisma.category.create({ data });
}

export async function updateCategory(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    description: string;
    image: string;
    heroImage: string;
    bannerImage: string;
    displayOrder: number;
    featured: boolean;
    enabled: boolean;
  }>
) {
  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id } });
}
