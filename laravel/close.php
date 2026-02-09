<?php

try {
    include './connect.php';

    function endMeeting($meeting_code)
    {
        global $conn; // Assuming $conn is your database connection

        // Update the meeting to set the closed_at timestamp
        $endQuery = "UPDATE meetings SET closed_at = NOW() WHERE meeting_code = ? AND closed_at IS NULL";
        $stmt = $conn->prepare($endQuery);
        $stmt->bind_param("s", $meeting_code);
        $stmt->execute();

        // Optionally return a status or the number of affected rows
        return $stmt->affected_rows; // Return the number of rows updated
    }

    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $meeting_code = $input['meeting_code']; // Get meeting_code from JSON input

    // Example usage
    $affected_rows = endMeeting($meeting_code);
    echo json_encode(['affected_rows' => $affected_rows]);
} catch (\Throwable $th) {
    echo $th->getMessage();
}
