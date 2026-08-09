<?php
/**
 * Shared admin header + sidebar layout.
 * Pages must include ../config/db.php and run their auth check BEFORE this file.
 * Expected variables: $admin_title (string), $active_menu (string)
 */
if (!isset($admin_title)) $admin_title = 'MBS Admin';
if (!isset($active_menu)) $active_menu = 'dashboard';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBS Admin | <?= htmlspecialchars($admin_title) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-[#0a0c10] text-gray-300 font-sans">
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-60 md:w-64 bg-[#1a1d26] h-screen sticky top-0 p-6 border-r border-gray-800 flex flex-col">
            <a href="dashboard.php" class="mb-10 block">
                <h2 class="text-xl md:text-2xl font-bold text-[#C5A059] italic tracking-tight">MBS CONTROL</h2>
                <p class="text-[9px] text-gray-500 uppercase tracking-[0.3em] mt-1">Accessories Admin</p>
            </a>
            <nav class="space-y-1.5 text-sm flex-1">
                <a href="dashboard.php" class="flex items-center gap-3 p-3 rounded transition <?= $active_menu == 'dashboard' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-gray-800' ?>">
                    <i class="fas fa-gauge-high w-5 text-center"></i> <span>Dashboard</span>
                </a>
                <a href="categories.php" class="flex items-center gap-3 p-3 rounded transition <?= $active_menu == 'categories' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-gray-800' ?>">
                    <i class="fas fa-list w-5 text-center"></i> <span>Categories</span>
                </a>
                <a href="products.php" class="flex items-center gap-3 p-3 rounded transition <?= $active_menu == 'products' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-gray-800' ?>">
                    <i class="fas fa-box w-5 text-center"></i> <span>Products</span>
                </a>
                <a href="add-product.php" class="flex items-center gap-3 p-3 rounded transition <?= $active_menu == 'add-product' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-gray-800' ?>">
                    <i class="fas fa-plus-circle w-5 text-center"></i> <span>Add Product</span>
                </a>
                <a href="orders.php" class="flex items-center gap-3 p-3 rounded transition <?= $active_menu == 'orders' ? 'bg-[#C5A059] text-black font-bold' : 'hover:bg-gray-800' ?>">
                    <i class="fas fa-shopping-cart w-5 text-center"></i> <span>Orders</span>
                </a>
            </nav>
            <div class="pt-6 border-t border-gray-800 mt-6">
                <a href="logout.php" class="flex items-center gap-3 p-3 rounded text-red-400 hover:bg-red-900/20 transition text-sm">
                    <i class="fas fa-sign-out-alt w-5 text-center"></i> <span>Logout</span>
                </a>
            </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 p-6 md:p-10 overflow-x-auto">
