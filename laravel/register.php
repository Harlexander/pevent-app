<?php
session_start(); // Start the session
include "./connect.php";

// Generate a random 8-character string for meeting_code
function generateMeetingCode($length = 8)
{
    return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['fullname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $title = $_POST['title'];
    $mobile = $_POST['mobile'];
    $country = $_POST['country'];

try {
        // Validate inputs
        if (empty($full_name) || empty($email) || empty($password) || empty($title)) {
            $error_message = "All fields are required.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error_message = "Invalid email format.";
        } else {
            // Check if email already exists
            $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $result = $stmt->get_result(); // Get the result set from the prepared statement
            if ($result->num_rows > 0) { // Use num_rows to check the number of rows
                $error_message = "Email already exists.";
            } else {
                // Insert user into the database
                $stmt = $conn->prepare("INSERT INTO users (title, full_name, email, password, meeting_code, mobile, country) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $hashed_password = $password; // Hash the password
                $meeting_code = generateMeetingCode(); // Generate meeting code
                if ($stmt->execute([$title, $full_name, $email, $hashed_password, $meeting_code, $mobile, $country])) {
                    // Store user information in session
                    $_SESSION['user'] = [
                        'full_name' => $full_name,
                        'email' => $email,
                        'title' => $title,
                        'meeting_code' => $meeting_code,
                        'mobile' => $mobile,
                        'country' => $country
                    ];
                    // Redirect to index.php
                    header("Location: index.php");
                    exit();
                } else {
                    $error_message = "Error registering user. Please try again.";
                }
            }
        }
} catch (\Throwable $th) {
    //throw $th;
    echo $th->getMessage();
}
}
?>
<!DOCTYPE html>
<html lang="en" class="light scroll-smooth group" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" dir="ltr">

<head>

    <meta charset="utf-8">
    <title>Register | ISM Conferencing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="ISM Admin & Dashboard Template" name="description">
    <meta content="Themesbrand" name="author">
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">

    <!-- Layout config Js -->
    <script src="assets/js/pages/layout.js"></script>


    <link rel="stylesheet" href="assets/css/swiper-bundle.css">
    <link rel="stylesheet" href="assets/css/tailwind2.css">
</head>

<body class="font-poppins">
    <div class="grid grid-cols-1 md:grid-cols-12 md:h-screen">
        <div class="md:col-span-8 2xl:col-span-9 h-full dark:bg-blue-800/80 -z-10 relative bg-[rgba(85,110,230,.25)]">
            <img src="assets/images/prayernetwork-image.jpeg" class="h-full object-cover" alt="">
        </div>
        <div class="bg-blue-50/50 md:col-span-4 2xl:col-span-3 h-full pb-10 dark:bg-zink-700">
            <div class="p-6 lg:p-12 h-full">
                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[28px] block dark:hidden">
                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[28px]  hidden dark:block">
                <div class="h-full flex flex-col justify-center">
                    <h4 class="text-16 text-blue-500 font-medium ">Create Account</h4>
                    <p class="dark:text-zink-20 font-normal text-gray-600 text-13 mt-1 mb-6 dark:text-zink-200">Setup your account to get your unique meeting link.</p>

                    <?php
                    if (isset($error_message)) {
                        echo '<div class="error-message bg-red-100 border border-red-600 px-4 py-2.5 rounded-lg text-sm mb-3 text-red-800">' . htmlspecialchars($error_message) . '</div>';
                    }
                    ?>
                    <form action="" method="POST">
                        <div class="mb-5">
                            <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="title">Title</label>
                            <select name="title" required class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 text-gray-700 text-13" id="title">
                                <option value="">Select Title</option>
                                <option value="Pastor">Pastor</option>
                                <option value="Evangelist">Evangelist</option>
                                <option value="Brother">Brother</option>
                                <option value="Brother">Sister</option>
                                <option value="Brother">Esteemed</option>
                                <option value="Minister">Minister</option>
                                <option value="Youth Pastor">Youth Pastor</option>
                                <option value="Deacon">Deacon</option>
                                <option value="Elder">Elder</option>
                                <option value="Leader">Leader</option>
                            </select>
                        </div>
                        <div class="mb-5">
                            <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="username">Fullname</label>
                            <input name="fullname" required type="text" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="email" placeholder="Enter fullname">
                        </div>
                        <div class="mb-5">
                            <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="username">Email</label>
                            <input name="email" required type="email" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="username" placeholder="Enter email">
                        </div>

                        <div class="mb-5">
                            <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="mobile">Mobile</label>
                            <input name="mobile" required type="text" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="mobile" placeholder="Enter mobile number">
                        </div>
                        <div class="mb-5">
                            <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="country">Country</label>
                            <input name="country" required type="text" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="country" placeholder="Enter country">
                        </div>

                        <div class="mb-5">
                            <label class="block text-13 font-medium text-gray-700 mb-2 dark:text-zink-200" for="userpassword">Password</label>
                            <input name="password" required type="password" class="dark:outline-none dark:border-transparent dark:text-zink-200 dark:placeholder:text-zink-200 dark:bg-transparent dark:border-zink-50 w-full border rounded p-2 placeholder:text-gray-600 border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 text-13" id="userpassword" placeholder="Enter password">
                        </div>

                        <div class="form-check">
                            <label class="form-check-label text-13 dark:text-zink-200" for="auth-remember-check">By registering you agree to the ISM conferencing <span class="text-blue-500 dark:text-blue-400"> Terms of Use</span></label>
                        </div>

                        <div class="mt-3 text-end">
                            <button type="submit" class="px-6 w-full text-white bg-blue-500 border-transparent hover:bg-blue-600 btn" type="submit">Register</button>
                        </div>

                        <div class="dark:text-zink-200 mt-8 text-center text-13">
                            <p class="mb-0">Already have an account ? <a href="./login.php" class="font-medium text-blue-500"> Login</a> </p>
                        </div>
                    </form>
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



<!-- Mirrored from themesbrand.com/ISM-tailwincss/layouts/auth-register-2.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jan 2025 12:44:48 GMT -->

</html>