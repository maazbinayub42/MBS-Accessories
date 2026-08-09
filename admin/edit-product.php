<?php
include('../config/db.php');
if (!isset($_SESSION['admin_logged_in'])) { header("Location: index.php"); exit(); }

$id = (int)($_GET['id'] ?? 0);
$product = $conn->query("SELECT * FROM products WHERE id = $id")->fetch_assoc();
if (!$product) { header("Location: products.php"); exit(); }

$target_dir = "../assets/uploads/";
if (!file_exists($target_dir)) { mkdir($target_dir, 0777, true); }

// ---- Update ----
if (isset($_POST['update_product'])) {
    $name = trim($_POST['name'] ?? '');
    $cat_id = (int)($_POST['category_id'] ?? 0);
    $price = (float)($_POST['price'] ?? 0);
    $sale = (float)($_POST['sale_price'] ?? 0);
    $desc = trim($_POST['description'] ?? '');
    $stock = (int)($_POST['stock_qty'] ?? 0);
    $sku = trim($_POST['sku'] ?? '');
    $is_featured = isset($_POST['is_featured']) ? 1 : 0;
    $status = isset($_POST['status']) ? 1 : 0;
    $slug = trim($_POST['slug'] ?? '');

    $image_name = $_FILES['image']['name'] ?? '';
    if ($image_name) { move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . basename($image_name)); }

    if ($image_name) {
        $stmt = $conn->prepare("UPDATE products SET category_id=?, name=?, slug=?, description=?, regular_price=?, sale_price=?, stock_qty=?, sku=?, main_image=?, is_featured=?, status=? WHERE id=?");
        $stmt->bind_param("isssddissiii", $cat_id, $name, $slug, $desc, $price, $sale, $stock, $sku, $image_name, $is_featured, $status, $id);
    } else {
        $stmt = $conn->prepare("UPDATE products SET category_id=?, name=?, slug=?, description=?, regular_price=?, sale_price=?, stock_qty=?, sku=?, is_featured=?, status=? WHERE id=?");
        $stmt->bind_param("isssddisiii", $cat_id, $name, $slug, $desc, $price, $sale, $stock, $sku, $is_featured, $status, $id);
    }
    $stmt->execute();

    // Replace size variants
    $conn->query("DELETE FROM variants WHERE product_id = $id AND variant_type = 'size'");
    $first_size = true;
    if (!empty($_POST['size_label']) && is_array($_POST['size_label'])) {
        foreach ($_POST['size_label'] as $i => $label) {
            $label = trim($label);
            if ($label === '') continue;
            $vprice = (float)($_POST['size_price'][$i] ?? 0);
            $vstock = (int)($_POST['size_stock'][$i] ?? 0);
            $vprice_db = $vprice > 0 ? $vprice : null;
            $def = $first_size ? 1 : 0;
            $vs = $conn->prepare("INSERT INTO variants (product_id, variant_type, label, price, stock_qty, is_default) VALUES (?, 'size', ?, ?, ?, ?)");
            $vs->bind_param("isdii", $id, $label, $vprice_db, $vstock, $def);
            $vs->execute();
            $first_size = false;
        }
    }

    // Replace color variants
    $conn->query("DELETE FROM variants WHERE product_id = $id AND variant_type = 'color'");
    $first_color = true;
    if (!empty($_POST['color_label']) && is_array($_POST['color_label'])) {
        foreach ($_POST['color_label'] as $i => $label) {
            $label = trim($label);
            if ($label === '') continue;
            $vstock = (int)($_POST['color_stock'][$i] ?? 0);
            $def = $first_color ? 1 : 0;
            $vs = $conn->prepare("INSERT INTO variants (product_id, variant_type, label, price, stock_qty, is_default) VALUES (?, 'color', ?, NULL, ?, ?)");
            $vs->bind_param("isii", $id, $label, $vstock, $def);
            $vs->execute();
            $first_color = false;
        }
    }

    // Add new gallery images
    if (!empty($_FILES['gallery_images']['name'][0])) {
        $max_sort = (int)$conn->query("SELECT COALESCE(MAX(sort_order),0) AS m FROM product_images WHERE product_id = $id")->fetch_assoc()['m'];
        $order = $max_sort + 1;
        foreach ($_FILES['gallery_images']['name'] as $i => $gname) {
            if ($gname === '' || $_FILES['gallery_images']['error'][$i] !== UPLOAD_ERR_OK) continue;
            if (move_uploaded_file($_FILES['gallery_images']['tmp_name'][$i], $target_dir . basename($gname))) {
                $gi = $conn->prepare("INSERT INTO product_images (product_id, image, sort_order) VALUES (?, ?, ?)");
                $gi->bind_param("isi", $id, $gname, $order);
                $gi->execute();
                $order++;
            }
        }
    }

    // Remove gallery images
    if (!empty($_POST['remove_img'])) {
        foreach ($_POST['remove_img'] as $img_id) {
            $conn->query("DELETE FROM product_images WHERE id = " . (int)$img_id);
        }
    }

    echo "<script>alert('Product Updated!'); window.location='products.php';</script>";
}

