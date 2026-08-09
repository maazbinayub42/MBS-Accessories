<?php include('includes/header.php'); ?>

<?php
// Product detail page — gallery, zoom, dynamic variants, qty, order actions
if (!isset($_GET['slug'])) { header('Location: index.php'); exit(); }
$slug = trim($_GET['slug']);
$product = $conn->query("SELECT p.*, c.name AS cat_name, c.slug AS cat_slug FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.slug = '" . $conn->real_escape_string($slug) . "' AND p.status = 1")->fetch_assoc();
if (!$product) { header('Location: index.php'); exit(); }

$pid = (int)$product['id'];

// Gallery images (product_images + main_image as first)
$gallery = array();
$g_img = $product['main_image'] ? $product['main_image'] : 'hero.jpg';
$gallery[] = $g_img;
$g_res = $conn->query("SELECT image FROM product_images WHERE product_id = $pid ORDER BY sort_order ASC, id ASC");
if ($g_res) { while ($g = $g_res->fetch_assoc()) { if ($g['image'] && $g['image'] != $g_img) $gallery[] = $g['image']; } }

// Variants
$variants = array();
$v_res = $conn->query("SELECT * FROM variants WHERE product_id = $pid ORDER BY variant_type ASC, id ASC");
if ($v_res) {
    while ($v = $v_res->fetch_assoc()) {
        $variants[] = array(
            'type'    => $v['variant_type'],
            'label'   => $v['label'],
            'price'   => $v['price'] !== null ? (float)$v['price'] : null,
            'default' => (int)$v['is_default'] === 1
        );
    }
}

$price = (float)($product['sale_price'] && $product['sale_price'] < $product['regular_price'] ? $product['sale_price'] : $product['regular_price']);
?>

<div class="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-16" data-product-page
     data-variants='<?= htmlspecialchars(json_encode($variants)) ?>'
     data-base-price="<?= (float)$product['regular_price'] ?>"
     data-name="<?= htmlspecialchars($product['name']) ?>"
     data-slug="<?= htmlspecialchars($product['slug']) ?>"
     data-wa-number="<?= htmlspecialchars($wa_number ?? '923707107422') ?>">

    <!-- Breadcrumb -->
    <nav class="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-8">
        <a href="index.php" class="hover:text-[#C5A059] transition-colors">Home</a>
        <span class="mx-2">/</span>
        <a href="shop.php" class="hover:text-[#C5A059] transition-colors">Collection</a>
        <span class="mx-2">/</span>
        <?php if (!empty($product['cat_name'])): ?>
            <a href="category.php?slug=<?= htmlspecialchars($product['cat_slug']) ?>" class="hover:text-[#C5A059] transition-colors"><?= htmlspecialchars($product['cat_name']) ?></a>
            <span class="mx-2">/</span>
        <?php endif; ?>
        <span class="text-[#1a1510] font-bold"><?= htmlspecialchars($product['name']) ?></span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        <!-- LEFT: Vertical thumbnails -->
        <div class="lg:col-span-1 order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            <?php foreach ($gallery as $i => $gi): ?>
                <button data-thumb class="gallery-thumb w-20 h-28 lg:w-full lg:h-28 shrink-0 border <?= $i === 0 ? 'active' : '' ?> bg-[#f4efe8]"
                        data-thumb="<?= 'assets/uploads/' . htmlspecialchars($gi) ?>">
                    <img src="assets/uploads/<?= htmlspecialchars($gi) ?>" alt="<?= htmlspecialchars($product['name']) ?>" class="w-full h-full object-cover">
                </button>
            <?php endforeach; ?>
        </div>

        <!-- CENTER: Large image with zoom -->
        <div class="lg:col-span-6 order-1 lg:order-2">
            <div data-zoom-frame class="zoom-frame aspect-[4/5] border border-black/5 bg-[#f4efe8] shadow-lg">
                <img data-main-img src="assets/uploads/<?= htmlspecialchars($gallery[0]) ?>" alt="<?= htmlspecialchars($product['name']) ?>" class="w-full h-full object-cover">
            </div>
        </div>

        <!-- RIGHT: Product info -->
        <div class="lg:col-span-5 order-3 lg:order-3 flex flex-col lg:pl-4">
            <?php if ($product['sale_price'] > 0 && $product['sale_price'] < $product['regular_price']): ?>
                <span class="inline-block self-start bg-[#C5A059] text-white text-[9px] px-3 py-1 font-bold tracking-widest uppercase mb-4 rounded-full">Sale</span>
            <?php endif; ?>

            <h1 class="font-heading text-3xl md:text-5xl font-light uppercase tracking-editorial leading-tight"><?= htmlspecialchars($product['name']) ?></h1>

            <div class="flex items-baseline gap-5 mt-5">
                <span class="text-2xl md:text-3xl font-bold text-[#C5A059]" data-price-value>Rs. <?= number_format($price) ?></span>
                <?php if ($product['sale_price'] > 0 && $product['sale_price'] < $product['regular_price']): ?>
                    <span class="text-lg text-gray-400 line-through">Rs. <?= number_format($product['regular_price']) ?></span>
                <?php endif; ?>
            </div>

            <div class="text-gray-600 leading-loose mt-7 text-sm md:text-[15px]">
                <?= nl2br(htmlspecialchars($product['description'])) ?>
            </div>

            <!-- Variant selectors -->
            <div data-variant-size class="hidden mt-9">
                <p class="text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Select Size</p>
                <div data-variant-box class="flex flex-wrap gap-2.5"></div>
            </div>
            <div data-variant-color class="hidden mt-7">
                <p class="text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Select Color</p>
                <div data-variant-box class="flex flex-wrap gap-2.5"></div>
            </div>

            <!-- Quantity -->
            <div class="mt-9">
                <p class="text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Quantity</p>
                <div data-qty class="inline-flex items-center gap-4">
                    <button data-qty-btn="-1" class="qty-btn" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                    <span data-qty-value class="w-10 text-center font-bold text-lg">1</span>
                    <button data-qty-btn="1" class="qty-btn" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <!-- Trust markers -->
            <div class="border-y border-black/10 py-6 mt-9 space-y-3.5">
                <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <i class="fa-solid fa-truck text-[#C5A059]"></i> Fast Delivery via Leopard Courier
                </div>
                <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <i class="fa-solid fa-shield-halved text-[#C5A059]"></i> Authentic & Original Guarantee
                </div>
            </div>

            <!-- Actions -->
            <form data-add-form action="cart.php" method="POST" class="mt-9 flex flex-col sm:flex-row gap-4">
                <input type="hidden" name="add_to_cart" value="1">
                <input type="hidden" name="product_id" value="<?= $pid ?>">
                <input type="hidden" name="variant" value="">
                <input type="hidden" name="qty" value="1">
                <input type="hidden" name="unit_price" value="">
                <button type="submit" class="btn btn-dark flex-1 rounded-full">
                    <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                </button>
                <button type="button" data-wa-order class="btn btn-wa flex-1 rounded-full">
                    <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
                </button>
            </form>

            <p class="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-6">
                Shipping charges calculated at checkout · Cash on Delivery available
            </p>
        </div>
    </div>
</div>

<?php include('includes/footer.php'); ?>
<script src="assets/js/product.js"></script>
