<?php
session_start();
include './connect.php';

$user = $_SESSION['user'];

// Check if user is authenticated
if (!isset($user['email'])) {
    header("Location: login.php");
    exit();
}

// Refresh user data
$sql = "SELECT * FROM users WHERE email = '$user[email]'";
$query = mysqli_query($conn, $sql);
$user = mysqli_fetch_assoc($query);

// Fetch all meetings for this user
$sql_meetings = "SELECT 
    m.id,
    m.meeting_code,
    m.started_at,
    m.closed_at,
    m.participants as initial_participants
FROM meetings m
WHERE m.host_id = '$user[id]'
ORDER BY m.started_at DESC";

$meetings_query = mysqli_query($conn, $sql_meetings);
$meetings = mysqli_fetch_all($meetings_query, MYSQLI_ASSOC);

// Fetch participants for each meeting
foreach ($meetings as &$meeting) {
    $meeting_id = $meeting['id'];
    $participants_query = mysqli_query($conn, "SELECT fullname, email, mobile, country, num_of_persons FROM participants WHERE meeting_id = '$meeting_id' ORDER BY id ASC");
    $meeting['participants_list'] = mysqli_fetch_all($participants_query, MYSQLI_ASSOC);
    $meeting['total_participants'] = count($meeting['participants_list']);
}
unset($meeting);

// Calculate total meetings and total participants
$total_meetings = count($meetings);
$total_participants = 0;
foreach ($meetings as $meeting) {
    $total_participants += $meeting['total_participants'];
}
?>
<!DOCTYPE html>
<html lang="en" class="light scroll-smooth group" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" dir="ltr">

<head>
    <meta charset="utf-8">
    <title>Meeting History | ISM Conferencing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="" name="description">
    <meta content="Themesbrand" name="author">
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- Layout config Js -->
    <script src="assets/js/pages/layout.js"></script>
    <!-- Tailwind CSS -->
    <link rel="stylesheet" href="assets/css/tailwind2.css">
</head>

