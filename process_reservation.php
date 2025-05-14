
<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
    $time = filter_input(INPUT_POST, 'time', FILTER_SANITIZE_STRING);
    $guests = filter_input(INPUT_POST, 'guests', FILTER_SANITIZE_STRING);
    $specialRequests = filter_input(INPUT_POST, 'special-requests', FILTER_SANITIZE_STRING);
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($date) || empty($time) || empty($guests)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Database connection (in a real app)
    // $conn = new mysqli('localhost', 'username', 'password', 'restaurant_db');
    
    // if ($conn->connect_error) {
    //     echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    //     exit;
    // }
    
    // // Insert reservation into database
    // $sql = "INSERT INTO reservations (name, email, phone, reservation_date, reservation_time, guests, special_requests, created_at)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
            
    // $stmt = $conn->prepare($sql);
    // $stmt->bind_param("sssssss", $name, $email, $phone, $date, $time, $guests, $specialRequests);
    
    // if ($stmt->execute()) {
    //     $reservationId = $conn->insert_id;
    // } else {
    //     echo json_encode(['success' => false, 'message' => 'Error saving reservation']);
    //     exit;
    // }
    
    // $stmt->close();
    // $conn->close();
    
    // For demonstration purposes, let's simulate a successful reservation
    $reservationId = rand(10000, 99999);
    
    // Send confirmation email (in a real app)
    // $to = $email;
    // $subject = "Reservation Confirmation - Savoria Restaurant";
    // $message = "Dear $name,\n\nThank you for your reservation at Savoria Restaurant.\n\n";
    // $message .= "Reservation Details:\n";
    // $message .= "Date: " . date('F j, Y', strtotime($date)) . "\n";
    // $message .= "Time: $time\n";
    // $message .= "Number of Guests: $guests\n";
    // $message .= "Reservation ID: $reservationId\n\n";
    // $message .= "If you need to modify or cancel your reservation, please contact us at (123) 456-7890.\n\n";
    // $message .= "We look forward to serving you!\n\n";
    // $message .= "Warm regards,\nSavoria Restaurant Team";
    
    // $headers = "From: reservations@savoria.com";
    
    // mail($to, $subject, $message, $headers);
    
    // Send success response
    echo json_encode([
        'success' => true,
        'message' => 'Reservation successful',
        'reservation_id' => $reservationId
    ]);
} else {
    // Not a POST request
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
