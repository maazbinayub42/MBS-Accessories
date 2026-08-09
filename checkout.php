<?php include('config/db.php'); ?>
<?php include('config/shipping.php'); ?>

<?php
// ---------- WhatsApp order number ----------
$wa_number = '923707107422';
$wa_res = $conn->query("SELECT setting_value FROM settings WHERE setting_key = 'whatsapp_number'");
if ($wa_res && $wa_res->num_rows) { $wa_number = $wa_res->fetch_assoc()['setting_value']; }

// ---------- Order submission (POST) ----------
if (isset($_POST['place_order'])) {
    $customer_name = trim($_POST['customer_name'] ?? '');
    $phone         = trim($_POST['phone'] ?? '');
    $whatsapp      = trim($_POST['whatsapp'] ?? '');
    $email         = trim($_POST['email'] ?? '');
    $city          = trim($_POST['city'] ?? '');
    $address       = trim($_POST['address'] ?? '');
    $notes         = trim($_POST['notes'] ?? '');

    $cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
    $order_items = array();
    $subtotal = 0;
    foreach ($cart as $key => $item) {
        $prow = $conn->query("SELECT * FROM products WHERE id = " . (int)$item['product_id'])->fetch_assoc();
        if (!$prow) continue;
        $unit = (float)($item['price'] > 0 ? $item['price'] : $prow['regular_price']);
        $qty = max(1, (int)$item['qty']);
        $subtotal += $unit * $qty;
        $order_items[] = array('p' => $prow, 'variant' => trim($item['variant'] ?? ''), 'unit' => $unit, 'qty' => $qty);
    }

    if (!empty($order_items) && $customer_name !== '' && $phone !== '' && $city !== '') {
        $shipping = get_shipping_charge($city);
        $grand_total = $subtotal + $shipping;

        $stmt = $conn->prepare("INSERT INTO orders (customer_name, phone, whatsapp, email, city, address, notes, subtotal, delivery_charges, grand_total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')");
        $stmt->bind_param("sssssssddd", $customer_name, $phone, $whatsapp, $email, $city, $address, $notes, $subtotal, $shipping, $grand_total);
        if ($stmt->execute()) {
            $order_id = $conn->insert_id;
            foreach ($order_items as $oi) {
                $oi_stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, variant, price, quantity) VALUES (?, ?, ?, ?, ?)");
                $oi_stmt->bind_param("iisdi", $order_id, $oi['p']['id'], $oi['variant'], $oi['unit'], $oi['qty']);
                $oi_stmt->execute();
            }
            $_SESSION['cart'] = array();
            header('Location: checkout.php?success=' . $order_id);
            exit();
        }
        $error_msg = 'Order could not be saved. Please try again.';
    } else {
        $error_msg = 'Please fill in your name, phone and city.';
    }
}


