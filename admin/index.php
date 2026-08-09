<?php
include('../config/db.php');

$error = "";
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $admin = $result->fetch_assoc();
        // Password verify karna
        if ($password == $admin['password']) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            header("Location: dashboard.php");
            exit();
        } else {
            $error = "Ghalat Password bhai!";
        }
    } else {
        $error = "Admin nahi mila!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MBS Admin | Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0a0c10] h-screen flex items-center justify-center font-sans">

    <div class="bg-[#1a1d26] p-10 rounded-lg shadow-2xl w-full max-w-md border border-gray-800">
        <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-[#C5A059] tracking-tighter italic">MBS CONTROL</h1>
            <p class="text-gray-500 text-[10px] uppercase tracking-widest mt-2">Owner Authentication</p>
        </div>

        <?php if($error): ?>
            <div class="bg-red-900/30 border border-red-800 text-red-400 p-3 rounded mb-6 text-xs text-center">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>

        <form method="POST" class="space-y-6">
            <div>
                <label class="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Username</label>
                <input type="text" name="username" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059] transition" required>
            </div>
            <div>
                <label class="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Password</label>
                <input type="password" name="password" class="w-full bg-[#0a0c10] border border-gray-800 rounded p-3 text-white outline-none focus:border-[#C5A059] transition" required>
            </div>
            <button type="submit" name="login" class="w-full bg-[#C5A059] hover:bg-white text-black font-bold py-4 rounded uppercase text-xs tracking-widest transition duration-500">
                Sign In
            </button>
        </form>
    </div>

</body>
</html>