<?php
include('../config/db.php');
if (!isset($_SESSION['admin_logged_in'])) { header("Location: index.php"); exit(); }

$target_dir = "../assets/uploads/";
if (!file_exists($target_dir)) { mkdir($target_dir, 0777, true); }

if (isset($_POST['save_product'])) {
    $name = trim($_POST['name'] ?? '');
    $cat_id = (int)($_POST['category_id'] ?? 0);
    $price = (float)($_POST['price'] ?? 0);
    $sale = (float)($_POST['sale_price'] ?? 0);
    $desc = trim($_POST['description'] ?? '');
    $stock = (int)($_POST['stock_qty'] ?? 0);
    $sku = trim($_POST['sku'] ?? '');
    $is_featured = isset($_POST['is_featured']) ? 1 : 0;
    $status = isset($_POST['status']) ? 1 : 0;
    $base_slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name));
    $slug = $base_slug . '-' . rand(100, 999);

    $image_name = $_FILES['image']['name'] ?? '';
    if (!$image_name) { echo "<script>alert('Product image required!');</script>"; }
    else {
        move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . basename($image_name));

        $stmt = $conn->prepare("INSERT INTO products (category_id, name, slug, description, regular_price, sale_price, stock_qty, sku, main_image, is_featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssddissii", $cat_id, $name, $slug, $desc, $price, $sale, $stock, $sku, $image_name, $is_featured, $status);
        if ($stmt->execute()) {
            $pid = $conn->insert_id;

            // Size variants
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
                    $vs->bind_param("isdii", $pid, $label, $vprice_db, $vstock, $def);
                    $vs->execute();
                    $first_size = false;
                }
            }

            // Color variants
            $first_color = true;
            if (!empty($_POST['color_label']) && is_array($_POST['color_label'])) {
                foreach ($_POST['color_label'] as $i => $label) {
                    $label = trim($label);
                    if ($label === '') continue;
                    $vstock = (int)($_POST['color_stock'][$i] ?? 0);
                    $def = $first_color ? 1 : 0;
                    $vs = $conn->prepare("INSERT INTO variants (product_id, variant_type, label, price, stock_qty, is_default) VALUES (?, 'color', ?, NULL, ?, ?)");
                    $vs->bind_param("isii", $pid, $label, $vstock, $def);
                    $vs->execute();
                    $first_color = false;
                }
            }

            // Gallery images
            if (!empty($_FILES['gallery_images']['name'][0])) {
                $order = 1;
                foreach ($_FILES['gallery_images']['name'] as $i => $gname) {
                    if ($gname === '' || $_FILES['gallery_images']['error'][$i] !== UPLOAD_ERR_OK) continue;
                    $target_file = $target_dir . basename($gname);
                    if (move_uploaded_file($_FILES['gallery_images']['tmp_name'][$i], $target_file)) {
                        $gi = $conn->prepare("INSERT INTO product_images (product_id, image, sort_order) VALUES (?, ?, ?)");
                        $gi->bind_param("isi", $pid, $gname, $order);
                        $gi->execute();
                        $order++;
                    }
                }
            }

            echo "<script>alert('Product Live Ho Gaya!'); window.location='products.php';</script>";
        }
    }
}

$cats = $conn->query("SELECT * FROM categories ORDER BY sort_order ASC, id ASC");

$admin_title = 'Add Product';
$active_menu = 'add-product';
include('includes/admin-header.php');
?>

<div class="flex justify-between items-center mb-8">
    <div>
        <h1 class="text-2xl font-bold text-white">Launch New Product</h1>
        <p class="text-xs text-gray-500 uppercase tracking-widest mt-1">Products, variants and gallery</p>
    </div>
</div>

<form method="POST" enctype="multipart/form-data" class="max-w-5xl bg-[#1a1d26] p-8 rounded-lg border border-gray-800 shadow-2xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Product Title *</label>
            <input type="text" name="name" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" required>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Category *</label>
            <select name="category_id" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" required>
                <option value="">ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Select ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â</option>
                <?php while ($c = $cats->fetch_assoc()) echo "<option value='" . (int)$c['id'] . "'>" . htmlspecialchars($c['name']) . "</option>"; ?>
            </select>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Price (PKR) *</label>
            <input type="number" step="0.01" name="price" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" required>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Sale Price (optional)</label>
            <input type="number" step="0.01" name="sale_price" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Stock Quantity</label>
            <input type="number" name="stock_qty" value="0" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">SKU (optional)</label>
            <input type="text" name="sku" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]" placeholder="e.g. ATT-001">
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Main Image *</label>
            <input type="file" name="image" class="w-full text-xs text-gray-500" required>
        </div>
        <div>
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Gallery Images (optional, multiple)</label>
            <input type="file" name="gallery_images[]" multiple class="w-full text-xs text-gray-500">
        </div>
        <div class="md:col-span-2">
            <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-2">Description</label>
            <textarea name="description" rows="4" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059]"></textarea>
        </div>
    </div>

    <!-- Size variants -->
    <div class="mt-8 border-t border-gray-800 pt-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-bold uppercase tracking-widest text-xs">Size Variants <span class="text-gray-500 normal-case tracking-normal">(e.g. Attar: 3ml / 6ml / 12ml ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â each with own price)</span></h3>
            <button type="button" class="text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:text-white transition" onclick="addSizeRow()"><i class="fas fa-plus mr-1"></i>Add Size</button>
        </div>
        <div id="size-rows" class="space-y-3">
            <div class="grid grid-cols-3 gap-3 items-center">
                <input type="text" name="size_label[]" placeholder="Label (e.g. 12ml)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                <input type="number" name="size_price[]" placeholder="Price (optional)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                <input type="number" name="size_stock[]" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
            </div>
        </div>
    </div>

    <!-- Color variants -->
    <div class="mt-8 border-t border-gray-800 pt-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-bold uppercase tracking-widest text-xs">Color Variants <span class="text-gray-500 normal-case tracking-normal">(e.g. Kufi: Black / White)</span></h3>
            <button type="button" class="text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:text-white transition" onclick="addColorRow()"><i class="fas fa-plus mr-1"></i>Add Color</button>
        </div>
        <div id="color-rows" class="space-y-3">
            <div class="grid grid-cols-2 gap-3 items-center">
                <input type="text" name="color_label[]" placeholder="Color (e.g. Black)" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                <input type="number" name="color_stock[]" placeholder="Stock" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
            </div>
        </div>
    </div>

    <div class="flex items-center gap-6 mt-8">
        <label class="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" name="is_featured" class="w-4 h-4 accent-[#C5A059]"> Featured
        </label>
        <label class="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" name="status" checked class="w-4 h-4 accent-[#C5A059]"> Live on site
        </label>
    </div>

    <button type="submit" name="save_product" class="w-full bg-[#C5A059] text-black font-bold py-4 rounded uppercase text-xs tracking-widest hover:bg-white transition duration-500 mt-8">
        Publish Product
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