// ---------- Order success view (after POST redirect) ----------
if (isset($_GET['success'])) {
    $order_id = (int)$_GET['success'];
    $order = $conn->query("SELECT * FROM orders WHERE id = $order_id")->fetch_assoc();
    if (!$order) { header('Location: cart.php'); exit(); }
    $items = $conn->query("SELECT oi.*, p.name, p.main_image FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id = $order_id");
    include('includes/header.php');

    // Build professional WhatsApp message
    $lines = array();
    $lines[] = '*NEW ORDER — MBS ACCESSORIES*';
    $lines[] = '';
    $lines[] = '👤 *Customer:* ' . $order['customer_name'];
    $lines[] = '📞 *Phone:* ' . $order['phone'];
    if (!empty($order['whatsapp'])) { $lines[] = '💬 *WhatsApp:* ' . $order['whatsapp']; }
    if (!empty($order['email'])) { $lines[] = '📧 *Email:* ' . $order['email']; }
    $lines[] = '🏙 *City:* ' . $order['city'];
    $lines[] = '📍 *Address:* ' . $order['address'];
    $lines[] = '';
    $lines[] = '*🧾 ORDER DETAILS*';
    $i = 1;
    $items_q = $conn->query("SELECT oi.*, p.name FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id WHERE oi.order_id = $order_id");
    while ($it = $items_q->fetch_assoc()) {
        $v = $it['variant'] ? ' (' . $it['variant'] . ')' : '';
        $lines[] = $i . '. ' . $it['name'] . $v . ' × ' . (int)$it['quantity'] . ' = Rs. ' . number_format($it['price'] * $it['quantity']);
        $i++;
    }
    $lines[] = '';
    $lines[] = '💰 *Subtotal:* Rs. ' . number_format($order['subtotal']);
    $lines[] = '🚚 *Delivery (Leopard):* Rs. ' . number_format($order['delivery_charges']);
    $lines[] = '━━━━━━━━━━━━━━━━';
    $lines[] = '💎 *GRAND TOTAL: Rs. ' . number_format($order['grand_total']) . '*';
    if (!empty($order['notes'])) {
        $lines[] = '';
        $lines[] = '📝 *Order Notes:*';
        $lines[] = $order['notes'];
    }
    $lines[] = '';
    $lines[] = 'oh ji shukriya ji bhut bhut ji 💕💖';
    $wa_text = implode("\n", $lines);
    $wa_url = 'https://wa.me/' . $wa_number . '?text=' . rawurlencode($wa_text);
?>

<div class="max-w-2xl mx-auto px-6 py-16 md:py-24 text-center">
    <div class="reveal in">
        <!-- Confirmation popup card -->
        <div class="bg-white border border-black/10 rounded-lg shadow-2xl overflow-hidden text-left max-w-lg mx-auto">
            <div class="bg-[#1a1510] text-white px-8 py-10 text-center">
                <div class="w-16 h-16 mx-auto rounded-full bg-[#C5A059]/20 flex items-center justify-center mb-5">
                    <i class="fa-solid fa-check text-3xl text-[#C5A059]"></i>
                </div>
                <p class="text-[10px] uppercase tracking-mega text-[#C5A059] mb-3">Order Confirmed</p>
                <h1 class="font-heading text-3xl font-light italic leading-snug">oh ji shukriya ji<br>bhut bhut ji 💕💖</h1>
                <p class="text-white/50 text-xs mt-4">Order <span class="text-[#C5A059] font-bold">#MBS-<?= str_pad($order_id, 4, '0', STR_PAD_LEFT) ?></span></p>
            </div>

            <div class="px-7 md:px-9 py-8">
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                    Thank you, <span class="text-[#1a1510] font-bold"><?= htmlspecialchars($order['customer_name']) ?></span>.
                    Your order from <span class="text-[#1a1510] font-bold"><?= htmlspecialchars($order['city']) ?></span> is ready.
                </p>

                <div class="space-y-2.5">
                    <?php while ($it = $items->fetch_assoc()): ?>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600"><?= htmlspecialchars($it['name']) ?><?= $it['variant'] ? ' <span class="text-[#C5A059]">(' . htmlspecialchars($it['variant']) . ')</span>' : '' ?> × <?= (int)$it['quantity'] ?></span>
                            <span class="font-semibold">Rs. <?= number_format($it['price'] * $it['quantity']) ?></span>
                        </div>
                    <?php endwhile; ?>
                </div>

                <div class="border-t border-black/10 mt-5 pt-4 space-y-2 text-sm">
                    <div class="flex justify-between"><span class="text-gray-500">Product Total</span><span>Rs. <?= number_format($order['subtotal']) ?></span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Delivery (Leopard)</span><span>Rs. <?= number_format($order['delivery_charges']) ?></span></div>
                    <?php if (!empty($order['notes'])): ?>
                        <div class="flex justify-between items-start gap-4"><span class="text-gray-500 shrink-0">Notes</span><span class="text-right italic text-xs leading-relaxed"><?= nl2br(htmlspecialchars($order['notes'])) ?></span></div>
                    <?php endif; ?>
                    <div class="flex justify-between items-center text-lg font-bold pt-2 border-t border-black/10">
                        <span>Grand Total</span><span class="text-[#C5A059]">Rs. <?= number_format($order['grand_total']) ?></span>
                    </div>
                </div>

                <a href="<?= htmlspecialchars($wa_url) ?>" target="_blank" class="btn btn-wa w-full rounded-full mt-8" id="wa-confirm">
                    <i class="fa-brands fa-whatsapp text-lg"></i> Continue to WhatsApp
                </a>
                <p class="text-[10px] text-gray-400 uppercase tracking-[0.2em] text-center mt-4">
                    Opening WhatsApp automatically in a moment…
                </p>
            </div>
        </div>
    </div>
</div>

<script>
    (function () {
        var url = <?= json_encode($wa_url) ?>;
        setTimeout(function () { window.open(url, '_blank'); }, 4000);
    })();
</script>

<?php include('includes/footer.php'); ?>
<?php exit(); }
// ==============================================================
// Checkout form view (default)
// ==============================================================

$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
$items = array();
$subtotal = 0;
foreach ($cart as $key => $item) {
    $prow = $conn->query("SELECT * FROM products WHERE id = " . (int)$item['product_id'])->fetch_assoc();
    if (!$prow) { unset($_SESSION['cart'][$key]); continue; }
    $unit = (float)($item['price'] > 0 ? $item['price'] : $prow['regular_price']);
    $qty = max(1, (int)$item['qty']);
    $sub = $unit * $qty;
    $subtotal += $sub;
    $items[] = array('p' => $prow, 'item' => $item, 'unit' => $unit, 'qty' => $qty, 'sub' => $sub);
}

if (empty($items)) { header('Location: cart.php'); exit(); }

include('includes/header.php');

// Live shipping preview config (single source of truth: config/shipping.php)
$shipping_json = shipping_json();
?>

<section class="bg-[#1a1510] text-white py-14 md:py-20">
    <div class="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <p class="text-[#C5A059] text-[10px] uppercase tracking-mega mb-4">Leopard Courier</p>
        <h1 class="font-heading text-4xl md:text-6xl font-light italic">Checkout</h1>
    </div>
</section>

<div class="max-w-[1200px] mx-auto px-6 md:px-10 py-14" data-checkout-page data-subtotal="<?= $subtotal ?>">
    <script>window.MBS_SHIPPING = <?= $shipping_json ?>;</script>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <!-- Left: Customer form -->
        <form method="POST" action="checkout.php" id="order-form" class="lg:col-span-3 space-y-6">
            <div class="card-frame p-7 md:p-9">
                <h2 class="font-heading text-2xl font-light uppercase tracking-editorial mb-8">Delivery Details</h2>

                <?php if (!empty($error_msg)): ?>
                    <div class="bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm p-4 mb-6">
                        <i class="fa-solid fa-circle-exclamation mr-2"></i><?= htmlspecialchars($error_msg) ?>
                    </div>
                <?php endif; ?>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Full Name *</label>
                        <input type="text" name="customer_name" class="field" required placeholder="Muhammad Ahmed">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Phone *</label>
                        <input type="tel" name="phone" class="field" required placeholder="03XX-XXXXXXX">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">City *</label>
                        <input type="text" name="city" data-city class="field" required placeholder="Islamabad / Lahore / …" list="city-list">
                        <datalist id="city-list">
                            <?php
                            global $RWP_ISL_CITIES, $MAJOR_CITIES;
                            foreach ($RWP_ISL_CITIES as $rc) echo "<option value=\"" . htmlspecialchars(ucwords($rc)) . "\">";
                            foreach ($MAJOR_CITIES as $mc) echo "<option value=\"" . htmlspecialchars(ucwords($mc)) . "\">";
                            ?>
                        </datalist>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">WhatsApp (if different)</label>
                        <input type="tel" name="whatsapp" class="field" placeholder="Optional">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Email (optional)</label>
                        <input type="email" name="email" class="field" placeholder="you@email.com">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Delivery Address *</label>
                        <textarea name="address" rows="3" class="field" required placeholder="House, street, area…"></textarea>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Order Notes (optional)</label>
                        <textarea name="notes" rows="2" class="field" placeholder="Any delivery or product instructions…"></textarea>
                    </div>
                </div>
            </div>

            <!-- Shipping info -->
            <div class="bg-[#1a1510] text-white rounded-sm p-6 md:p-8">
                <h3 class="text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em] mb-5"><i class="fa-solid fa-truck-fast mr-2"></i>Leopard Courier Charges</h3>
                <div class="space-y-2.5 text-sm">
                    <div class="flex justify-between border-b border-white/10 pb-2.5"><span>Rawalpindi / Islamabad</span><span class="font-bold">Rs. <?= SHIPPING_RWP_ISL ?></span></div>
                    <div class="flex justify-between border-b border-white/10 pb-2.5"><span>Major Cities</span><span class="font-bold">Rs. <?= SHIPPING_MAJOR_CITIES ?></span></div>
                    <div class="flex justify-between"><span>Other Cities</span><span class="font-bold">Rs. <?= SHIPPING_OTHER ?></span></div>
                </div>
            </div>
        </form>

        <!-- Right: Order summary -->
        <div class="lg:col-span-2">
            <div class="card-frame p-7 md:p-8 lg:sticky lg:top-32">
                <h2 class="font-heading text-2xl font-light uppercase tracking-editorial mb-6">Order Summary</h2>

                <div class="space-y-4 mb-8">
                    <?php foreach ($items as $it): ?>
                        <?php $img = $it['p']['main_image'] ? $it['p']['main_image'] : 'hero.jpg'; ?>
                        <div class="flex gap-4 items-center">
                            <div class="w-16 h-20 shrink-0 overflow-hidden bg-[#f4efe8]">
                                <img src="assets/uploads/<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($it['p']['name']) ?>" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-grow">
                                <p class="text-xs font-bold uppercase tracking-[0.1em]"><?= htmlspecialchars($it['p']['name']) ?></p>
                                <?php if ($it['item']['variant']): ?>
                                    <p class="text-[10px] text-gray-500 mt-1"><?= htmlspecialchars($it['item']['variant']) ?> × <?= $it['qty'] ?></p>
                                <?php else: ?>
                                    <p class="text-[10px] text-gray-500 mt-1">Qty <?= $it['qty'] ?></p>
                                <?php endif; ?>
                            </div>
                            <span class="text-sm font-semibold">Rs. <?= number_format($it['sub']) ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="summary-row text-sm"><span class="text-gray-500">Product Total</span><span class="font-semibold">Rs. <?= number_format($subtotal) ?></span></div>
                <div class="summary-row text-sm">
                    <span class="text-gray-500">Shipping <span data-shipping-zone class="text-[10px] text-gray-400 normal-case tracking-normal">(enter city)</span></span>
                    <span data-shipping-value class="font-semibold">Rs. 0</span>
                </div>
                <div class="flex justify-between items-center border-t-2 border-[#1a1510] mt-4 pt-5">
                    <span class="font-heading text-xl italic font-bold">Grand Total</span>
                    <span data-grand-value class="text-2xl font-bold text-[#C5A059]">Rs. <?= number_format($subtotal) ?></span>
                </div>

                <button type="submit" name="place_order" form="order-form" class="btn btn-dark w-full rounded-full mt-8">
                    <i class="fa-brands fa-whatsapp"></i> Place Order on WhatsApp
                </button>
                <p class="text-[10px] text-gray-400 uppercase tracking-[0.2em] text-center mt-4">
                    Cash on Delivery · We confirm via WhatsApp
                </p>
            </div>
        </div>
    </div>
</div>

<!-- The delivery form is submitted from the summary button via the form attribute -->
<?php include('includes/footer.php'); ?>
<script src="assets/js/checkout.js"></script>
