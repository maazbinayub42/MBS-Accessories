<?php
include('../config/db.php');

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: index.php");
    exit();
}

$count_products = $conn->query("SELECT id FROM products")->num_rows;
$count_categories = $conn->query("SELECT id FROM categories")->num_rows;
$count_orders = $conn->query("SELECT id FROM orders")->num_rows;
$revenue = $conn->query("SELECT SUM(grand_total) as total FROM orders WHERE status = 'Delivered'")->fetch_assoc()['total'] ?? 0;
$pending_orders = $conn->query("SELECT id FROM orders WHERE status = 'Pending'")->num_rows;

$recent_orders = $conn->query("SELECT * FROM orders ORDER BY id DESC LIMIT 6");
$recent_products = $conn->query("SELECT p.*, c.name AS cat_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.id DESC LIMIT 5");

$admin_title = 'Dashboard';
$active_menu = 'dashboard';
include('includes/admin-header.php');
?>

<div class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <div>
        <h1 class="text-2xl font-bold text-white">Business Overview</h1>
        <p class="text-xs text-gray-500 uppercase tracking-widest mt-1">Welcome back, Muhammad Bin Saqib</p>
    </div>
    <a href="add-product.php" class="bg-[#C5A059] text-black font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-white transition">
        <i class="fas fa-plus mr-2"></i>New Product
    </a>
</div>

<!-- Stats Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
    <div class="bg-[#1a1d26] p-6 rounded-lg border border-gray-800">
        <p class="text-gray-500 text-[10px] uppercase font-bold mb-2">Total Sales</p>
        <h3 class="text-2xl font-bold text-[#C5A059]">Rs. <?= number_format((float)$revenue) ?></h3>
    </div>
    <div class="bg-[#1a1d26] p-6 rounded-lg border border-gray-800">
        <p class="text-gray-500 text-[10px] uppercase font-bold mb-2">Total Orders</p>
        <h3 class="text-2xl font-bold text-white"><?= $count_orders ?></h3>
        <p class="text-[10px] text-amber-500 mt-1 uppercase"><?= $pending_orders ?> pending</p>
    </div>
    <div class="bg-[#1a1d26] p-6 rounded-lg border border-gray-800">
        <p class="text-gray-500 text-[10px] uppercase font-bold mb-2">Categories</p>
        <h3 class="text-2xl font-bold text-white"><?= $count_categories ?></h3>
    </div>
    <div class="bg-[#1a1d26] p-6 rounded-lg border border-gray-800">
        <p class="text-gray-500 text-[10px] uppercase font-bold mb-2">Live Products</p>
        <h3 class="text-2xl font-bold text-white"><?= $count_products ?></h3>
    </div>
</div>

<div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
    <!-- Recent Orders -->
    <div class="bg-[#1a1d26] rounded-lg border border-gray-800 p-6">
        <div class="flex justify-between items-center mb-6">
            <h4 class="text-white font-bold uppercase tracking-widest text-xs">Recent Orders</h4>
            <a href="orders.php" class="text-[#C5A059] text-[10px] uppercase tracking-widest hover:underline">View All →</a>
        </div>
        <?php if ($recent_orders->num_rows): ?>
            <div class="space-y-3">
                <?php while ($o = $recent_orders->fetch_assoc()): ?>
                    <div class="flex items-center justify-between gap-4 bg-[#0a0c10] rounded p-4 border border-gray-800">
                        <div>
                            <p class="text-sm font-bold text-white">#MBS-<?= str_pad($o['id'], 4, '0', STR_PAD_LEFT) ?></p>
                            <p class="text-[11px] text-gray-500 mt-0.5"><?= htmlspecialchars($o['customer_name']) ?> · <?= htmlspecialchars($o['city']) ?></p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-bold text-[#C5A059]">Rs. <?= number_format((float)$o['grand_total']) ?></p>
                            <span class="inline-block mt-1 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full
                                <?= $o['status'] == 'Delivered' ? 'bg-green-900/40 text-green-400' : ($o['status'] == 'Pending' ? 'bg-amber-900/40 text-amber-400' : 'bg-gray-800 text-gray-400') ?>">
                                <?= htmlspecialchars($o['status']) ?>
                            </span>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php else: ?>
            <p class="text-gray-500 text-sm text-center py-8">Abhi koi naya order nahi aaya.</p>
        <?php endif; ?>
    </div>

    <!-- Recent Products -->
    <div class="bg-[#1a1d26] rounded-lg border border-gray-800 p-6">
        <div class="flex justify-between items-center mb-6">
            <h4 class="text-white font-bold uppercase tracking-widest text-xs">Latest Products</h4>
            <a href="products.php" class="text-[#C5A059] text-[10px] uppercase tracking-widest hover:underline">Manage →</a>
        </div>
        <?php if ($recent_products->num_rows): ?>
            <div class="space-y-3">
                <?php while ($p = $recent_products->fetch_assoc()): ?>
                    <div class="flex items-center gap-4 bg-[#0a0c10] rounded p-3 border border-gray-800">
                        <?php $pi = $p['main_image'] ? $p['main_image'] : 'hero.jpg'; ?>
                        <img src="../assets/uploads/<?= htmlspecialchars($pi) ?>" alt="" class="w-12 h-14 object-cover rounded bg-gray-900">
                        <div class="flex-grow">
                            <p class="text-sm font-bold text-white"><?= htmlspecialchars($p['name']) ?></p>
                            <p class="text-[11px] text-gray-500"><?= htmlspecialchars($p['cat_name'] ?? 'Uncategorized') ?> · Rs. <?= number_format((float)$p['regular_price']) ?></p>
                        </div>
                        <span class="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full <?= $p['status'] ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400' ?>">
                            <?= $p['status'] ? 'Live' : 'Hidden' ?>
                        </span>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php else: ?>
            <p class="text-gray-500 text-sm text-center py-8">No products yet.</p>
        <?php endif; ?>
    </div>
</div>

<?php include('includes/admin-footer.php'); ?>