$cats = $conn->query("SELECT * FROM categories ORDER BY sort_order ASC, id ASC");
$sizes = $conn->query("SELECT * FROM variants WHERE product_id = $id AND variant_type = 'size' ORDER BY id ASC");
$colors = $conn->query("SELECT * FROM variants WHERE product_id = $id AND variant_type = 'color' ORDER BY id ASC");
$gallery = $conn->query("SELECT * FROM product_images WHERE product_id = $id ORDER BY sort_order ASC, id ASC");

$admin_title = 'Edit Product';
$active_menu = 'products';
include('includes/admin-header.php');
?>

<div class="flex justify-between items-center mb-8">
    <div>
        <h1 class="text-2xl font-bold text-white">Edit Product</h1>
        <p class="text-xs text-gray-500 uppercase tracking-widest mt-1"><?= htmlspecialchars($product['name']) ?></p>
    </div>
    <a href="products.php" class="text-gray-400 hover:text-white transition text-sm"><i class="fas fa-arrow-left mr-2"></i>Back to Products</a>
</div>

<form method="POST" enctype="multipart/form-data" class="max-w-5xl bg-[#1a1d26] p-8 rounded-lg border border-gray-800 shadow-2xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Product Title *</label>
            <input type="text" name="name" value="<?= htmlspecialchars($product['name']) ?>" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" required>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Category *</label>
            <select name="category_id" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" required>
                <?php while ($c = $cats->fetch_assoc()): ?>
                    <option value="<?= (int)$c['id'] ?>" <?= $c['id'] == $product['category_id'] ? 'selected' : '' ?>><?= htmlspecialchars($c['name']) ?></option>
                <?php endwhile; ?>
            </select>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Slug</label>
            <input type="text" name="slug" value="<?= htmlspecialchars($product['slug']) ?>" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">SKU</label>
            <input type="text" name="sku" value="<?= htmlspecialchars($product['sku'] ?? '') ?>" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Price (PKR) *</label>
            <input type="number" step="0.01" name="price" value="<?= htmlspecialchars($product['regular_price']) ?>" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" required>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Sale Price (optional)</label>
            <input type="number" step="0.01" name="sale_price" value="<?= $product['sale_price'] ? htmlspecialchars($product['sale_price']) : '' ?>" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Stock Quantity</label>
            <input type="number" name="stock_qty" value="<?= (int)$product['stock_qty'] ?>" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Main Image</label>
            <div class="flex items-center gap-3">
                <img src="../assets/uploads/<?= htmlspecialchars($product['main_image'] ?? 'hero.jpg') ?>" class="w-14 h-16 object-cover rounded bg-gray-900" alt="">
                <input type="file" name="image" class="text-xs text-gray-500">
            </div>
        </div>
        <div class="md:col-span-2">
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Description</label>
            <textarea name="description" rows="4" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]"><?= htmlspecialchars($product['description']) ?></textarea>
        </div>
    </div>

    <!-- Size variants -->
    <div class="mt-8 border-t border-gray-800 pt-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-bold uppercase tracking-widest text-xs">Size Variants</h3>
            <button type="button" class="text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:text-white transition" onclick="addSizeRow()"><i class="fas fa-plus mr-1"></i>Add Size</button>
        </div>
        <div id="size-rows" class="space-y-3">
            <?php if ($sizes->num_rows): while ($s = $sizes->fetch_assoc()): ?>
                <div class="grid grid-cols-3 gap-3 items-center">
                    <input type="text" name="size_label[]" value="<?= htmlspecialchars($s['label']) ?>" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                    <input type="number" name="size_price[]" value="<?= $s['price'] !== null ? htmlspecialchars($s['price']) : '' ?>" placeholder="Price (optional)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                    <input type="number" name="size_stock[]" value="<?= (int)$s['stock_qty'] ?>" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                </div>
            <?php endwhile; else: ?>
                <div class="grid grid-cols-3 gap-3 items-center">
                    <input type="text" name="size_label[]" placeholder="Label (e.g. 12ml)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                    <input type="number" name="size_price[]" placeholder="Price (optional)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                    <input type="number" name="size_stock[]" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Color variants -->
    <div class="mt-8 border-t border-gray-800 pt-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-bold uppercase tracking-widest text-xs">Color Variants</h3>
            <button type="button" class="text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:text-white transition" onclick="addColorRow()"><i class="fas fa-plus mr-1"></i>Add Color</button>
        </div>
        <div id="color-rows" class="space-y-3">
            <?php if ($colors->num_rows): while ($c = $colors->fetch_assoc()): ?>
                <div class="grid grid-cols-2 gap-3 items-center">
                    <input type="text" name="color_label[]" value="<?= htmlspecialchars($c['label']) ?>" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                    <input type="number" name="color_stock[]" value="<?= (int)$c['stock_qty'] ?>" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                </div>
            <?php endwhile; else: ?>
                <div class="grid grid-cols-2 gap-3 items-center">
                    <input type="text" name="color_label[]" placeholder="Color (e.g. Black)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                    <input type="number" name="color_stock[]" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Gallery -->
    <div class="mt-8 border-t border-gray-800 pt-6">
        <h3 class="text-white font-bold uppercase tracking-widest text-xs mb-4">Gallery Images</h3>
        <?php if ($gallery->num_rows): ?>
            <div class="flex flex-wrap gap-3 mb-4">
                <?php while ($g = $gallery->fetch_assoc()): ?>
                    <div class="relative">
                        <img src="../assets/uploads/<?= htmlspecialchars($g['image']) ?>" class="w-20 h-24 object-cover rounded" alt="">
                        <label class="absolute top-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded cursor-pointer hover:bg-red-600 transition">
                            <input type="checkbox" name="remove_img[]" value="<?= (int)$g['id'] ?>" class="hidden"> ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¢
                        </label>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
        <input type="file" name="gallery_images[]" multiple class="text-xs text-gray-500">
        <p class="text-[10px] text-gray-600 mt-1">Tick the ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¢ on an image to remove it. Select new files to add more.</p>
    </div>

    <div class="flex items-center gap-6 mt-8">
        <label class="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" name="is_featured" <?= $product['is_featured'] ? 'checked' : '' ?> class="w-4 h-4 accent-[#C5A059]"> Featured
        </label>
        <label class="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" name="status" <?= $product['status'] ? 'checked' : '' ?> class="w-4 h-4 accent-[#C5A059]"> Live on site
        </label>
    </div>

    <button type="submit" name="update_product" class="w-full bg-[#C5A059] text-black font-bold py-4 rounded uppercase text-xs tracking-widest hover:bg-white transition duration-500 mt-8">
        Save Changes
    </button>
</form>

<script>
    function addSizeRow() {
        var div = document.createElement('div');
        div.className = 'grid grid-cols-3 gap-3 items-center';
        div.innerHTML =
            '<input type="text" name="size_label[]" placeholder="Label (e.g. 12ml)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">' +
            '<input type="number" name="size_price[]" placeholder="Price (optional)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">' +
            '<input type="number" name="size_stock[]" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">';
        document.getElementById('size-rows').appendChild(div);
    }
    function addColorRow() {
        var div = document.createElement('div');
        div.className = 'grid grid-cols-2 gap-3 items-center';
        div.innerHTML =
            '<input type="text" name="color_label[]" placeholder="Color (e.g. Black)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">' +
            '<input type="number" name="color_stock[]" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">';
        document.getElementById('color-rows').appendChild(div);
    }
</script>

<?php include('includes/admin-footer.php'); ?>
