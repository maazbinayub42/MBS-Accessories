<?php include('includes/header.php'); ?>

<?php
// Category page — banner + all products in a single category
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if ($slug === '') { header('Location: shop.php'); exit(); }

$cat = $conn->query("SELECT * FROM categories WHERE slug = '" . $conn->real_escape_string($slug) . "' AND status = 1")->fetch_assoc();
if (!$cat) { header('Location: shop.php'); exit(); }

$cat_img = $cat['banner_image'] ? $cat['banner_image'] : ($cat['image'] ? $cat['image'] : 'hero.jpg');
$prods = $conn->query("SELECT * FROM products WHERE category_id = " . (int)$cat['id'] . " AND status = 1 ORDER BY id ASC");
?>

<!-- Category Banner -->
<section class="relative w-full h-[300px] md:h-[420px] bg-[#1a1510] overflow-hidden">
    <img src="assets/uploads/<?= htmlspecialchars($cat_img) ?>" alt="<?= htmlspecialchars($cat['name']) ?>" class="w-full h-full object-cover brightness-[0.7]">
    <div class="absolute inset-0 bg-gradient-to-t from-[#1a1510]/70 to-transparent"></div>
    <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <p class="text-[#C5A059] text-[9px] md:text-[10px] uppercase tracking-mega mb-4">MBS Accessories</p>
        <h1 class="font-heading text-4xl md:text-7xl font-light italic text-white"><?= htmlspecialchars($cat['name']) ?></h1>
        <p class="text-white/80 text-[10px] uppercase tracking-[0.28em] mt-5"><?= $prods->num_rows ?> Premium Piece<?= $prods->num_rows == 1 ? '' : 's' ?></p>
    </div>
</section>

<!-- Breadcrumb -->
<div class="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 text-[9px] uppercase tracking-[0.25em] text-gray-400">
    <a href="index.php" class="hover:text-[#C5A059] transition-colors">Home</a>
    <span class="mx-2">/</span>
    <a href="shop.php" class="hover:text-[#C5A059] transition-colors">Collection</a>
    <span class="mx-2">/</span>
    <span class="text-[#1a1510] font-bold"><?= htmlspecialchars($cat['name']) ?></span>
</div>

<!-- Products -->
<section class="max-w-[1400px] mx-auto px-6 md:px-10 py-12 min-h-[40vh]">
    <?php if ($prods->num_rows): ?>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            <?php while ($p = $prods->fetch_assoc()) include('includes/product-card.php'); ?>
        </div>
    <?php else: ?>
        <div class="text-center py-24">
            <p class="text-gray-400 uppercase tracking-[0.25em] text-xs mb-8">This collection is being curated.</p>
            <a href="shop.php" class="btn btn-dark rounded-full">View Full Collection</a>
        </div>
    <?php endif; ?>
</section>

<?php include('includes/footer.php'); ?>
