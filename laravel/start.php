<?php

try {
    include './connect.php';

function startMeeting($host_id, $meeting_code)
{
    global $conn; // Assuming $conn is your database connection

    // Close all existing meetings for the host that are not closed
    $closeQuery = "UPDATE meetings SET closed_at = NOW() WHERE host_id = ? AND closed_at IS NULL";
    $stmt = $conn->prepare($closeQuery);
    $stmt->bind_param("i", $host_id);
    $stmt->execute();

    // Insert a new meeting
    $insertQuery = "INSERT INTO meetings (host_id, participants, started_at, meeting_code) VALUES (?, 1, NOW(), ?)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("is", $host_id, $meeting_code);
    $stmt->execute();

    // Optionally return the new meeting ID or status
    return $conn->insert_id; // Return the ID of the newly created meeting
}


    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $host_id = $input['host_id']; // Get host_id from JSON input
    $meeting_code = $input['meeting_code']; // Get meeting_code from JSON input

    // Example usage
    $meeting_id = startMeeting($host_id, $meeting_code);
    echo json_encode(['meeting_id' => $meeting_id]);

} catch (\Throwable $th) {
    echo $th->getMessage();
}