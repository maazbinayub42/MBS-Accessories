<?php include('includes/header.php'); ?>

<!-- Contact Hero -->
<section class="bg-[#1a1510] text-white py-20 md:py-28">
    <div class="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <p class="text-[#C5A059] text-[10px] uppercase tracking-mega mb-4">Get in Touch</p>
        <h1 class="font-heading text-4xl md:text-7xl font-light italic">Contact Us</h1>
        <p class="text-white/70 text-[10px] uppercase tracking-[0.28em] mt-5">We reply within hours</p>
    </div>
</section>

<section class="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="space-y-8 reveal">
            <div class="flex items-start gap-5">
                <div class="w-12 h-12 rounded-full bg-[#C5A059]/12 flex items-center justify-center shrink-0">
                    <i class="fa-brands fa-whatsapp text-xl text-[#C5A059]"></i>
                </div>
                <div>
                    <h3 class="font-bold uppercase tracking-[0.2em] text-xs mb-1.5">WhatsApp Orders</h3>
                    <p class="text-gray-600 text-sm">+92 370 7107422</p>
                    <a href="https://wa.me/<?= htmlspecialchars($wa_number ?? '923707107422') ?>" target="_blank" class="inline-block mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:underline">Start a Chat →</a>
                </div>
            </div>
            <div class="flex items-start gap-5">
                <div class="w-12 h-12 rounded-full bg-[#C5A059]/12 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-envelope text-xl text-[#C5A059]"></i>
                </div>
                <div>
                    <h3 class="font-bold uppercase tracking-[0.2em] text-xs mb-1.5">Email</h3>
                    <p class="text-gray-600 text-sm">mbsislamicaccessories@gmail.com</p>
                </div>
            </div>
            <div class="flex items-start gap-5">
                <div class="w-12 h-12 rounded-full bg-[#C5A059]/12 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-location-dot text-xl text-[#C5A059]"></i>
                </div>
                <div>
                    <h3 class="font-bold uppercase tracking-[0.2em] text-xs mb-1.5">Location</h3>
                    <p class="text-gray-600 text-sm">Islamabad, Pakistan</p>
                </div>
            </div>
        </div>

        <form method="POST" action="contact.php" class="card-frame p-8 md:p-10 reveal">
            <h2 class="font-heading text-2xl font-light uppercase tracking-editorial mb-8">Send a Message</h2>
            <?php if (isset($_POST['send_message'])): ?>
                <div class="bg-green-50 border border-green-200 text-green-700 text-xs rounded-sm p-4 mb-6">
                    <i class="fa-solid fa-check mr-2"></i>Shukriya! Your message has been received. We will reply soon. 💕
                </div>
            <?php endif; ?>
            <div class="space-y-5">
                <div>
                    <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Your Name *</label>
                    <input type="text" name="name" class="field" required>
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Phone / WhatsApp *</label>
                    <input type="tel" name="phone" class="field" required>
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Message *</label>
                    <textarea name="message" rows="5" class="field" required></textarea>
                </div>
                <button type="submit" name="send_message" class="btn btn-dark w-full rounded-full">Send Message</button>
            </div>
        </form>
    </div>
</section>

<?php include('includes/footer.php'); ?>
