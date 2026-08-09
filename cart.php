<?php include('config/db.php'); ?>

<?php
// ---------- Cart logic ----------
if (isset($_POST['add_to_cart'])) {
    $pid = (int)($_POST['product_id'] ?? 0);
    $variant = trim($_POST['variant'] ?? '');
    $qty = max(1, (int)($_POST['qty'] ?? 1));
    $price = (float)($_POST['unit_price'] ?? 0);

    if ($pid > 0) {
        $prow = $conn->query("SELECT * FROM products WHERE id = $pid AND status = 1")->fetch_assoc();
        if ($prow) {
            // Server-authoritative price: match a size variant by label first, else base product price
            $vrow = $conn->query("SELECT price FROM variants WHERE product_id = $pid AND variant_type = 'size' AND label = '" . $conn->real_escape_string($variant) . "' LIMIT 1")->fetch_assoc();
            if ($vrow && $vrow['price'] !== null && (float)$vrow['price'] > 0) {
                $price = (float)$vrow['price'];
            } else {
                $price = (float)($prow['sale_price'] > 0 ? $prow['sale_price'] : $prow['regular_price']);
            }
            $key = $pid . ':' . ($variant !== '' ? $variant : 'standard');
            if (isset($_SESSION['cart'][$key])) {
                $_SESSION['cart'][$key]['qty'] += $qty;
            } else {
                $_SESSION['cart'][$key] = array(
                    'product_id' => $pid,
                    'variant'    => $variant,
                    'qty'        => $qty,
                    'price'      => $price
                );
            }
        }
    }
    header('Location: cart.php');
    exit();
}

if (isset($_GET['remove']) && $_GET['remove'] !== '') {
    unset($_SESSION['cart'][$_GET['remove']]);
    header('Location: cart.php');
    exit();
}

if (isset($_GET['qty']) && isset($_GET['key'])) {
    $key = $_GET['key'];
    $delta = (int)$_GET['qty'];
    if (isset($_SESSION['cart'][$key])) {
        $_SESSION['cart'][$key]['qty'] = max(1, $_SESSION['cart'][$key]['qty'] + $delta);
    }
    header('Location: cart.php');
    exit();
}

if (isset($_GET['clear'])) {
    $_SESSION['cart'] = array();
    header('Location: cart.php');
    exit();
}

include('includes/header.php');

$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
$total = 0;
$items = array();
foreach ($cart as $key => $item) {
    $prow = $conn->query("SELECT * FROM products WHERE id = " . (int)$item['product_id'])->fetch_assoc();
    if (!$prow) { unset($_SESSION['cart'][$key]); continue; }
    $unit = (float)($item['price'] > 0 ? $item['price'] : $prow['regular_price']);
    $sub = $unit * (int)$item['qty'];
    $total += $sub;
    $items[] = array('key' => $key, 'p' => $prow, 'item' => $item, 'unit' => $unit, 'sub' => $sub);
}
?>

<section class="bg-[#1a1510] text-white py-14 md:py-20">
    <div class="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <p class="text-[#C5A059] text-[10px] uppercase tracking-mega mb-4">MBS Accessories</p>
        <h1 class="font-heading text-4xl md:text-6xl font-light italic">Your Bag</h1>
    </div>
</section>

<div class="max-w-[1100px] mx-auto px-6 md:px-10 py-14 min-h-[50vh]">
    <?php if (empty($items)): ?>
        <div class="text-center py-20">
            <i class="fa-solid fa-bag-shopping text-5xl text-gray-300 mb-8"></i>
            <p class="text-gray-400 uppercase tracking-[0.25em] text-xs mb-10">Your bag is currently empty.</p>
            <a href="shop.php" class="btn btn-dark rounded-full">Start Shopping</a>
        </div>
    <?php else: ?>
        <div class="space-y-6">
            <?php foreach ($items as $it): ?>
                <?php
                    $img = $it['p']['main_image'] ? $it['p']['main_image'] : 'hero.jpg';
                    $variant = $it['item']['variant'] ? $it['item']['variant'] : '';
                ?>
                <div class="card-frame flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 md:p-7">
                    <a href="product.php?slug=<?= htmlspecialchars($it['p']['slug']) ?>" class="block w-full sm:w-28 h-36 shrink-0 overflow-hidden bg-[#f4efe8]">
                        <img src="assets/uploads/<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($it['p']['name']) ?>" class="w-full h-full object-cover product-media">
                    </a>
                    <div class="flex-grow">
                        <a href="product.php?slug=<?= htmlspecialchars($it['p']['slug']) ?>" class="font-bold uppercase text-xs tracking-[0.12em] hover:text-[#C5A059] transition-colors">
                            <?= htmlspecialchars($it['p']['name']) ?>
                        </a>
                        <?php if ($variant): ?>
                            <p class="text-[10px] text-gray-500 uppercase tracking-[0.18em] mt-1.5">
                                Variant: <span class="text-[#C5A059] font-bold"><?= htmlspecialchars($variant) ?></span>
                            </p>
                        <?php endif; ?>
                        <p class="text-[#C5A059] font-bold text-sm mt-2">Rs. <?= number_format($it['unit']) ?></p>
                        <div class="flex flex-wrap items-center gap-5 mt-4">
                            <div class="inline-flex items-center gap-3 border border-black/15 px-2 py-1.5">
                                <a href="?key=<?= urlencode($it['key']) ?>&qty=-1" class="w-7 h-7 flex items-center justify-center hover:text-[#C5A059] transition-colors"><i class="fa-solid fa-minus text-xs"></i></a>
                                <span class="w-8 text-center text-sm font-bold"><?= (int)$it['item']['qty'] ?></span>
                                <a href="?key=<?= urlencode($it['key']) ?>&qty=1" class="w-7 h-7 flex items-center justify-center hover:text-[#C5A059] transition-colors"><i class="fa-solid fa-plus text-xs"></i></a>
                            </div>
                            <a href="?remove=<?= urlencode($it['key']) ?>" class="text-[10px] uppercase font-bold text-red-800 hover:underline">Remove</a>
                        </div>
                    </div>
                    <div class="text-right font-bold text-base md:text-lg min-w-[90px]">Rs. <?= number_format($it['sub']) ?></div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Summary -->
        <div class="mt-12 bg-white border border-black/10 p-7 md:p-10 rounded-sm shadow-sm">
            <div class="max-w-md ml-auto">
                <div class="summary-row">
                    <span class="text-xs uppercase font-bold tracking-[0.2em] text-gray-500">Subtotal</span>
                    <span class="text-lg font-bold">Rs. <?= number_format($total) ?></span>
                </div>
                <div class="summary-row">
                    <span class="text-xs uppercase font-bold tracking-[0.2em] text-gray-500">Shipping</span>
                    <span class="text-sm text-gray-400">Calculated at checkout</span>
                </div>
                <div class="flex justify-between items-center border-t-2 border-[#1a1510] mt-4 pt-5">
                    <span class="font-heading text-xl italic font-bold">Total</span>
                    <span class="text-2xl font-bold text-[#C5A059]">Rs. <?= number_format($total) ?></span>
                </div>
                <div class="mt-8 flex flex-col gap-3">
                    <a href="checkout.php" class="btn btn-dark w-full rounded-full">Proceed to Checkout</a>
                    <a href="shop.php" class="btn btn-outline w-full rounded-full">Continue Shopping</a>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<?php include('includes/footer.php'); ?>
