import { prisma } from "./client";
import type { SiteSetting } from "@prisma/client";

// ─── Homepage Sections ───────────────────────

export async function getHomepageSections() {
  return prisma.homepageSection.findMany({
    where: { enabled: true },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getAllHomepageSections() {
  return prisma.homepageSection.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function getHomepageSection(id: string) {
  return prisma.homepageSection.findUnique({ where: { id } });
}

export async function updateHomepageSection(id: string, data: Partial<{ content: string; enabled: boolean; displayOrder: number }>) {
  return prisma.homepageSection.update({ where: { id }, data });
}

// ─── Pages ───────────────────────────────────

export async function getPage(id: string) {
  return prisma.page.findUnique({ where: { id } });
}

export async function updatePage(id: string, data: Partial<{ heading: string; subheading: string; content: string }>) {
  return prisma.page.update({ where: { id }, data });
}

// ─── Site Settings ───────────────────────────

export async function getSiteSettings(id: string) {
  const setting = await prisma.siteSetting.findUnique({ where: { id } });
  if (!setting) return null;
  return { ...setting, settings: JSON.parse(setting.settings) };
}

export async function getAllSiteSettings() {
  const settings = await prisma.siteSetting.findMany();
  return settings.map((s: SiteSetting) => ({ ...s, settings: JSON.parse(s.settings) }));
}

export async function updateSiteSettings(id: string, settings: Record<string, unknown>) {
  return prisma.siteSetting.update({
    where: { id },
    data: { settings: JSON.stringify(settings) },
  });
}

// ─── SEO Settings ────────────────────────────

export async function getSeoSettings(page: string) {
  return prisma.seoSetting.findUnique({ where: { id: page } });
}

export async function updateSeoSettings(page: string, data: Partial<{ title: string; description: string; keywords: string }>) {
  return prisma.seoSetting.upsert({
    where: { id: page },
    update: data,
    create: { id: page, ...data },
  });
}
