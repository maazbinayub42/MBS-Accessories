<?php include('includes/header.php'); ?>

<?php
// Catalogue page — lists all live products with optional category filter
$filter_cat = isset($_GET['cat']) ? (int)$_GET['cat'] : 0;
$q = isset($_GET['q']) ? trim($_GET['q']) : '';

$where = "WHERE p.status = 1";
if ($filter_cat) {
    $where .= " AND p.category_id = " . $filter_cat;
}
if ($q !== '') {
    $safe_q = $conn->real_escape_string($q);
    $where .= " AND (p.name LIKE '%$safe_q%' OR p.description LIKE '%$safe_q%')";
}
$prods = $conn->query("SELECT p.*, c.name AS cat_name FROM products p LEFT JOIN categories c ON c.id = p.category_id $where ORDER BY p.id DESC");
$all_cats = $conn->query("SELECT * FROM categories WHERE status = 1 ORDER BY sort_order ASC, id ASC");
?>

<!-- Catalogue Header -->
<section class="bg-[#1a1510] text-white py-16 md:py-24">
    <div class="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <p class="text-[#C5A059] text-[10px] uppercase tracking-mega mb-4">MBS Accessories</p>
        <h1 class="font-heading text-4xl md:text-6xl font-light italic">The Collection</h1>
        <p class="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.28em] mt-5">Fragrances · Kufis · Imamas — Handcrafted Premium</p>
    </div>
</section>

<!-- Filter Bar -->
<section class="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-4">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex flex-wrap gap-3">
            <a href="shop.php" class="variant-pill <?= $filter_cat ? '' : 'selected' ?> rounded-full">All</a>
            <?php while ($c = $all_cats->fetch_assoc()): ?>
                <a href="shop.php?cat=<?= (int)$c['id'] ?>" class="variant-pill rounded-full <?= $filter_cat == $c['id'] ? 'selected' : '' ?>">
                    <?= htmlspecialchars($c['name']) ?>
                </a>
            <?php endwhile; ?>
        </div>
        <form method="GET" action="shop.php" class="flex items-center gap-2">
            <input type="text" name="q" value="<?= htmlspecialchars($q) ?>" placeholder="Search products…" class="field rounded-full max-w-[240px]">
            <button type="submit" class="w-11 h-11 rounded-full bg-[#1a1510] text-white hover:bg-[#C5A059] transition-colors duration-300"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    </div>
</section>

<!-- Products -->
<section class="max-w-[1400px] mx-auto px-6 md:px-10 py-10 min-h-[40vh]">
    <?php if ($prods && $prods->num_rows): ?>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            <?php while ($p = $prods->fetch_assoc()) include('includes/product-card.php'); ?>
        </div>
    <?php else: ?>
        <div class="text-center py-24">
            <p class="text-gray-400 uppercase tracking-[0.25em] text-xs mb-8">No products found.</p>
            <a href="shop.php" class="btn btn-dark rounded-full">View All Products</a>
        </div>
    <?php endif; ?>
</section>

<?php include('includes/footer.php'); ?>
