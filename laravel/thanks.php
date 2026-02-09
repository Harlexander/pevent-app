<?php
session_start();

// Get user data before clearing session
$user = isset($_SESSION['user']) ? $_SESSION['user'] : null;

// If there's a logged in user, close their meeting
if ($user && isset($user['meeting_code'])) {
    try {
        include './connect.php';

        // Update the meeting to set the closed_at timestamp
        $endQuery = "UPDATE meetings SET closed_at = NOW() WHERE meeting_code = ? AND closed_at IS NULL";
        $stmt = $conn->prepare($endQuery);
        $stmt->bind_param("s", $user['meeting_code']);
        $stmt->execute();
    } catch (\Throwable $th) {
        // Silently handle any errors during meeting closure
        error_log($th->getMessage());
    }
}

// Clear all session variables and destroy the session
session_unset();
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <title>Join Meeting | ISM Conferencing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="" name="description">
    <meta content="Themesbrand" name="author">
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- Layout config Js -->
    <script src="assets/js/pages/layout.js"></script>
    <!-- Icons CSS -->

    <!-- Tailwind CSS -->


    <link rel="stylesheet" href="assets/css/tailwind2.css">
</head>

<body class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-sm w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="mb-6">
            <i class='bx bx-check-circle text-6xl text-green-500'></i>
        </div>

        <h1 class="text-2xl font-bold text-gray-800 mb-4">
            Successfully Logged Out
        </h1>

        <p class="text-gray-600 mb-6">
            Thanks for joining!
        </p>

        <div class="space-y-4">
            <a href="./login.php" class="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Return to Login
            </a>
        </div>
    </div>
</body>

</html>