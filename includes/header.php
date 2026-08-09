<?php include('config/db.php'); ?>
<?php
// Central helper values used by header
$wa_number = '923707107422';
$announcement = 'Muhammad Bin Saqib';
$store_name = 'MBS Accessories';
$res = $conn->query("SELECT setting_key, setting_value FROM settings");
if ($res) {
    while ($row = $res->fetch_assoc()) {
        if ($row['setting_key'] == 'whatsapp_number') $wa_number = $row['setting_value'];
        if ($row['setting_key'] == 'announcement') $announcement = $row['setting_value'];
        if ($row['setting_key'] == 'store_name') $store_name = $row['setting_value'];
    }
}

// Cart count (sum of quantities)
$cart_count = 0;
if (!empty($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $item) {
        $cart_count += (int)($item['qty'] ?? 0);
    }
}

// Current page for active nav state
$current_page = basename($_SERVER['PHP_SELF']);

// Category-driven nav (kept small & premium)
$nav_cats = array();
$nav_res = $conn->query("SELECT name, slug FROM categories WHERE status = 1 ORDER BY sort_order ASC, id ASC LIMIT 4");
if ($nav_res) { while ($c = $nav_res->fetch_assoc()) { $nav_cats[] = $c; } }
if (empty($nav_cats)) { $nav_cats = array(array('name' => 'Catalogue', 'slug' => '')); }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="MBS Accessories — Premium Islamic fragrances, kufis and imamas. Handcrafted with care.">
    <title><?= $store_name ?> | Fragrance & Faith</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" href="assets/images/mbslogo.png" type="image/png">
</head>
<body class="bg-[#fdfaf7]">

    <!-- Announcement bar -->
    <div class="announce-bar text-center py-2.5 px-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
        <?= htmlspecialchars($announcement) ?>
    </div>

    <!-- Header -->
    <header class="sticky top-0 z-[100] bg-[#1a1510] text-white border-b border-white/10">
        <div class="max-w-[1400px] mx-auto px-5 md:px-10 py-4 flex items-center justify-between gap-6">
            <!-- Mobile menu toggle -->
            <button data-menu-toggle class="md:hidden text-xl w-10 h-10 flex items-center justify-center hover:text-[#C5A059] transition-colors" aria-label="Open menu">
                <i class="fa-solid fa-bars"></i>
            </button>

            <!-- Logo -->
            <a href="index.php" class="flex items-center gap-3 group">
                <img src="assets/images/mbslogo.png" alt="<?= $store_name ?> Logo" class="h-11 md:h-14 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105">
                <span class="hidden sm:block font-heading text-[13px] md:text-[15px] tracking-editorial uppercase text-[#C5A059]">
                    <?= $store_name ?>
                </span>
            </a>

            <!-- Desktop nav -->
            <nav class="hidden md:flex items-center gap-9 text-[10px] font-bold uppercase tracking-[0.22em]">
                <a href="index.php" class="nav-link <?= $current_page == 'index.php' ? 'active' : '' ?>">Home</a>
                <a href="shop.php" class="nav-link <?= in_array($current_page, array('shop.php', 'category.php')) ? 'active' : '' ?>">Collection</a>
                <?php foreach ($nav_cats as $nc): ?>
                    <a href="<?= $nc['slug'] ? 'category.php?slug=' . htmlspecialchars($nc['slug']) : 'shop.php' ?>" class="nav-link"><?= htmlspecialchars($nc['name']) ?></a>
                <?php endforeach; ?>
                <a href="about.php" class="nav-link <?= $current_page == 'about.php' ? 'active' : '' ?>">Our Story</a>
                <a href="contact.php" class="nav-link <?= $current_page == 'contact.php' ? 'active' : '' ?>">Contact</a>
            </nav>

            <!-- Cart -->
            <a href="cart.php" class="relative flex items-center gap-2 text-white hover:text-[#C5A059] transition-colors" aria-label="View bag">
                <i class="fa-solid fa-bag-shopping text-lg md:text-xl"></i>
                <span class="hidden md:inline text-[10px] font-bold uppercase tracking-[0.2em]">Bag</span>
                <span class="cart-badge"><?= (int)$cart_count ?></span>
            </a>
        </div>

        <!-- Mobile slide-in menu -->
        <div data-menu-panel class="mobile-menu fixed inset-y-0 right-0 w-[82%] max-w-sm bg-[#1a1510] text-white z-[110] shadow-2xl flex flex-col">
            <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span class="font-heading tracking-editorial uppercase text-[#C5A059] text-sm">Menu</span>
                <button data-menu-close class="text-xl w-10 h-10 flex items-center justify-center hover:text-[#C5A059] transition-colors" aria-label="Close menu">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <nav class="flex flex-col px-6 py-6 gap-6 text-[11px] font-bold uppercase tracking-[0.22em]">
                <a href="index.php" class="transition-all">Home</a>
                <a href="shop.php" class="transition-all">Collection</a>
                <?php foreach ($nav_cats as $nc): ?>
                    <a href="<?= $nc['slug'] ? 'category.php?slug=' . htmlspecialchars($nc['slug']) : 'shop.php' ?>" class="transition-all"><?= htmlspecialchars($nc['name']) ?></a>
                <?php endforeach; ?>
                <a href="about.php" class="transition-all">Our Story</a>
                <a href="contact.php" class="transition-all">Contact</a>
            </nav>
            <div class="mt-auto px-6 py-6 border-t border-white/10 space-y-4">
                <a href="cart.php" class="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors">
                    <i class="fa-solid fa-bag-shopping"></i> Your Bag (<?= (int)$cart_count ?>)
                </a>
                <a href="https://wa.me/<?= htmlspecialchars($wa_number) ?>" target="_blank" class="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#25D366] transition-colors">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp Order
                </a>
            </div>
        </div>
    </header>
