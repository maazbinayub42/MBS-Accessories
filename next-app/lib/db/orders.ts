import { prisma } from "./client";

// ─── Customers ───────────────────────────────

export async function getOrCreateCustomer(data: { name: string; email?: string; phone?: string; address?: string }) {
  // Try to find by phone or email first
  if (data.phone) {
    const existing = await prisma.customer.findFirst({
      where: { OR: [{ phone: data.phone }, ...(data.email ? [{ email: data.email }] : [])] },
    });
    if (existing) {
      return prisma.customer.update({
        where: { id: existing.id },
        data: { name: data.name, ...(data.email && { email: data.email }), ...(data.address && { address: data.address }) },
      });
    }
  }
  return prisma.customer.create({ data });
}

export async function getCustomers(options?: { search?: string; limit?: number }) {
  return prisma.customer.findMany({
    where: options?.search
      ? { OR: [{ name: { contains: options.search } }, { email: { contains: options.search } }, { phone: { contains: options.search } }] }
      : {},
    include: { orders: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
    ...(options?.limit && { take: options.limit }),
  });
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: { orders: { include: { items: true }, orderBy: { createdAt: "desc" } } },
  });
}

// ─── Orders ──────────────────────────────────

export async function createOrder(data: {
  customerId?: string;
  total: number;
  notes?: string;
  items: Array<{
    productName: string;
    productImage?: string;
    variant?: string;
    quantity: number;
    price: number;
    productId?: string;
  }>;
}) {
  return prisma.order.create({
    data: {
      customerId: data.customerId,
      total: data.total,
      notes: data.notes ?? "",
      items: {
        create: data.items.map((item) => ({
          productName: item.productName,
          productImage: item.productImage,
          variant: item.variant ?? "",
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
        })),
      },
    },
    include: { items: true },
  });
}

export async function getOrders(options?: { status?: string; limit?: number; offset?: number }) {
  const where = options?.status ? { status: options.status } : {};
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { customer: true, items: true },
      orderBy: { createdAt: "desc" },
      ...(options?.limit && { take: options.limit }),
      ...(options?.offset && { skip: options.offset }),
    }),
    prisma.order.count({ where }),
  ]);
  return { orders, total };
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { customer: true, items: true },
  });
}

export async function updateOrderStatus(id: string, status: string) {
  return prisma.order.update({ where: { id }, data: { status } });
}

// ─── Media ───────────────────────────────────

export async function getMedia(type?: string) {
  return prisma.media.findMany({
    where: type ? { type } : {},
    orderBy: { createdAt: "desc" },
  });
}

export async function addMedia(data: { id: string; url: string; name: string; type?: string; fileSize?: number }) {
  return prisma.media.create({ data });
}

export async function deleteMedia(id: string) {
  return prisma.media.delete({ where: { id } });
}