<body class="text-base text-body-color font-poppins bg-body dark:text-white dark:bg-zink-800">
    <div class="group-data-[sidebar-size=sm]:min-h-[1500px] group-data-[sidebar-size=sm]:relative">

        <div class="vertical-menu">
            <div id="sidebar" class="sidebar-left hidden lg:block w-vertical-menu bg-vertical-menu ltr:border-r rtl:border-l border-vertical-menu fixed bottom-0 top-0 transition-all duration-200 ease-linear group-data-[sidebar-size=md]:w-vertical-menu-md group-data-[sidebar-size=sm]:w-vertical-menu-sm group-data-[sidebar=dark]:bg-vertical-menu-dark group-data-[sidebar=dark]:border-vertical-menu-dark group-data-[sidebar=brand]:bg-vertical-menu-brand group-data-[sidebar=brand]:border-vertical-menu-brand group-data-[layout=horizontal]:w-full group-data-[layout=horizontal]:bottom-auto group-data-[layout=horizontal]:top-header z-40">
                <div class="flex items-center justify-center px-6 text-center h-header group-data-[layout=horizontal]:hidden sidebar-logo">
                    <a href="./index.php" class="group-data-[sidebar=dark]:hidden group-data-[sidebar=brand]:hidden">
                        <span class="hidden group-data-[sidebar-size=sm]:block">
                            <img src="assets/images/logo.svg" alt="" class="h-[19px] mx-auto">
                        </span>
                        <span class="group-data-[sidebar-size=sm]:hidden">
                            <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[19px] mx-auto">
                        </span>
                    </a>
                    <a href="./index.php" class="hidden group-data-[sidebar=dark]:block group-data-[sidebar=brand]:block">
                        <span class="hidden group-data-[sidebar-size=sm]:block">
                            <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[19px] mx-auto">
                        </span>
                        <span class="group-data-[sidebar-size=sm]:hidden">
                            <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[19px] mx-auto">
                        </span>
                    </a>
                </div>

                <div id="scrollbar">
                    <div class="group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl">
                        <div data-simplebar class="group-data-[layout=vertical]:group-data-[sidebar-size=md]:max-h-[calc(100vh_-_80px)] group-data-[layout=vertical]:group-data-[sidebar-size=lg]:max-h-[calc(100vh_-_80px)]" id="data-simplebar">
                            <div id="sidebar-menu" class="">
                                <!-- MENU -->
                                <ul class="group-data-[layout=horizontal]:flex group-data-[layout=vertical]:mt-[10px]">
                                    <li class="px-5 py-3 group-data-[layout=vertical]:text-[#6a7187] uppercase font-semibold text-[11px] cursor-default tracking-wider group-data-[sidebar-size=sm]:hidden group-data-[layout=horizontal]:hidden inline-block group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:underline group-data-[sidebar-size=md]:text-center"><span data-key="t-menu">Menu</span></li>
                                    <li class="nav-items">
                                        <div class="group-data-[sidebar-size=sm]:py-4 group-data-[sidebar-size=sm]:px-5 py-[10px] px-6 flex items-center justify-between group-data-[layout=vertical]:text-vertical-menu-item-font-size font-normal transition-all duration-150 ease-linear rounded-sm group-data-[layout=vertical]:text-vertical-menu-item hover:text-vertical-menu hover:bg-vertical-menu-item-bg-active group-data-[sidebar=dark]:group-data-[layout=vertical]:text-vertical-menu-item-dark group-data-[layout=vertical]:group-data-[sidebar=dark]:hover:text-vertical-menu group-data-[sidebar=dark]:hover:bg-vertical-menu-item-bg-hover-dark group-data-[sidebar-size=md]:block group-data-[sidebar-size=sm]:my-0 group-data-[sidebar-size=sm]:rounded-b-none group-data-[layout=horizontal]:m-0">
                                            <a href="./index.php" class="relative w-full before:content-['\f0140'] before:font-material ltr:before:right-0 rtl:before:left-0 before:text-16 before:absolute group-data-[sidebar-size=sm]:before:hidden group-data-[sidebar-size=md]:before:hidden mm-collaps group-data-[sidebar-size=lg]:flex group-data-[sidebar-size=lg]:items-center group-data-[layout=horizontal]:ltr:before:-right-5 group-data-[layout=horizontal]:rtl:before:lg:!-left-6 group-data-[layout=horizontal]:rtl:before:!left-0 group-data-[layout=horizontal]:rtl:before:!right-auto whitespace-nowrap flex items-center">
                                                <i class="bx bx-home-circle inline-block text-start text-xl group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:text-center group-data-[layout=horizontal]:text-15"></i>
                                                <span class="group-data-[sidebar-size=sm]:ltr:pl-10 group-data-[sidebar-size=sm]:rtl:pr-10 group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:mt-2 group-data-[sidebar-size=md]:text-center ltr:pl-3 rtl:pr-3 group-data-[layout=horizontal]:pl-2 group-data-[layout=horizontal]:rtl:pr-2" data-key="t-dashboards">Dashboard</span>
                                            </a>
                                        </div>
                                    </li>
                                    <li class="nav-items">
                                        <div class="group-data-[sidebar-size=sm]:py-4 group-data-[sidebar-size=sm]:px-5 py-[10px] px-6 flex items-center justify-between group-data-[layout=vertical]:text-vertical-menu-item-font-size font-normal transition-all duration-150 ease-linear rounded-sm group-data-[layout=vertical]:text-vertical-menu-item active:text-vertical-menu active:bg-vertical-menu-item-bg-active group-data-[sidebar=dark]:group-data-[layout=vertical]:text-vertical-menu-item-dark group-data-[layout=vertical]:group-data-[sidebar=dark]:hover:text-vertical-menu group-data-[sidebar=dark]:hover:bg-vertical-menu-item-bg-hover-dark group-data-[sidebar=dark]:active:text-vertical-menu group-data-[sidebar=dark]:active:bg-vertical-menu-item-bg-active-dark group-data-[sidebar-size=md]:block group-data-[sidebar-size=sm]:my-0 group-data-[sidebar-size=sm]:rounded-b-none group-data-[layout=horizontal]:m-0">
                                            <a href="./history.php" class="relative w-full before:content-['\f0140'] before:font-material ltr:before:right-0 rtl:before:left-0 before:text-16 before:absolute group-data-[sidebar-size=sm]:before:hidden group-data-[sidebar-size=md]:before:hidden mm-collaps group-data-[sidebar-size=lg]:flex group-data-[sidebar-size=lg]:items-center group-data-[layout=horizontal]:ltr:before:-right-5 group-data-[layout=horizontal]:rtl:before:lg:!-left-6 group-data-[layout=horizontal]:rtl:before:!left-0 group-data-[layout=horizontal]:rtl:before:!right-auto whitespace-nowrap flex items-center">
                                                <i class="bx bx-history inline-block text-start text-xl group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:text-center group-data-[layout=horizontal]:text-15"></i>
                                                <span class="group-data-[sidebar-size=sm]:ltr:pl-10 group-data-[sidebar-size=sm]:rtl:pr-10 group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:mt-2 group-data-[sidebar-size=md]:text-center ltr:pl-3 rtl:pr-3 group-data-[layout=horizontal]:pl-2 group-data-[layout=horizontal]:rtl:pr-2" data-key="t-history">Meeting History</span>
                                            </a>
                                        </div>
                                    </li>
                                    <li class="nav-items">
                                        <div class="group-data-[sidebar-size=sm]:py-4 group-data-[sidebar-size=sm]:px-5 py-[10px] px-6 flex items-center justify-between group-data-[layout=vertical]:text-vertical-menu-item-font-size font-normal transition-all duration-150 ease-linear rounded-sm group-data-[layout=vertical]:text-vertical-menu-item hover:text-vertical-menu hover:bg-vertical-menu-item-bg-active group-data-[sidebar=dark]:group-data-[layout=vertical]:text-vertical-menu-item-dark group-data-[layout=vertical]:group-data-[sidebar=dark]:hover:text-vertical-menu group-data-[sidebar=dark]:hover:bg-vertical-menu-item-bg-hover-dark group-data-[sidebar-size=md]:block group-data-[sidebar-size=sm]:my-0 group-data-[sidebar-size=sm]:rounded-b-none group-data-[layout=horizontal]:m-0">
                                            <a href="./thanks.php" class="relative w-full before:content-['\f0140'] before:font-material ltr:before:right-0 rtl:before:left-0 before:text-16 before:absolute group-data-[sidebar-size=sm]:before:hidden group-data-[sidebar-size=md]:before:hidden mm-collaps group-data-[sidebar-size=lg]:flex group-data-[sidebar-size=lg]:items-center group-data-[layout=horizontal]:ltr:before:-right-5 group-data-[layout=horizontal]:rtl:before:lg:!-left-6 group-data-[layout=horizontal]:rtl:before:!left-0 group-data-[layout=horizontal]:rtl:before:!right-auto whitespace-nowrap flex items-center">
                                                <i class="bx bx-log-out-circle inline-block text-start text-xl group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:text-center group-data-[layout=horizontal]:text-15"></i>
                                                <span class="group-data-[sidebar-size=sm]:ltr:pl-10 group-data-[sidebar-size=sm]:rtl:pr-10 group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:mt-2 group-data-[sidebar-size=md]:text-center ltr:pl-3 rtl:pr-3 group-data-[layout=horizontal]:pl-2 group-data-[layout=horizontal]:rtl:pr-2" data-key="t-logout">Log out</span>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="backdrop" class="fixed inset-0 bg-gray-900/20 z-[1] res-header-bg hidden group-data-[layout=horizontal]:hidden" onclick="closeSidebar()"></div>
            </div>

            <header id="page-topbar" class="ltr:lg:left-vertical-menu group-data-[layout=vertical]:rtl:lg:right-vertical-menu group-data-[sidebar-size=md]:ltr:left-vertical-menu-md group-data-[sidebar-size=md]:rtl:right-vertical-menu-md group-data-[sidebar-size=sm]:lg:ltr:left-vertical-menu-sm group-data-[sidebar-size=sm]:lg:rtl:right-vertical-menu-sm group-data-[layout=horizontal]:left-0 group-data-[layout=horizontal]:rtl:p-0 fixed ltr:right-0 rtl:left-0 z-50 ltr:left-0 rtl:right-0">
                <div class="layout-width">
                    <div class="group-data-[topbar=dark]:bg-topbar-dark flex items-center mx-auto bg-vertical-menu-group-data-[topbar=dark] group-data-[layout=horizontal]:border-none group-data-[topbar=light]:bg-white group-data-[topbar=light]:text-gray-700 topbar-main">
                        <div class="pr-3 flex group-data-[layout:vertical]:relative items-center w-full group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl justify-between">
                            <div class="items-center justify-center hidden px-5 text-center group-data-[layout=horizontal]:flex group-data-[layout=horizontal]:p-0 group-data-[layout=horizontal]:lg:px-5">
                                <a href="./index.php">
                                    <span>
                                        <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-6 mx-auto">
                                    </span>
                                </a>
                            </div>
                            <div class="res-header-logo w-header h-header p-6 lg:hidden group-data-[layout=vertical]:bg-zink-700 group-data-[layout=vertical]:mr-4">
                                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" class="res-light" alt="">
                                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" class="res-dark" alt="">
                            </div>
                            <div class="group-data-[layout=horizontal]:lg:hidden">
                                <button type="button" class="ml-4 sm:ml-0 lg:px-5 header-item waves-effect menubar font-normal h-header" id="vertical-menu-btn">
                                    <i class="fa fa-bars text-16 text-zink-600 group-data-[topbar=dark]:text-zink-200"></i>
                                </button>
                            </div>

                            <div class="flex ms-auto items-center">
                                <div class="md:relative dropdown px-3">
                                    <button class="p-0 border-0 btn dropdown-toggle h-header text-gray-700 group-data-[topbar=dark]:text-gray-200 flex items-center" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton1">
                                        <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" class="w-9 h-9 p-[3px] rounded-full ltr:mr-2 rtl:ml-2" alt="">
                                        <p class="hidden xl:block text-13 text-gray-700 group-data-[topbar=dark]:text-zink-200"><?= $user['title'] ?> <i class="mdi mdi-chevron-down"></i></p>
                                    </button>
                                    <ul class="w-full absolute right-0 left-auto top-auto z-50 hidden md:w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-4xl dropdown-menu bg-clip-padding group-data-[topbar=dark]:bg-zink-700 group-data-[topbar=dark]:border-zink-50 group-data-[topbar=dark]:text-zink-200" aria-labelledby="dropdownMenuButton1">
                                        <div class="border-t border-gray-300 group-data-[topbar=dark]:border-zink-50">
                                            <a class="text-red-500 items-center w-full px-4 py-2 flex text-sm font-normal bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-50 group-data-[topbar=dark]:text-red-500 group-data-[topbar=dark]:hover:bg-zink-50 group-data-[topbar=dark]:hover:text-white" href="./thanks.php">
                                                <span><i class="bx bx-power-off text-red-500 text-16 ltr:mr-2 rtl:ml-2"></i></span>Logout
                                            </a>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div class="relative min-h-screen group-data-[sidebar-size=sm]:min-h-[1500px]">
                <div class="group-data-[sidebar-size=lg]:ltr:lg:ml-vertical-menu group-data-[sidebar-size=lg]:rtl:lg:mr-vertical-menu group-data-[sidebar-size=md]:ltr:ml-vertical-menu-md group-data-[sidebar-size=md]:rtl:mr-vertical-menu-md group-data-[sidebar-size=sm]:ltr:lg:ml-vertical-menu-sm group-data-[sidebar-size=sm]:lg:rtl:mr-vertical-menu-sm pt-[calc(theme('spacing.header')_*_1)] pb-[calc(theme('spacing.header')_*_1)] px-6 group-data-[layout=horizontal]:!mx-auto group-data-[layout=horizontal]:max-w-screen-2xl group-data-[layout=horizontal]:lg:pt-[calc(theme('spacing.header')_*_1.75)]">
                    <div class="container-fluid">
                        <div class="grid grid-cols-12 gap-x-6">
                            <div class="col-span-12">
                                <div class="mb-5">
                                    <h6 class="mb-1 text-16 uppercase font-semibold dark:text-white">Meeting History</h6>
                                    <p class="text-gray-600 dark:text-zink-200">View all your past meetings and participant statistics</p>
                                </div>

                                <!-- Statistics Cards -->
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div class="card dark:bg-zink-700">
                                        <div class="card-body">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                                        <i class="bx bx-video text-2xl text-blue-500"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow ltr:ml-4 rtl:mr-4">
                                                    <p class="text-gray-600 dark:text-zink-200 text-13 mb-1">Total Meetings</p>
                                                    <h5 class="text-16 font-semibold text-gray-700 dark:text-white"><?= $total_meetings ?></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card dark:bg-zink-700">
                                        <div class="card-body">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                                        <i class="bx bx-group text-2xl text-green-500"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow ltr:ml-4 rtl:mr-4">
                                                    <p class="text-gray-600 dark:text-zink-200 text-13 mb-1">Total Participants</p>
                                                    <h5 class="text-16 font-semibold text-gray-700 dark:text-white"><?= $total_participants ?></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card dark:bg-zink-700">
                                        <div class="card-body">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                                                        <i class="bx bx-user text-2xl text-purple-500"></i>
                                                    </div>
                                                </div>
                                                <div class="flex-grow ltr:ml-4 rtl:mr-4">
                                                    <p class="text-gray-600 dark:text-zink-200 text-13 mb-1">Avg. Participants</p>
                                                    <h5 class="text-16 font-semibold text-gray-700 dark:text-white"><?= $total_meetings > 0 ? round($total_participants / $total_meetings, 1) : 0 ?></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Meetings Table -->
                                <div class="card dark:bg-zink-700">
                                    <div class="card-body">
                                        <h5 class="text-15 font-medium text-gray-700 dark:text-white mb-4">All Meetings</h5>
                                        
                                        <?php if (count($meetings) > 0): ?>
                                        <div class="overflow-x-auto">
                                            <table class="w-full text-sm text-left text-gray-700 dark:text-zink-200">
                                                <thead class="text-xs uppercase bg-gray-50 dark:bg-zink-600">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3 w-8"></th>
                                                        <th scope="col" class="px-6 py-3">Meeting Code</th>
                                                        <th scope="col" class="px-6 py-3">Started At</th>
                                                        <th scope="col" class="px-6 py-3">Ended At</th>
                                                        <th scope="col" class="px-6 py-3">Duration</th>
                                                        <th scope="col" class="px-6 py-3">Participants</th>
                                                        <th scope="col" class="px-6 py-3">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php foreach ($meetings as $index => $meeting): 
                                                        $is_active = is_null($meeting['closed_at']);
                                                        $duration = '';
                                                        
                                                        if (!$is_active) {
                                                            $start = new DateTime($meeting['started_at']);
                                                            $end = new DateTime($meeting['closed_at']);
                                                            $diff = $start->diff($end);
                                                            
                                                            if ($diff->h > 0) {
                                                                $duration = $diff->h . 'h ' . $diff->i . 'm';
                                                            } else {
                                                                $duration = $diff->i . 'm ' . $diff->s . 's';
                                                            }
                                                        }
                                                    ?>
                                                    <!-- Main Meeting Row -->
                                                    <tr class="bg-white border-b dark:bg-zink-700 dark:border-zink-500 hover:bg-gray-50 dark:hover:bg-zink-600 cursor-pointer" onclick="toggleParticipants(<?= $index ?>)">
                                                        <td class="px-6 py-4">
                                                            <i class="bx bx-chevron-right text-xl transition-transform duration-200" id="chevron-<?= $index ?>"></i>
                                                        </td>
                                                        <td class="px-6 py-4 font-medium">
                                                            <span class="font-mono text-blue-600 dark:text-blue-400"><?= htmlspecialchars($meeting['meeting_code']) ?></span>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <?= date('M j, Y g:i A', strtotime($meeting['started_at'])) ?>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <?= $is_active ? '<span class="text-gray-400">Ongoing</span>' : date('M j, Y g:i A', strtotime($meeting['closed_at'])) ?>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <?= $is_active ? '<span class="text-gray-400">-</span>' : $duration ?>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <div class="flex items-center">
                                                                <i class="bx bx-group text-lg mr-1"></i>
                                                                <span class="font-semibold"><?= $meeting['total_participants'] ?></span>
                                                            </div>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <?php if ($is_active): ?>
                                                                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400">
                                                                    <i class="bx bx-radio-circle-marked text-xs"></i> Active
                                                                </span>
                                                            <?php else: ?>
                                                                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400">
                                                                    <i class="bx bx-check-circle text-xs"></i> Completed
                                                                </span>
                                                            <?php endif; ?>
                                                        </td>
                                                    </tr>
                                                    
                                                    <!-- Expandable Participants Details Row -->
                                                    <tr id="participants-<?= $index ?>" class="hidden bg-gray-50 dark:bg-zink-600">
                                                        <td colspan="7" class="px-6 py-4">
                                                            <div class="pl-8">
                                                                <h6 class="text-sm font-semibold mb-3 text-gray-700 dark:text-white">
                                                                    <i class="bx bx-user-circle mr-1"></i> Participants (<?= $meeting['total_participants'] ?>)
                                                                </h6>
                                                                
                                                                <?php if (count($meeting['participants_list']) > 0): ?>
                                                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                    <?php foreach ($meeting['participants_list'] as $participant): ?>
                                                                    <div class="bg-white dark:bg-zink-700 p-3 rounded-lg border border-gray-200 dark:border-zink-500">
                                                                        <div class="flex items-start">
                                                                            <div class="flex-shrink-0">
                                                                                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                                                                    <i class="bx bx-user text-blue-600 dark:text-blue-400"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div class="ml-3 flex-1 min-w-0">
                                                                                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                                                    <?= htmlspecialchars($participant['fullname']) ?>
                                                                                </p>
                                                                                <p class="text-xs text-gray-600 dark:text-zink-300 truncate">
                                                                                    <i class="bx bx-envelope text-xs mr-1"></i><?= htmlspecialchars($participant['email']) ?>
                                                                                </p>
                                                                                <?php if (!empty($participant['mobile'])): ?>
                                                                                <p class="text-xs text-gray-600 dark:text-zink-300 truncate">
                                                                                    <i class="bx bx-phone text-xs mr-1"></i><?= htmlspecialchars($participant['mobile']) ?>
                                                                                </p>
                                                                                <?php endif; ?>
                                                                                <div class="flex items-center gap-2 mt-1">
                                                                                    <?php if (!empty($participant['country'])): ?>
                                                                                    <span class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-zink-600 rounded">
                                                                                        <i class="bx bx-map text-xs"></i> <?= htmlspecialchars($participant['country']) ?>
                                                                                    </span>
                                                                                    <?php endif; ?>
                                                                                    <?php if ($participant['num_of_persons'] > 1): ?>
                                                                                    <span class="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded">
                                                                                        <i class="bx bx-group text-xs"></i> <?= $participant['num_of_persons'] ?> people
                                                                                    </span>
                                                                                    <?php endif; ?>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <?php endforeach; ?>
                                                                </div>
                                                                <?php else: ?>
                                                                <p class="text-sm text-gray-500 dark:text-zink-400">No participants joined this meeting.</p>
                                                                <?php endif; ?>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <?php endforeach; ?>
                                                </tbody>
                                            </table>
                                        </div>
                                        <?php else: ?>
                                        <div class="text-center py-12">
                                            <i class="bx bx-video-off text-6xl text-gray-300 dark:text-zink-500 mb-4"></i>
                                            <p class="text-gray-600 dark:text-zink-200 text-15">No meetings found</p>
                                            <p class="text-gray-500 dark:text-zink-300 text-13 mt-2">Start your first meeting from the dashboard</p>
                                            <a href="./index.php" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                Go to Dashboard
                                            </a>
                                        </div>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="ltr:lg:left-vertical-menu rtl:lg:right-vertical-menu group-data-[sidebar-size=md]:ltr:left-vertical-menu-md group-data-[sidebar-size=md]:rtl:right-vertical-menu-md group-data-[sidebar-size=sm]:lg:ltr:left-vertical-menu-sm group-data-[sidebar-size=sm]:lg:rtl:right-vertical-menu-sm absolute bottom-0 px-5 group-data-[layout=horizontal]:left-0 h-footer py-4 flex items-center bg-footer-bg text-footer-colo right-0 rtl:left-0 ltr:left-0 rtl:right-0">
                    <div class="group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl w-full bg-new-500">
                        <div class="sm:flex sm:space-y-2 md:space-y-0 sm:justify-between">
                            <div class="text-13 text-footer-color dark:text-zink-200">
                                <script>document.write(new Date().getFullYear())</script> © ISM conferencing.
                            </div>
                            <div class="hidden md:block sm:text-end text-13 text-footer-color dark:text-zink-200">
                                Design & Develop by Peachy
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>

    <script src="assets/libs/jquery/jquery.min.js"></script>
    <script src="assets/libs/simplebar/simplebar.min.js"></script>
    <script src="assets/libs/metismenujs/metismenujs.min.js"></script>
    <script src="assets/libs/@popperjs/core/umd/popper.min.js"></script>
    <script src="assets/js/pages/plugins.js"></script>
    <script src="assets/js/app.js"></script>
    
    <script>
        function toggleParticipants(index) {
            const participantsRow = document.getElementById('participants-' + index);
            const chevron = document.getElementById('chevron-' + index);
            
            if (participantsRow.classList.contains('hidden')) {
                participantsRow.classList.remove('hidden');
                chevron.classList.add('rotate-90');
            } else {
                participantsRow.classList.add('hidden');
                chevron.classList.remove('rotate-90');
            }
        }
    </script>
</body>

</html>
