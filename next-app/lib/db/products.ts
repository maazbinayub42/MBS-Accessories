import { prisma } from "./client";
import type { Prisma } from "@prisma/client";

// ─── Products ────────────────────────────────

export async function getProducts(options?: {
  categoryId?: string;
  featured?: boolean;
  bestSeller?: boolean;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.categoryId) where.categoryId = options.categoryId;
  if (options?.featured !== undefined) where.featured = options.featured;
  if (options?.bestSeller !== undefined) where.bestSeller = options.bestSeller;
  if (options?.status) where.status = options.status;
  if (options?.search) {
    where.OR = [
      { name: { contains: options.search } },
      { description: { contains: options.search } },
      { sku: { contains: options.search } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { displayOrder: "asc" } },
        variants: { orderBy: { displayOrder: "asc" } },
      },
      orderBy: { displayOrder: "asc" },
      ...(options?.limit && { take: options.limit }),
      ...(options?.offset && { skip: options.offset }),
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: { orderBy: { displayOrder: "asc" } },
    },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
      variants: { orderBy: { displayOrder: "asc" } },
    },
  });
}

export async function createProduct(data: {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  originalPrice?: number | null;
  sku?: string;
  stock?: number;
  status?: string;
  featured?: boolean;
  bestSeller?: boolean;
  badge?: string | null;
  image?: string;
  displayOrder?: number;
  categoryId?: string | null;
}) {
  const createData: Prisma.ProductUncheckedCreateInput = {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description ?? undefined,
    shortDescription: data.shortDescription ?? undefined,
    price: data.price ?? 0,
    originalPrice: data.originalPrice ?? undefined,
    sku: data.sku ?? undefined,
    stock: data.stock ?? undefined,
    status: data.status ?? undefined,
    featured: data.featured ?? undefined,
    bestSeller: data.bestSeller ?? undefined,
    badge: data.badge ?? undefined,
    image: data.image ?? undefined,
    displayOrder: data.displayOrder ?? undefined,
    categoryId: data.categoryId ?? undefined,
  };
  return prisma.product.create({ data: createData });
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice: number | null;
    sku: string;
    stock: number;
    status: string;
    featured: boolean;
    bestSeller: boolean;
    badge: string | null;
    image: string;
    displayOrder: number;
    categoryId: string | null;
  }>
) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

// ─── Product Images ──────────────────────────

export async function addProductImage(productId: string, url: string, displayOrder?: number) {
  return prisma.productImage.create({
    data: { url, displayOrder: displayOrder ?? 0, productId },
  });
}

export async function deleteProductImage(id: string) {
  return prisma.productImage.delete({ where: { id } });
}

export async function reorderProductImages(productId: string, imageIds: string[]) {
  const updates = imageIds.map((id, index) =>
    prisma.productImage.update({
      where: { id },
      data: { displayOrder: index + 1 },
    })
  );
  return prisma.$transaction(updates);
}

// ─── Product Variants ────────────────────────

export async function addProductVariant(
  productId: string,
  data: { name: string; value: string; price: number; stock?: number; status?: string; displayOrder?: number }
) {
  return prisma.productVariant.create({
    data: { ...data, productId },
  });
}

export async function updateProductVariant(
  id: string,
  data: Partial<{ name: string; value: string; price: number; stock: number; status: string; displayOrder: number }>
) {
  return prisma.productVariant.update({ where: { id }, data });
}

export async function deleteProductVariant(id: string) {
  return prisma.productVariant.delete({ where: { id } });
}
