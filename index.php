<?php include('includes/header.php'); ?>

<!-- 1. HERO SLIDER (DB-driven: category banners + fallback) -->
<?php
$hero_slides = array(array(
    'img'   => 'assets/images/hero.jpg',
    'title' => 'Fragrance & Faith',
    'sub'   => 'Premium Islamic Accessories Collection',
    'cta'   => 'shop.php',
    'cta_label' => 'Shop the Collection'
));
$hero_res = $conn->query("SELECT name, banner_image, slug FROM categories WHERE status = 1 AND banner_image IS NOT NULL AND banner_image != '' ORDER BY sort_order ASC, id ASC");
if ($hero_res) {
    while ($h = $hero_res->fetch_assoc()) {
        $hero_slides[] = array(
            'img'   => 'assets/uploads/' . $h['banner_image'],
            'title' => $h['name'],
            'sub'   => 'Wear Tradition with Pride',
            'cta'   => $h['slug'] ? 'category.php?slug=' . urlencode($h['slug']) : 'shop.php',
            'cta_label' => 'Discover ' . $h['name']
        );
    }
}
?>
<section class="relative w-full h-[72vh] md:h-[92vh] bg-[#1a1510] overflow-hidden">
    <?php foreach ($hero_slides as $i => $slide): ?>
        <div data-hero-slide class="hero-slide absolute inset-0 <?= $i === 0 ? 'active' : '' ?>">
            <img src="<?= htmlspecialchars($slide['img']) ?>" alt="<?= htmlspecialchars($slide['title']) ?>" class="w-full h-full object-cover brightness-[0.65]">
            <div class="absolute inset-0 bg-gradient-to-t from-[#1a1510]/70 via-transparent to-transparent"></div>
            <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <div class="hero-caption max-w-3xl">
                    <p class="text-[#C5A059] text-[10px] md:text-xs uppercase tracking-mega mb-5">MBS Accessories</p>
                    <h2 class="text-white font-heading text-5xl md:text-7xl lg:text-8xl font-light italic leading-tight drop-shadow-2xl">
                        <?= htmlspecialchars($slide['title']) ?>
                    </h2>
                    <p class="text-white/90 text-[10px] md:text-sm uppercase tracking-[0.3em] mt-6 opacity-90">
                        <?= htmlspecialchars($slide['sub']) ?>
                    </p>
                    <div class="mt-10">
                        <a href="<?= htmlspecialchars($slide['cta']) ?>" class="btn btn-gold rounded-full"><?= htmlspecialchars($slide['cta_label']) ?></a>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>

    <!-- Slider dots -->
    <?php if (count($hero_slides) > 1): ?>
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            <?php foreach ($hero_slides as $i => $slide): ?>
                <button data-hero-dot class="hero-dot w-2.5 h-2.5 rounded-full bg-white/50 <?= $i === 0 ? 'active' : '' ?>" aria-label="Slide <?= $i + 1 ?>"></button>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>

<!-- 2. SHOP BY CATEGORY -->
<section class="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
    <div class="text-center mb-14 md:mb-20 reveal">
        <p class="text-[#C5A059] text-[10px] uppercase tracking-mega mb-4">Curated Collections</p>
        <h3 class="font-heading text-3xl md:text-5xl font-light uppercase tracking-editorial">Shop By Category</h3>
    </div>
    <?php
    $cats = $conn->query("SELECT * FROM categories WHERE status = 1 ORDER BY sort_order ASC, id ASC");
    ?>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
        <?php while ($c = $cats->fetch_assoc()): 
            $c_img = $c['image'] ? $c['image'] : ($c['banner_image'] ? $c['banner_image'] : 'hero.jpg');
            $cat_count = (int)$conn->query("SELECT COUNT(*) AS n FROM products WHERE category_id = " . (int)$c['id'] . " AND status = 1")->fetch_assoc()['n'];
        ?>
            <a href="category.php?slug=<?= htmlspecialchars($c['slug']) ?>" class="group card-frame reveal">
                <div class="product-media aspect-square">
                    <img src="assets/uploads/<?= htmlspecialchars($c_img) ?>" alt="<?= htmlspecialchars($c['name']) ?>" class="w-full h-full object-cover" loading="lazy">
                </div>
                <div class="p-4 md:p-5 text-center">
                    <h4 class="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[#1a1510] group-hover:text-[#C5A059] transition-colors duration-300">
                        <?= htmlspecialchars($c['name']) ?>
                    </h4>
                    <p class="text-gray-400 text-[9px] uppercase tracking-[0.2em] mt-1.5"><?= $cat_count ?> Item<?= $cat_count == 1 ? '' : 's' ?></p>
                </div>
            </a>
        <?php endwhile; ?>
    </div>
</section>

<!-- 3. DYNAMIC CATEGORY SECTIONS (Banner -> 4 products -> View All) -->
<?php
$sections = $conn->query("SELECT * FROM categories WHERE status = 1 ORDER BY sort_order ASC, id ASC");
while ($sec = $sections->fetch_assoc()):
    $cat_id = (int)$sec['id'];
    $sec_img = $sec['banner_image'] ? $sec['banner_image'] : ($sec['image'] ? $sec['image'] : 'hero.jpg');
    $prods = $conn->query("SELECT * FROM products WHERE category_id = $cat_id AND status = 1 ORDER BY id ASC LIMIT 4");
    if (!$prods->num_rows) continue;
?>
<section class="max-w-[1400px] mx-auto px-0">
    <!-- Wide Category Banner -->
    <a href="category.php?slug=<?= htmlspecialchars($sec['slug']) ?>" class="relative block w-full h-[280px] md:h-[440px] overflow-hidden group reveal">
        <img src="assets/uploads/<?= htmlspecialchars($sec_img) ?>" alt="<?= htmlspecialchars($sec['name']) ?>" class="w-full h-full object-cover brightness-[0.7] transition-transform duration-[1.5s] group-hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-r from-[#1a1510]/60 to-transparent flex items-center">
            <div class="px-8 md:px-16 lg:px-24 text-white max-w-xl">
                <p class="text-[#C5A059] text-[9px] md:text-[10px] uppercase tracking-mega mb-4">The Collection</p>
                <h2 class="font-heading text-3xl md:text-6xl font-light italic"><?= htmlspecialchars($sec['name']) ?></h2>
                <p class="text-white/80 text-[10px] uppercase tracking-[0.25em] mt-4">Wear Tradition with Pride</p>
                <span class="inline-block mt-7 border border-white/60 px-7 py-3 text-[9px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-[#1a1510] transition-all duration-300 rounded-full">
                    Explore <?= htmlspecialchars($sec['name']) ?>
                </span>
            </div>
        </div>
    </a>

    <!-- Product Grid -->
    <div class="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            <?php while ($p = $prods->fetch_assoc()) include('includes/product-card.php'); ?>
        </div>

        <!-- View All -->
        <div class="text-center mt-14">
            <a href="category.php?slug=<?= htmlspecialchars($sec['slug']) ?>" class="btn btn-outline rounded-full">
                View All <?= htmlspecialchars($sec['name']) ?>
            </a>
        </div>
    </div>
</section>
<?php endwhile; ?>

<?php include('includes/footer.php'); ?>
