<?php
// Footer — loads main.js + floating WhatsApp + site footer
if (!isset($wa_number)) $wa_number = '923707107422';
?>
    <!-- Floating WhatsApp -->
    <a href="https://wa.me/<?= htmlspecialchars($wa_number) ?>?text=<?= urlencode('Assalam o Alaikum! I would like to place an order with MBS Accessories.') ?>"
       target="_blank"
       class="wa-float"
       aria-label="Chat on WhatsApp">
        <span class="wa-pulse"></span>
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <!-- Footer -->
    <footer class="bg-[#1a1510] text-white mt-24">
        <div class="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
                <div class="reveal">
                    <img src="assets/images/mbslogo.png" alt="MBS Accessories" class="h-16 object-contain mb-6">
                    <p class="text-gray-400 text-xs leading-relaxed uppercase tracking-wider">
                        Redefining Islamic luxury through spiritual heritage. Premium quality handcrafted fragrances, kufis and imamas.
                    </p>
                </div>
                <div class="reveal">
                    <h4 class="text-[#C5A059] font-bold uppercase mb-6 tracking-[0.25em] text-xs">Quick Links</h4>
                    <ul class="text-[10px] space-y-4 text-gray-400 uppercase tracking-[0.2em]">
                        <li><a href="shop.php" class="footer-link">Full Collection</a></li>
                        <li><a href="category.php?slug=attars" class="footer-link">Attars</a></li>
                        <li><a href="category.php?slug=kufis" class="footer-link">Kufis</a></li>
                        <li><a href="category.php?slug=imamas" class="footer-link">Imamas</a></li>
                        <li><a href="cart.php" class="footer-link">Your Bag</a></li>
                    </ul>
                </div>
                <div class="reveal md:text-right">
                    <h4 class="text-[#C5A059] font-bold uppercase mb-6 tracking-[0.25em] text-xs">Contact</h4>
                    <p class="text-gray-400 text-xs uppercase tracking-widest leading-loose">
                        Islamabad, Pakistan<br>
                        mbsislamicaccessories@gmail.com<br>
                        +92 370 7107422
                    </p>
                    <div class="mt-6 md:flex md:justify-end">
                        <a href="https://wa.me/<?= htmlspecialchars($wa_number) ?>" target="_blank"
                           class="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300">
                            <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            <div class="text-center pt-8 text-[9px] text-gray-600 uppercase tracking-[0.4em]">
                &copy; <?= date('Y') ?> MBS Accessories | All Rights Reserved
            </div>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>
