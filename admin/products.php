<?php
include('../config/db.php');
if (!isset($_SESSION['admin_logged_in'])) { header("Location: index.php"); exit(); }

// Toggle status
if (isset($_GET['toggle'])) {
    $id = (int)$_GET['toggle'];
    $conn->query("UPDATE products SET status = 1 - status WHERE id = $id");
    echo "<script>window.location='products.php';</script>";
}

// Delete
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $conn->query("DELETE FROM products WHERE id = $id"); // cascades to variants, product_images
    echo "<script>alert('Product deleted.'); window.location='products.php';</script>";
}

// Search / filter
$where = "WHERE 1";
if (isset($_GET['q']) && trim($_GET['q']) !== '') {
    $q = $conn->real_escape_string(trim($_GET['q']));
    $where .= " AND p.name LIKE '%$q%'";
}
if (isset($_GET['cat']) && (int)$_GET['cat'] > 0) {
    $where .= " AND p.category_id = " . (int)$_GET['cat'];
}

$products = $conn->query("SELECT p.*, c.name AS cat_name FROM products p LEFT JOIN categories c ON c.id = p.category_id $where ORDER BY p.id DESC");
$cats = $conn->query("SELECT * FROM categories ORDER BY sort_order ASC, id ASC");

$admin_title = 'Products';
$active_menu = 'products';
include('includes/admin-header.php');
?>

<div class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <div>
        <h1 class="text-2xl font-bold text-white">Products</h1>
        <p class="text-xs text-gray-500 uppercase tracking-widest mt-1">Manage catalogue, availability and pricing</p>
    </div>
    <a href="add-product.php" class="bg-[#C5A059] text-black font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-white transition">
        <i class="fas fa-plus mr-2"></i>Add Product
    </a>
</div>

<!-- Filters -->
<form method="GET" action="products.php" class="flex flex-wrap gap-3 mb-8">
    <input type="text" name="q" value="<?= htmlspecialchars($_GET['q'] ?? '') ?>" placeholder="Search products…" class="bg-[#0a0c10] border border-gray-800 rounded p-3 text-white text-sm outline-none focus:border-[#C5A059]">
    <select name="cat" class="bg-[#0a0c10] border border-gray-800 rounded p-3 text-white text-sm outline-none focus:border-[#C5A059]">
        <option value="">All Categories</option>
        <?php while ($c = $cats->fetch_assoc()): ?>
            <option value="<?= (int)$c['id'] ?>" <?= isset($_GET['cat']) && (int)$_GET['cat'] == $c['id'] ? 'selected' : '' ?>><?= htmlspecialchars($c['name']) ?></option>
        <?php endwhile; ?>
    </select>
    <button type="submit" class="bg-white text-black px-5 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition">Filter</button>
</form>

<!-- Table -->
<div class="bg-[#1a1d26] rounded-lg border border-gray-800 p-6 overflow-x-auto">
    <table class="w-full text-sm min-w-[760px]">
        <thead>
            <tr class="text-left text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-800">
                <th class="pb-3 pr-4">Product</th>
                <th class="pb-3 pr-4">Category</th>
                <th class="pb-3 pr-4">Price</th>
                <th class="pb-3 pr-4">Variants</th>
                <th class="pb-3 pr-4">Status</th>
                <th class="pb-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php if ($products->num_rows === 0): ?>
                <tr><td colspan="6" class="py-8 text-center text-gray-500">No products found.</td></tr>
            <?php endif; ?>
            <?php while ($p = $products->fetch_assoc()):
                $vcount = $conn->query("SELECT COUNT(*) AS n FROM variants WHERE product_id = " . (int)$p['id'])->fetch_assoc()['n'];
                $img = $p['main_image'] ? $p['main_image'] : 'hero.jpg';
            ?>
                <tr class="border-b border-gray-800/60 hover:bg-gray-900/40">
                    <td class="py-3 pr-4">
                        <div class="flex items-center gap-3">
                            <img src="../assets/uploads/<?= htmlspecialchars($img) ?>" class="w-12 h-14 object-cover rounded bg-gray-900" alt="">
                            <div>
                                <p class="font-bold text-white"><?= htmlspecialchars($p['name']) ?></p>
                                <p class="text-[10px] text-gray-500"><?= htmlspecialchars($p['sku'] ?? '—') ?></p>
                            </div>
                        </div>
                    </td>
                    <td class="py-3 pr-4 text-gray-400"><?= htmlspecialchars($p['cat_name'] ?? '—') ?></td>
                    <td class="py-3 pr-4">
                        <p class="font-bold text-[#C5A059]">Rs. <?= number_format((float)$p['regular_price']) ?></p>
                        <?php if ($p['sale_price'] > 0): ?>
                            <p class="text-[10px] text-green-500 uppercase">Sale: Rs. <?= number_format((float)$p['sale_price']) ?></p>
                        <?php endif; ?>
                    </td>
                    <td class="py-3 pr-4 text-gray-400"><?= $vcount ?> variant<?= $vcount == 1 ? '' : 's' ?></td>
                    <td class="py-3 pr-4">
                        <a href="?toggle=<?= (int)$p['id'] ?>" class="text-[9px] uppercase font-bold px-2 py-1 rounded-full <?= $p['status'] ? 'bg-green-900/40 text-green-400 hover:bg-green-800/40' : 'bg-red-900/40 text-red-400 hover:bg-red-800/40' ?>">
                            <?= $p['status'] ? 'Live' : 'Hidden' ?>
                        </a>
                    </td>
                    <td class="py-3">
                        <div class="flex gap-2">
                            <a href="edit-product.php?id=<?= (int)$p['id'] ?>" class="text-[#C5A059] hover:text-white transition" title="Edit"><i class="fas fa-pen"></i></a>
                            <a href="../product.php?slug=<?= htmlspecialchars($p['slug']) ?>" target="_blank" class="text-gray-400 hover:text-white transition" title="View"><i class="fas fa-eye"></i></a>
                            <a href="?delete=<?= (int)$p['id'] ?>" class="text-red-400 hover:text-red-300 transition" title="Delete" onclick="return confirm('Delete this product and its variants?');"><i class="fas fa-trash"></i></a>
                        </div>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>

<?php include('includes/admin-footer.php'); ?>
