<?php
include 'connect.php';
$sql = "SELECT * FROM prayer_points";
$result = mysqli_query($conn, $sql);
$prayer_points = mysqli_fetch_all($result, MYSQLI_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $prayer_point = mysqli_real_escape_string($conn, $_POST['points']);
    $prayer_point_time = mysqli_real_escape_string($conn, $_POST['date']);

    $sql = "INSERT INTO prayer_points (points, date) VALUES ('$prayer_point', '$prayer_point_time')";

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('New prayer point added successfully');</script>";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

?>


<!DOCTYPE html>
<html lang="en" class="light scroll-smooth group" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" dir="ltr">


<!-- Mirrored from themesbrand.com/ISM-tailwincss/layouts/./index.php by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jan 2025 12:42:22 GMT -->

<head>

    <meta charset="utf-8">
    <title>ISM Conferencing</title>
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

<body class="text-base text-body-color font-poppins bg-body dark:text-white dark:bg-zink-800 ">
    <div class="group-data-[sidebar-size=sm]:min-h-[1500px] group-data-[sidebar-size=sm]:relative">

        <div class="vertical-menu">
            <div id="sidebar" class="sidebar-left hidden lg:block w-vertical-menu bg-vertical-menu ltr:border-r rtl:border-l border-vertical-menu fixed bottom-0 top-0 transition-all duration-200 ease-linear group-data-[sidebar-size=md]:w-vertical-menu-md group-data-[sidebar-size=sm]:w-vertical-menu-sm group-data-[sidebar=dark]:bg-vertical-menu-dark group-data-[sidebar=dark]:border-vertical-menu-dark group-data-[sidebar=brand]:bg-vertical-menu-brand group-data-[sidebar=brand]:border-vertical-menu-brand group-data-[layout=horizontal]:w-full group-data-[layout=horizontal]:bottom-auto group-data-[layout=horizontal]:top-header z-40 ">
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
                    <button type="button" class="hidden p-0 float-end" id="vertical-hover">
                        <i class="ri-record-circle-line"></i>
                    </button>
                </div>

                <div id="scrollbar">
                    <div class="group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl">
                        <div data-simplebar class="group-data-[layout=vertical]:group-data-[sidebar-size=md]:max-h-[calc(100vh_-_80px)] group-data-[layout=vertical]:group-data-[sidebar-size=lg]:max-h-[calc(100vh_-_80px)]" id="data-simplebar"> <!-- data-simple bar remove data-sidebar-sm -->
                            <!-- style="display: inline-flex; min-width: max-content; overflow: hidden;" -->
                            <div id="sidebar-menu" class="">
                                <!-- MENU -->
                                <ul class="group-data-[layout=horizontal]:flex group-data-[layout=vertical]:mt-[10px]">
                                    <li class="px-5 py-3  group-data-[layout=vertical]:text-[#6a7187] uppercase font-semibold text-[11px] cursor-default tracking-wider group-data-[sidebar-size=sm]:hidden group-data-[layout=horizontal]:hidden inline-block group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:underline group-data-[sidebar-size=md]:text-center"><span data-key="t-menu">Menu</span></li>
                                    <li class="nav-items">
                                        <div class="group-data-[sidebar-size=sm]:py-4  group-data-[sidebar-size=sm]:px-5 py-[10px] px-6  flex items-center justify-between group-data-[layout=vertical]:text-vertical-menu-item-font-size font-normal transition-all duration-150 ease-linear rounded-sm  group-data-[layout=vertical]:text-vertical-menu-item  active:text-vertical-menu active:bg-vertical-menu-item-bg-active group-data-[sidebar=dark]:group-data-[layout=vertical]:text-vertical-menu-item-dark group-data-[layout=vertical]:group-data-[sidebar=dark]:hover:text-vertical-menu group-data-[sidebar=dark]:hover:bg-vertical-menu-item-bg-hover-dark group-data-[sidebar=dark]:active:text-vertical-menu group-data-[sidebar=dark]:active:bg-vertical-menu-item-bg-active-dark group-data-[sidebar-size=md]:block  group-data-[sidebar-size=sm]:my-0 group-data-[sidebar-size=sm]:rounded-b-none group-data-[layout=horizontal]:m-0 ">
                                            <a href="./index.php" class="relative w-full before:content-['\f0140'] before:font-material ltr:before:right-0 rtl:before:left-0 before:text-16 before:absolute group-data-[sidebar-size=sm]:before:hidden  group-data-[sidebar-size=md]:before:hidden mm-collaps group-data-[sidebar-size=lg]:flex group-data-[sidebar-size=lg]:items-center group-data-[layout=horizontal]:ltr:before:-right-5 group-data-[layout=horizontal]:rtl:before:lg:!-left-6 group-data-[layout=horizontal]:rtl:before:!left-0 group-data-[layout=horizontal]:rtl:before:!right-auto whitespace-nowrap flex items-center">
                                                <i class="bx bx-home-circle inline-block text-start text-xl group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:text-center group-data-[layout=horizontal]:text-15"></i>
                                                <span class="group-data-[sidebar-size=sm]:ltr:pl-10 group-data-[sidebar-size=sm]:rtl:pr-10  group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:mt-2  group-data-[sidebar-size=md]:text-center ltr:pl-3 rtl:pr-3 group-data-[layout=horizontal]:pl-2 group-data-[layout=horizontal]:rtl:pr-2" data-key="t-dashboards">Dashboards</span>
                                            </a>
                                        </div>
                                    </li>
                                    <li class="nav-items">
                                        <div class="group-data-[sidebar-size=sm]:py-4  group-data-[sidebar-size=sm]:px-5 py-[10px] px-6  flex items-center justify-between group-data-[layout=vertical]:text-vertical-menu-item-font-size font-normal transition-all duration-150 ease-linear rounded-sm  group-data-[layout=vertical]:text-vertical-menu-item  active:text-vertical-menu active:bg-vertical-menu-item-bg-active group-data-[sidebar=dark]:group-data-[layout=vertical]:text-vertical-menu-item-dark group-data-[layout=vertical]:group-data-[sidebar=dark]:hover:text-vertical-menu group-data-[sidebar=dark]:hover:bg-vertical-menu-item-bg-hover-dark group-data-[sidebar=dark]:active:text-vertical-menu group-data-[sidebar=dark]:active:bg-vertical-menu-item-bg-active-dark group-data-[sidebar-size=md]:block  group-data-[sidebar-size=sm]:my-0 group-data-[sidebar-size=sm]:rounded-b-none group-data-[layout=horizontal]:m-0 ">
                                            <a href="./thanks.php" class="relative w-full before:content-['\f0140'] before:font-material ltr:before:right-0 rtl:before:left-0 before:text-16 before:absolute group-data-[sidebar-size=sm]:before:hidden  group-data-[sidebar-size=md]:before:hidden mm-collaps group-data-[sidebar-size=lg]:flex group-data-[sidebar-size=lg]:items-center group-data-[layout=horizontal]:ltr:before:-right-5 group-data-[layout=horizontal]:rtl:before:lg:!-left-6 group-data-[layout=horizontal]:rtl:before:!left-0 group-data-[layout=horizontal]:rtl:before:!right-auto whitespace-nowrap flex items-center">
                                                <i class="bx bx-log-out-circle inline-block text-start text-xl group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:text-center group-data-[layout=horizontal]:text-15"></i>
                                                <span class="group-data-[sidebar-size=sm]:ltr:pl-10 group-data-[sidebar-size=sm]:rtl:pr-10  group-data-[sidebar-size=md]:block group-data-[sidebar-size=md]:mt-2  group-data-[sidebar-size=md]:text-center ltr:pl-3 rtl:pr-3 group-data-[layout=horizontal]:pl-2 group-data-[layout=horizontal]:rtl:pr-2" data-key="t-dashboards">Log out</span>
                                            </a>
                                        </div>
                                    </li>
                            </div>
                        </div>
                        <!-- Sidebar -->
                    </div>
                </div>
                <div id="backdrop" class=" fixed inset-0 bg-gray-900/20 z-[1] res-header-bg hidden group-data-[layout=horizontal]:hidden" onclick="closeSidebar()"></div>
                <!-- Left Sidebar End -->
            </div>
            <header id="page-topbar" class="ltr:lg:left-vertical-menu group-data-[layout=vertical]:rtl:lg:right-vertical-menu group-data-[sidebar-size=md]:ltr:left-vertical-menu-md  group-data-[sidebar-size=md]:rtl:right-vertical-menu-md group-data-[sidebar-size=sm]:lg:ltr:left-vertical-menu-sm group-data-[sidebar-size=sm]:lg:rtl:right-vertical-menu-sm group-data-[layout=horizontal]:left-0 group-data-[layout=horizontal]:rtl:p-0 fixed ltr:right-0 rtl:left-0 z-50 ltr:left-0 rtl:right-0">

                <div class="layout-width ">
                    <div class="group-data-[topbar=dark]:bg-topbar-dark flex items-center mx-auto bg-vertical-menu-group-data-[topbar=dark]  group-data-[layout=horizontal]:border-none group-data-[topbar=light]:bg-white group-data-[topbar=light]:text-gray-700 topbar-main">
                        <div class="pr-3 flex  group-data-[layout:vertical]:relative items-center w-full group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl justify-between ">
                            <!-- LOGO -->
                            <div class="items-center justify-center hidden px-5 text-center group-data-[layout=horizontal]:flex group-data-[layout=horizontal]:p-0 group-data-[layout=horizontal]:lg:px-5">
                                <a href="./index.php">
                                    <span class="hidden">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwRTMyMENCQThGQTExRURBOUYxRDBCNTE0NjBCMDJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwRTMyMENDQThGQTExRURBOUYxRDBCNTE0NjBCMDJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBFMzIwQzlBOEZBMTFFREE5RjFEMEI1MTQ2MEIwMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBFMzIwQ0FBOEZBMTFFREE5RjFEMEI1MTQ2MEIwMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7wBzWqAAAL70lEQVR42uycCXAU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" alt="" class="h-6 mx-auto">
                                    </span>
                                    <span>
                                        <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[19px] mx-auto logo-light">
                                        <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-[19px] mx-auto logo-dark hidden">
                                    </span>
                                </a>
                                <a href="./index.php" class="hidden">
                                    <span>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwRTMyMENCQThGQTExRURBOUYxRDBCNTE0NjBCMDJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwRTMyMENDQThGQTExRURBOUYxRDBCNTE0NjBCMDJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBFMzIwQzlBOEZBMTFFREE5RjFEMEI1MTQ2MEIwMkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBFMzIwQ0FBOEZBMTFFREE5RjFEMEI1MTQ2MEIwMkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7wBzWqAAAL70lEQVR42uycCXAU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" alt="" class="h-6 mx-auto">
                                    </span>
                                    <span>
                                        <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" alt="" class="h-6 mx-auto">
                                    </span>
                                </a>
                            </div>
                            <div class="res-header-logo w-header h-header p-6 lg:hidden  group-data-[layout=vertical]:bg-zink-700 group-data-[layout=vertical]:mr-4">
                                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" class="res-light " alt="">
                                <img src="https://school.christembassy-ism.com/subscription/assets/logo.svg" class="res-dark" alt="">
                            </div>
                            <div class=" group-data-[layout=horizontal]:lg:hidden">
                                <button type="button" class="ml-4 sm:ml-0 lg:px-5 header-item waves-effect menubar font-normal h-header" id="vertical-menu-btn">
                                    <i class="fa fa-bars text-16 text-zink-600 group-data-[topbar=dark]:text-zink-200 "></i>
                                </button>
                            </div>


                            <div class="flex ms-auto items-center">
                                <div class="md:relative dropdown px-3 lg:hidden">
                                    <button class="p-0 text-gray-700 group-data-[topbar=dark]:text-zink-200 border-0 h-header btn dropdown-toggle flex items-center space-x-2" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        <i class="mdi mdi-magnify text-[22px] text-gray-700 group-data-[topbar=dark]:text-zink-200"></i>
                                    </button>
                                    <ul class="w-full absolute right-0 left-auto top-auto z-50 hidden md:w-80 p-4 text-left list-none bg-white border border-transparent rounded shadow-4xl dropdown-menu bg-clip-padding group-data-[topbar=dark]:bg-zink-700  group-data-[layout=horizontal]:bg-white topbar-dropdown" aria-labelledby="dropdownMenuButton1">
                                        <div class="flex rounded-md overflow-hidden">
                                            <input class="w-full border-transparent bg-gray-50 group-data-[topbar=dark]:bg-zink-50 group-data-[topbar=dark]:outline-none group-data-[topbar=dark]:border-transparent group-data-[topbar=dark]:text-zink-200 group-data-[topbar=dark]:placeholder:text-zink-200  py-1.2 p-2 placeholder:text-white border-gray-400 placeholder:text-sm focus:border focus:border-blue-500 focus:ring-0 focus:outline-none text-white" type="search" placeholder="Search" id="example-search-input">
                                            <div class="w-9 h-9 bg-blue-500 flex justify-center items-center">
                                                <i class="bx bx-search-alt text-16 text-white "></i>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                                <div class="md:relative dropdown px-3">
                                    <button class="p-0  border-0 btn dropdown-toggle h-header text-gray-700 group-data-[topbar=dark]:text-gray-200 flex items-center" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" class="w-9 h-9 p-[3px] rounded-full ltr:mr-2 rtl:ml-2" alt="">
                                        <p class="hidden xl:block text-13 text-gray-700 group-data-[topbar=dark]:text-zink-200 ">Admin <i class="mdi mdi-chevron-down"></i> </p>
                                    </button>
                                    <ul class="w-full absolute right-0 left-auto top-auto z-50 hidden md:w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-4xl dropdown-menu bg-clip-padding group-data-[topbar=dark]:bg-zink-700 group-data-[topbar=dark]:border-zink-50 group-data-[topbar=dark]:text-zink-200" aria-labelledby="dropdownMenuButton1">
                                        <div class="border-t border-gray-300 group-data-[topbar=dark]:border-zink-50">
                                            <a class="text-red-500 items-center w-full px-4 py-2 flex text-sm font-normal  bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-50  group-data-[topbar=dark]:text-red-500 group-data-[topbar=dark]:hover:bg-zink-50 group-data-[topbar=dark]:hover:text-white" href="./thanks.php">
                                                <span><i class="bx bx-power-off text-red-500 text-16 ltr:mr-2 rtl:ml-2"></i></span>Logout
                                            </a>
                                        </div>
                                    </ul>
                                </div>
                                <div>
                                    <button class="px-3 h-header" data-drawer-target="drawerSetting">
                                        <i class="bx bx-cog bx-spin text-[22px] text-gray-700 group-data-[topbar=dark]:text-zink-200 settingDrawer"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- ============================================================== -->
            <!-- Start right Content here -->
            <!-- ============================================================== -->
            <div class="relative min-h-screen group-data-[sidebar-size=sm]:min-h-[1500px]">

                <div class="group-data-[sidebar-size=lg]:ltr:lg:ml-vertical-menu group-data-[sidebar-size=lg]:rtl:lg:mr-vertical-menu group-data-[sidebar-size=md]:ltr:ml-vertical-menu-md group-data-[sidebar-size=md]:rtl:mr-vertical-menu-md group-data-[sidebar-size=sm]:ltr:lg:ml-vertical-menu-sm group-data-[sidebar-size=sm]:lg:rtl:mr-vertical-menu-sm pt-[calc(theme('spacing.header')_*_1)] pb-[calc(theme('spacing.header')_*_1)] px-6 group-data-[layout=horizontal]:!mx-auto group-data-[layout=horizontal]:max-w-screen-2xl  group-data-[layout=horizontal]:lg:pt-[calc(theme('spacing.header')_*_1.75)]">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body">
                                <form action="" method="post" class="space-y-4">
                                    <div class="mb-3 flex flex-col gap-2">
                                        <label for="prayer_point" class="form-label">Prayer Point</label>
                                        <textarea class="border border-gray-300 rounded-md p-2" id="prayer_point" name="points" rows="6" required></textarea>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="prayer_point_time" class="form-label">Prayer Point Date</label>
                                        <input type="datetime-local" class="border border-gray-300 rounded-md p-2" id="prayer_point_time" name="date" required>
                                    </div>
                                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <!-- container-fluid -->
                </div>


                <div class="fixed inset-0 bg-gray-900/50 dark:bg-black/50 z-[1049] backdrop-overlay hidden" id="modelOver"></div>
                <footer class="ltr:lg:left-vertical-menu rtl:lg:right-vertical-menu group-data-[sidebar-size=md]:ltr:left-vertical-menu-md group-data-[sidebar-size=md]:rtl:right-vertical-menu-md group-data-[sidebar-size=sm]:lg:ltr:left-vertical-menu-sm group-data-[sidebar-size=sm]:lg:rtl:right-vertical-menu-sm absolute bottom-0 px-5 group-data-[layout=horizontal]:left-0 h-footer py-4 flex items-center bg-footer-bg  text-footer-colo  right-0 rtl:left-0 ltr:left-0 rtl:right-0">
                    <div class="group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl w-full bg-new-500">
                        <div class="sm:flex sm:space-y-2 md:space-y-0 sm:justify-between">
                            <div class="text-13 text-footer-color dark:text-zink-200">
                                <script>
                                    document.write(new Date().getFullYear())
                                </script> © ISM conferencing.
                            </div>
                            <div class="hidden md:block sm:text-end text-13 text-footer-color dark:text-zink-200">
                                Design & Develop by Peachy
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <!-- end main content -->
        </div>
    </div>
    <!-- </div> -->
    <script src="assets/libs/jquery/jquery.min.js"></script>
    <script src="assets/libs/simplebar/simplebar.min.js"></script>
    <script src="assets/libs/metismenujs/metismenujs.min.js"></script>
    <script src="assets/libs/%40popperjs/core/umd/popper.min.js"></script>
    <script src="assets/js/pages/plugins.js"></script>
    <script>
    </script>
    <script src="assets/libs/apexcharts/apexcharts.min.js"></script>
    <script src="assets/js/pages/apexcharts.init.js"></script>
    <!-- apexcharts init -->
    <script src="assets/js/pages/dashboard.init.js"></script>
    <!-- App js -->
    <script src="assets/js/app.js"></script>

    <!-- Button to open the modal -->
    <!-- Modal Structure -->


    <script>
        // Function to open the modal and display prayer points
        document.getElementById('openModal').addEventListener('click', function() {
            document.getElementById('modalContent').innerHTML = prayerPoints; // Use the existing prayerPoints variable
            document.getElementById('prayerModal').classList.remove('hidden');
        });

        // Function to close the modal
        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById('prayerModal').classList.add('hidden');
        });
    </script>

</body>


<!-- Mirrored from themesbrand.com/ISM-tailwincss/layouts/./index.php by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jan 2025 12:43:24 GMT -->

</html>