const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let passed = 0;
let failed = 0;

function test(name, result) {
  if (result) {
    console.log(`  PASS  ${name}`);
    passed++;
  } else {
    console.log(`  FAIL  ${name}`);
    failed++;
  }
}

async function main() {
  console.log("Testing CRUD Operations...\n");

  // ─── READ Tests ────────────────────────────
  console.log("=== READ ===");

  const categories = await prisma.category.findMany();
  test("Read categories", categories.length === 4);

  const products = await prisma.product.findMany({
    include: { images: true, variants: true, category: true },
  });
  test("Read products", products.length === 12);

  const featured = products.filter((p) => p.featured);
  test("Featured products exist", featured.length >= 4);

  const withVariants = products.filter((p) => p.variants.length > 0);
  test("Products have variants", withVariants.length === 12);

  const withImages = products.filter((p) => p.images.length > 0);
  test("Products have images", withImages.length === 12);

  const kufis = products.filter((p) => p.categoryId === "kufis");
  test("Category relationship (kufis)", kufis.length === 4);

  const productBySlug = await prisma.product.findUnique({
    where: { slug: "classic-embroidered-kufi" },
  });
  test("Product by slug", productBySlug !== null && productBySlug.name === "Classic Embroidered Kufi");

  const nav = await prisma.navigationItem.findMany();
  test("Read navigation", nav.length === 8);

  const sections = await prisma.homepageSection.findMany();
  test("Read homepage sections", sections.length === 9);

  const siteSettings = await prisma.siteSetting.findUnique({ where: { id: "site" } });
  test("Read site settings", siteSettings !== null);

  const socialSettings = await prisma.siteSetting.findUnique({ where: { id: "social" } });
  test("Read social settings", socialSettings !== null);

  const footerLinks = await prisma.footerLink.findMany();
  test("Read footer links", footerLinks.length === 11);

  const pages = await prisma.page.findMany();
  test("Read pages", pages.length === 2);

  const seoSettings = await prisma.seoSetting.findMany();
  test("Read SEO settings", seoSettings.length === 4);

  // ─── CREATE Tests ──────────────────────────
  console.log("\n=== CREATE ===");

  const newCategory = await prisma.category.create({
    data: { id: "test-cat", name: "Test Category", slug: "test-cat" },
  });
  test("Create category", newCategory.id === "test-cat");

  const newProduct = await prisma.product.create({
    data: {
      id: "test-product-01",
      name: "Test Product",
      slug: "test-product",
      price: 1000,
      categoryId: "test-cat",
    },
  });
  test("Create product", newProduct.id === "test-product-01");

  const newImage = await prisma.productImage.create({
    data: { url: "https://test.com/img.jpg", displayOrder: 1, productId: "test-product-01" },
  });
  test("Create product image", newImage.url === "https://test.com/img.jpg");

  const newVariant = await prisma.productVariant.create({
    data: { name: "Size", value: "Test", price: 1000, productId: "test-product-01" },
  });
  test("Create product variant", newVariant.value === "Test");

  const newOrder = await prisma.order.create({
    data: {
      total: 2000,
      notes: "Test order",
      items: {
        create: [{ productName: "Test Product", quantity: 2, price: 1000, productId: "test-product-01" }],
      },
    },
    include: { items: true },
  });
  test("Create order with items", newOrder.items.length === 1);

  const newCustomer = await prisma.customer.create({
    data: { name: "Test Customer", email: "test@test.com", phone: "03001234567" },
  });
  test("Create customer", newCustomer.name === "Test Customer");

  // ─── UPDATE Tests ──────────────────────────
  console.log("\n=== UPDATE ===");

  const updatedProduct = await prisma.product.update({
    where: { id: "test-product-01" },
    data: { name: "Updated Product", price: 1500 },
  });
  test("Update product", updatedProduct.name === "Updated Product" && updatedProduct.price === 1500);

  const updatedCategory = await prisma.category.update({
    where: { id: "test-cat" },
    data: { name: "Updated Category" },
  });
  test("Update category", updatedCategory.name === "Updated Category");

  const updatedOrder = await prisma.order.update({
    where: { id: newOrder.id },
    data: { status: "confirmed" },
  });
  test("Update order status", updatedOrder.status === "confirmed");

  // ─── DELETE Tests (cleanup) ────────────────
  console.log("\n=== DELETE ===");

  await prisma.productImage.delete({ where: { id: newImage.id } });
  const deletedImage = await prisma.productImage.findUnique({ where: { id: newImage.id } });
  test("Delete product image", deletedImage === null);

  await prisma.productVariant.delete({ where: { id: newVariant.id } });
  const deletedVariant = await prisma.productVariant.findUnique({ where: { id: newVariant.id } });
  test("Delete product variant", deletedVariant === null);

  await prisma.order.delete({ where: { id: newOrder.id } });
  const deletedOrder = await prisma.order.findUnique({ where: { id: newOrder.id } });
  test("Delete order (cascade items)", deletedOrder === null);

  await prisma.product.delete({ where: { id: "test-product-01" } });
  const deletedProduct = await prisma.product.findUnique({ where: { id: "test-product-01" } });
  test("Delete product", deletedProduct === null);

  await prisma.customer.delete({ where: { id: newCustomer.id } });
  const deletedCustomer = await prisma.customer.findUnique({ where: { id: newCustomer.id } });
  test("Delete customer", deletedCustomer === null);

  await prisma.category.delete({ where: { id: "test-cat" } });
  const deletedCategory = await prisma.category.findUnique({ where: { id: "test-cat" } });
  test("Delete category", deletedCategory === null);

  // ─── UNIQUE Constraints ────────────────────
  console.log("\n=== CONSTRAINTS ===");

  try {
    await prisma.product.create({
      data: { name: "Dup", slug: "classic-embroidered-kufi" },
    });
    test("Unique slug constraint", false);
  } catch {
    test("Unique slug constraint", true);
  }

  try {
    await prisma.category.create({
      data: { id: "kufis", name: "Dup", slug: "dup" },
    });
    test("Unique category id constraint", false);
  } catch {
    test("Unique category id constraint", true);
  }

  // ─── SUMMARY ───────────────────────────────
  console.log(`\n${"=".repeat(40)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`${"=".repeat(40)}`);

  if (failed > 0) process.exit(1);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Test error:", e);
    prisma.$disconnect();
    process.exit(1);
  });
