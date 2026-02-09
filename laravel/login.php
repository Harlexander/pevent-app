<?php
session_start(); // Start the session
include './connect.php'; // Include your database connection

// Check if user is already authenticated
if (isset($_SESSION['user'])) {
    header("Location: index.php");
    exit();
}

// Initialize error message variable
$error_message = "";

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    // Validate inputs
    if (empty($email) || empty($password)) {
        $error_message = "Email and password are required.";
    } else {
        // Prepare and execute the query to find the user
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);
        $user = mysqli_fetch_assoc($result);

        if ($password === $user['password']) {
            // Store user information in session
            $_SESSION['user'] = [
                'full_name' => $user['full_name'],
                'email' => $user['email'],
                'title' => $user['title'],
                'meeting_code' => $user['meeting_code']
            ];
            // Redirect to index.php
            header("Location: index.php");
            exit();
        } else {
            $error_message = "Invalid email or password.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="light scroll-smooth group" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" dir="ltr">


<!-- Mirrored from themesbrand.com/ISM-tailwincss/layouts/auth-login-2.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jan 2025 12:44:48 GMT -->

<head>

    <meta charset="utf-8">
    <title>ISM Conferencing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="ISM Admin & Dashboard Template" name="description">
    <meta content="Themesbrand" name="author">
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- Layout config Js -->
    <script src="assets/js/pages/layout.js"></script>
    <!-- Icons CSS -->

    <!-- Tailwind CSS -->


    <link rel="stylesheet" href="assets/css/swiper-bundle.css">
    <link rel="stylesheet" href="assets/css/tailwind2.css">
</head>

<body class="font-poppins">
    <div class="grid grid-cols-1 md:grid-cols-12 md:h-screen ">
        <div class="md:col-span-8 2xl:col-span-9 h-full dark:bg-blue-800/80 -z-10 relative bg-[rgba(85,110,230,.25)]">
            <img src="assets/images/prayernetwork-image.jpeg" class="h-full object-cover" alt="">
        </div>
        <div class="bg-blue-50/50 md:col-span-4 2xl:col-span-3 h-full pb-10 dark:bg-zink-700">
            <div class="p-6 lg:p-10 h-full">
                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[28px] block dark:hidden">
                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[28px]  hidden dark:block">
                <div class="h-full flex flex-col justify-center">
                    <h4 class="text-16 text-blue-500 font-medium  ">Welcome Back !</h4>
                    <p class="font-normal text-13 mt-1 mb-6 text-gray-600 dark:text-zink-200">Sign in to continue.</p>
                    <div class="dark:text-zink-200 mt-8 text-center text-13">
                        <?php if ($error_message): ?>
                            <div class="error-message bg-red-100 border border-red-600 px-4 py-2.5 rounded-lg text-sm mb-3 text-red-800">
                                <?php echo htmlspecialchars($error_message); ?>
                            </div>
                        <?php endif; ?>
                        <form action="" method="POST">
                            <div class="mb-5">
                                <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="username">Email</label>
                                <input name="email" required type="email" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="username" placeholder="Enter email">
                            </div>
                            <div class="mb-5">
                                <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="userpassword">Password</label>
                                <input name="password" required type="password" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="userpassword" placeholder="Enter password">
                            </div>
                            <div class="mt-3 text-end">
                                <button type="submit" class="px-6 w-full text-white bg-blue-500 border-transparent hover:bg-blue-600 btn">Log In</button>
                            </div>
                            <div class="mt-8 text-center text-13 dark:text-zink-200">
                                <p class="mb-0">Don't have an account? <a href="register.php" class="font-medium text-blue-500">Signup now</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end account-pages -->

    <script src="assets/libs/jquery/jquery.min.js"></script>
    <script src="assets/libs/simplebar/simplebar.min.js"></script>
    <script src="assets/libs/metismenujs/metismenujs.min.js"></script>
    <script src="assets/libs/%40popperjs/core/umd/popper.min.js"></script>
    <script src="assets/js/pages/plugins.js"></script>
    <script src="assets/libs/swiper/swiper-bundle.min.js"></script>

    <script src="assets/js/pages/swiper.js"></script>
    <!-- App js -->
    <!-- <script src="assets/js/app.js"></script> -->
</body>



<!-- Mirrored from themesbrand.com/ISM-tailwincss/layouts/auth-login-2.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jan 2025 12:44:48 GMT -->

</html>