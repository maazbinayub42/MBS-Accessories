<?php
include('../config/db.php');
if (!isset($_SESSION['admin_logged_in'])) { header("Location: index.php"); exit(); }

// Update status
if (isset($_POST['update_status'])) {
    $oid = (int)$_POST['order_id'];
    $status = $_POST['status'];
    $allowed = array('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled');
    if (in_array($status, $allowed)) {
        $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $oid);
        $stmt->execute();
    }
    echo "<script>window.location='orders.php';</script>";
}

$status_filter = $_GET['status'] ?? 'all';
$where = "WHERE 1";
if ($status_filter !== 'all') { $where .= " AND status = '" . $conn->real_escape_string($status_filter) . "'"; }

$orders = $conn->query("SELECT * FROM orders $where ORDER BY id DESC");

$admin_title = 'Orders';
$active_menu = 'orders';
include('includes/admin-header.php');
?>

<div class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <div>
        <h1 class="text-2xl font-bold text-white">Orders</h1>
        <p class="text-xs text-gray-500 uppercase tracking-widest mt-1">Confirm and fulfil WhatsApp orders</p>
    </div>
    <a href="orders.php" class="text-gray-400 hover:text-white transition text-sm"><i class="fas fa-rotate-right mr-2"></i>Refresh</a>
</div>

<!-- Status filter -->
<div class="flex flex-wrap gap-2 mb-6">
    <?php
    $statuses = array('all', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled');
    foreach ($statuses as $st):
        $label = $st == 'all' ? 'All' : $st;
    ?>
        <a href="orders.php?status=<?= $st ?>"
           class="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition <?= $status_filter == $st ? 'bg-[#C5A059] text-black' : 'bg-[#1a1d26] text-gray-400 border border-gray-800 hover:bg-gray-800' ?>">
            <?= $label ?>
        </a>
    <?php endforeach; ?>
</div>

<div class="space-y-5">
    <?php if ($orders->num_rows === 0): ?>
        <div class="bg-[#1a1d26] rounded-lg border border-gray-800 p-12 text-center">
            <p class="text-gray-500">No orders found.</p>
        </div>
    <?php endif; ?>

    <?php while ($o = $orders->fetch_assoc()): ?>
        <?php $items = $conn->query("SELECT oi.*, p.name, p.main_image FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id = " . (int)$o['id']); ?>
        <div class="bg-[#1a1d26] rounded-lg border border-gray-800 overflow-hidden">
            <!-- Order header -->
            <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-800 bg-[#14161d]">
                <div>
                    <p class="text-white font-bold">#MBS-<?= str_pad($o['id'], 4, '0', STR_PAD_LEFT) ?></p>
                    <p class="text-[11px] text-gray-500 mt-0.5"><?= htmlspecialchars($o['customer_name']) ?> · <?= htmlspecialchars($o['phone']) ?> · <?= htmlspecialchars($o['city']) ?></p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-bold text-[#C5A059]">Rs. <?= number_format((float)$o['grand_total']) ?></p>
                    <p class="text-[10px] text-gray-500 uppercase"><?= date('d M Y, h:i A', strtotime($o['created_at'])) ?></p>
                </div>
            </div>

            <!-- Items -->
            <div class="px-6 py-4">
                <div class="space-y-2">
                    <?php while ($it = $items->fetch_assoc()): ?>
                        <div class="flex items-center gap-3 text-sm">
                            <?php $im = $it['main_image'] ? $it['main_image'] : 'hero.jpg'; ?>
                            <img src="../assets/uploads/<?= htmlspecialchars($im) ?>" class="w-10 h-12 object-cover rounded bg-gray-900" alt="">
                            <span class="flex-grow text-gray-300">
                                <?= htmlspecialchars($it['name']) ?>
                                <?php if ($it['variant']): ?><span class="text-[#C5A059]"> (<?= htmlspecialchars($it['variant']) ?>)</span><?php endif; ?>
                            </span>
                            <span class="text-gray-500">× <?= (int)$it['quantity'] ?></span>
                            <span class="font-semibold text-white w-28 text-right">Rs. <?= number_format((float)$it['price'] * $it['quantity']) ?></span>
                        </div>
                    <?php endwhile; ?>
                </div>

                <div class="flex flex-wrap items-end justify-between gap-4 mt-4 pt-4 border-t border-gray-800/70">
                    <div class="text-[11px] text-gray-500 space-y-1">
                        <p><span class="text-gray-400 uppercase tracking-widest">Subtotal:</span> Rs. <?= number_format((float)$o['subtotal']) ?></p>
                        <p><span class="text-gray-400 uppercase tracking-widest">Shipping:</span> Rs. <?= number_format((float)$o['delivery_charges']) ?></p>
                        <p class="text-gray-300"><span class="text-gray-400 uppercase tracking-widest">Address:</span> <?= htmlspecialchars($o['address']) ?></p>
                    </div>
                    <form method="POST" class="flex items-center gap-2">
                        <input type="hidden" name="order_id" value="<?= (int)$o['id'] ?>">
                        <select name="status" class="bg-[#0a0c10] border border-gray-800 rounded p-2.5 text-white text-sm outline-none focus:border-[#C5A059]">
                            <?php foreach (array('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled') as $st): ?>
                                <option value="<?= $st ?>" <?= $o['status'] == $st ? 'selected' : '' ?>><?= $st ?></option>
                            <?php endforeach; ?>
                        </select>
                        <button type="submit" name="update_status" class="bg-[#C5A059] text-black px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white transition">Update</button>
                    </form>
                </div>
            </div>
        </div>
    <?php endwhile; ?>
</div>

<?php include('includes/admin-footer.php'); ?>
