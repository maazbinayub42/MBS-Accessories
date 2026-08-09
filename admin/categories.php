<?php
include('../config/db.php');
if (!isset($_SESSION['admin_logged_in'])) { header("Location: index.php"); exit(); }

$target_dir = "../assets/uploads/";
if (!file_exists($target_dir)) { mkdir($target_dir, 0777, true); }

// ---- Add ----
if (isset($_POST['add_category'])) {
    $name = trim($_POST['name']);
    $slug = strtolower(str_replace(' ', '-', $name));
    $sort = (int)($_POST['sort_order'] ?? 0);

    $img = $_FILES['image']['name'];
    $banner = $_FILES['banner_image']['name'];

    if ($img) { move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $img); }
    if ($banner) { move_uploaded_file($_FILES['banner_image']['tmp_name'], $target_dir . $banner); }

    $stmt = $conn->prepare("INSERT INTO categories (name, slug, image, banner_image, sort_order) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $name, $slug, $img, $banner, $sort);
    $stmt->execute();
    echo "<script>alert('Category Added!'); window.location='categories.php';</script>";
}

// ---- Edit ----
if (isset($_POST['update_category'])) {
    $id = (int)$_POST['id'];
    $name = trim($_POST['name']);
    $slug = trim($_POST['slug']) !== '' ? trim($_POST['slug']) : strtolower(str_replace(' ', '-', $name));
    $sort = (int)($_POST['sort_order'] ?? 0);
    $status = isset($_POST['status']) ? 1 : 0;

    $img = $_FILES['image']['name'];
    $banner = $_FILES['banner_image']['name'];

    if ($img) { move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $img); }
    if ($banner) { move_uploaded_file($_FILES['banner_image']['tmp_name'], $target_dir . $banner); }

    if ($img || $banner) {
        $stmt = $conn->prepare("UPDATE categories SET name=?, slug=?, sort_order=?, status=?, image=COALESCE(?, image), banner_image=COALESCE(?, banner_image) WHERE id=?");
        $stmt->bind_param("ssiissi", $name, $slug, $sort, $status, $img, $banner, $id);
    } else {
        $stmt = $conn->prepare("UPDATE categories SET name=?, slug=?, sort_order=?, status=? WHERE id=?");
        $stmt->bind_param("ssiii", $name, $slug, $sort, $status, $id);
    }
    $stmt->execute();
    echo "<script>alert('Category Updated!'); window.location='categories.php';</script>";
}

// ---- Delete ----
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $conn->query("UPDATE products SET category_id = NULL WHERE category_id = $id");
    $conn->query("DELETE FROM categories WHERE id = $id");
    echo "<script>window.location='categories.php';</script>";
}

// ---- Toggle status ----
if (isset($_GET['toggle'])) {
    $id = (int)$_GET['toggle'];
    $conn->query("UPDATE categories SET status = 1 - status WHERE id = $id");
    echo "<script>window.location='categories.php';</script>";
}

// Editing a category?
$edit_cat = null;
if (isset($_GET['edit'])) {
    $edit_cat = $conn->query("SELECT * FROM categories WHERE id = " . (int)$_GET['edit'])->fetch_assoc();
}

$categories = $conn->query("SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS prod_count FROM categories c ORDER BY c.sort_order ASC, c.id ASC");

$admin_title = 'Categories';
$active_menu = 'categories';
include('includes/admin-header.php');
?>

<div class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <div>
        <h1 class="text-2xl font-bold text-white">Manage Store Sections</h1>
        <p class="text-xs text-gray-500 uppercase tracking-widest mt-1">Categories drive the homepage sections</p>
    </div>
</div>

