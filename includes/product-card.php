<?php
/**
 * Product card partial — used by index.php, shop.php, category.php.
 * Expects a $p associative row from the products table.
 */
$p_sale = (float)($p['sale_price'] ?? 0);
$p_price = (float)($p['regular_price'] ?? 0);
$p_img = $p['main_image'];
if (!$p_img) $p_img = 'hero.jpg';
?>
<div class="product-card group reveal">
    <div class="product-media aspect-[3/4] border border-black/5 bg-[#f4efe8]">
        <a href="product.php?slug=<?= htmlspecialchars($p['slug']) ?>" class="block h-full">
            <img src="assets/uploads/<?= htmlspecialchars($p_img) ?>" alt="<?= htmlspecialchars($p['name']) ?>" class="w-full h-full object-cover" loading="lazy">
        </a>
        <?php if ($p_sale > 0 && $p_sale < $p_price): ?>
            <div class="absolute top-4 left-4 bg-[#C5A059] text-white text-[9px] px-2.5 py-1 font-bold tracking-widest uppercase shadow">Sale</div>
        <?php endif; ?>
        <a href="product.php?slug=<?= htmlspecialchars($p['slug']) ?>" class="quick-shop bg-[#1a1510]/90 text-white py-3.5 text-[9px] font-bold uppercase tracking-[0.25em] text-center hover:bg-[#C5A059] transition-colors duration-300">
            Quick View
        </a>
    </div>
    <div class="pt-5 text-center">
        <h4 class="product-name text-[11px] md:text-xs font-bold uppercase tracking-[0.12em] leading-relaxed">
            <?= htmlspecialchars($p['name']) ?>
        </h4>
        <p class="text-gray-600 text-[13px] font-semibold mt-1.5">
            <?php if ($p_sale > 0 && $p_sale < $p_price): ?>
                <span class="line-through opacity-40 mr-2 text-xs font-normal">Rs. <?= number_format($p_price) ?></span>
                Rs. <?= number_format($p_sale) ?>
            <?php else: ?>
                Rs. <?= number_format($p_price) ?>
            <?php endif; ?>
        </p>
    </div>
</div>
