import { prisma } from "./client";

// ─── Navigation ──────────────────────────────

export async function getNavigationItems() {
  return prisma.navigationItem.findMany({
    where: { enabled: true },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getAllNavigationItems() {
  return prisma.navigationItem.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function createNavigationItem(data: {
  id: string;
  label: string;
  url: string;
  enabled?: boolean;
  displayOrder?: number;
}) {
  return prisma.navigationItem.create({ data });
}

export async function updateNavigationItem(
  id: string,
  data: Partial<{ label: string; url: string; enabled: boolean; displayOrder: number }>
) {
  return prisma.navigationItem.update({ where: { id }, data });
}

export async function deleteNavigationItem(id: string) {
  return prisma.navigationItem.delete({ where: { id } });
}

// ─── Footer Links ────────────────────────────

export async function getFooterLinks(groupName?: string) {
  return prisma.footerLink.findMany({
    where: groupName ? { groupName } : {},
    orderBy: { displayOrder: "asc" },
  });
}

export async function createFooterLink(data: {
  groupName: string;
  label: string;
  url: string;
  displayOrder?: number;
}) {
  return prisma.footerLink.create({ data });
}

export async function deleteFooterLink(id: string) {
  return prisma.footerLink.delete({ where: { id } });
}