<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
    <!-- Form -->
    <div class="bg-[#1a1d26] p-8 rounded-lg border border-gray-800 h-fit">
        <h2 class="text-white font-bold uppercase tracking-widest text-sm mb-6">
            <?= $edit_cat ? 'Edit Category' : 'Add Category' ?>
        </h2>
        <form method="POST" enctype="multipart/form-data" class="space-y-5">
            <?php if ($edit_cat): ?>
                <input type="hidden" name="id" value="<?= (int)$edit_cat['id'] ?>">
            <?php endif; ?>
            <div>
                <label class="block text-[10px] uppercase font-bold text-gray-500 mb-2">Category Name</label>
                <input type="text" name="name" value="<?= htmlspecialchars($edit_cat['name'] ?? '') ?>" class="w-full bg-[#0a0c10] border border-gray-800 p-3 rounded text-white outline-none focus:border-[#C5A059]" placeholder="e.g. Kufis Collection" required>
            </div>
            <?php if ($edit_cat): ?>
                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-500 mb-2">Slug</label>
                    <input type="text" name="slug" value="<?= htmlspecialchars($edit_cat['slug']) ?>" class="w-full bg-[#0a0c10] border border-gray-800 p-3 rounded text-white outline-none focus:border-[#C5A059]">
                </div>
                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-500 mb-2">Sort Order</label>
                    <input type="number" name="sort_order" value="<?= (int)$edit_cat['sort_order'] ?>" class="w-full bg-[#0a0c10] border border-gray-800 p-3 rounded text-white outline-none focus:border-[#C5A059]">
                </div>
                <label class="flex items-center gap-3 text-xs text-gray-400">
                    <input type="checkbox" name="status" <?= $edit_cat['status'] ? 'checked' : '' ?> class="w-4 h-4 accent-[#C5A059]">
                    Active on website
                </label>
            <?php endif; ?>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-500 mb-2">Square Icon</label>
                    <input type="file" name="image" class="text-xs text-gray-500" <?= $edit_cat ? '' : 'required' ?>>
                    <?php if ($edit_cat && $edit_cat['image']): ?>
                        <img src="../assets/uploads/<?= htmlspecialchars($edit_cat['image']) ?>" class="mt-2 w-16 h-16 object-cover rounded" alt="">
                    <?php endif; ?>
                </div>
                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-500 mb-2">Wide Banner</label>
                    <input type="file" name="banner_image" class="text-xs text-gray-500" <?= $edit_cat ? '' : 'required' ?>>
                    <?php if ($edit_cat && $edit_cat['banner_image']): ?>
                        <img src="../assets/uploads/<?= htmlspecialchars($edit_cat['banner_image']) ?>" class="mt-2 w-full h-16 object-cover rounded" alt="">
                    <?php endif; ?>
                </div>
            </div>
            <button type="submit" name="<?= $edit_cat ? 'update_category' : 'add_category' ?>" class="w-full bg-[#C5A059] text-black font-bold py-3 uppercase text-[10px] tracking-widest hover:bg-white transition rounded">
                <?= $edit_cat ? 'Update Category' : 'Create Section' ?>
            </button>
            <?php if ($edit_cat): ?>
                <a href="categories.php" class="block text-center text-gray-500 text-xs hover:text-white transition">Cancel edit</a>
            <?php endif; ?>
        </form>
    </div>

    <!-- List -->
    <div class="xl:col-span-2 bg-[#1a1d26] rounded-lg border border-gray-800 p-6">
        <h2 class="text-white font-bold uppercase tracking-widest text-sm mb-6">Existing Sections</h2>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="text-left text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-800">
                        <th class="pb-3 pr-4">Section</th>
                        <th class="pb-3 pr-4">Products</th>
                        <th class="pb-3 pr-4">Status</th>
                        <th class="pb-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($c = $categories->fetch_assoc()): ?>
                        <tr class="border-b border-gray-800/60">
                            <td class="py-3 pr-4">
                                <div class="flex items-center gap-3">
                                    <?php $ci = $c['image'] ? $c['image'] : ($c['banner_image'] ? $c['banner_image'] : null); ?>
                                    <?php if ($ci): ?>
                                        <img src="../assets/uploads/<?= htmlspecialchars($ci) ?>" class="w-10 h-10 object-cover rounded" alt="">
                                    <?php endif; ?>
                                    <div>
                                        <p class="font-bold text-white"><?= htmlspecialchars($c['name']) ?></p>
                                        <p class="text-[10px] text-gray-500">/<?= htmlspecialchars($c['slug']) ?></p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 pr-4 text-gray-400"><?= (int)$c['prod_count'] ?></td>
                            <td class="py-3 pr-4">
                                <a href="?toggle=<?= (int)$c['id'] ?>" class="text-[9px] uppercase font-bold px-2 py-1 rounded-full <?= $c['status'] ? 'bg-green-900/40 text-green-400 hover:bg-green-800/40' : 'bg-red-900/40 text-red-400 hover:bg-red-800/40' ?>">
                                    <?= $c['status'] ? 'Live' : 'Hidden' ?>
                                </a>
                            </td>
                            <td class="py-3">
                                <div class="flex gap-2">
                                    <a href="?edit=<?= (int)$c['id'] ?>" class="text-[#C5A059] hover:text-white transition" title="Edit"><i class="fas fa-pen"></i></a>
                                    <a href="?delete=<?= (int)$c['id'] ?>" class="text-red-400 hover:text-red-300 transition" title="Delete" onclick="return confirm('Delete this category? Its products will become uncategorized.');"><i class="fas fa-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include('includes/admin-footer.php'); ?>
