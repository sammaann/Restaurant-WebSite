
<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $address = filter_input(INPUT_POST, 'address', FILTER_SANITIZE_STRING);
    $payment = filter_input(INPUT_POST, 'payment', FILTER_SANITIZE_STRING);
    $notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_STRING);
    $orderDetails = $_POST['order-details']; // JSON string of cart items
    $orderTotal = filter_input(INPUT_POST, 'order-total', FILTER_SANITIZE_STRING);
    
    // Decode order details
    $orderItems = json_decode($orderDetails, true);
    
    if (empty($name) || empty($email) || empty($phone) || empty($address) || empty($payment) || empty($orderItems)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Database connection (in a real app)
    // $conn = new mysqli('localhost', 'username', 'password', 'restaurant_db');
    
    // if ($conn->connect_error) {
    //     echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    //     exit;
    // }
    
    // // Start transaction
    // $conn->begin_transaction();
    
    // try {
    //     // Insert order into orders table
    //     $sql = "INSERT INTO orders (customer_name, email, phone, address, payment_method, notes, total_amount, status, created_at)
    //             VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())";
                
    //     $stmt = $conn->prepare($sql);
    //     $stmt->bind_param("ssssssd", $name, $email, $phone, $address, $payment, $notes, $orderTotal);
    //     $stmt->execute();
    //     $orderId = $conn->insert_id;
        
    //     // Insert order items
    //     $itemSql = "INSERT INTO order_items (order_id, item_id, item_name, price, quantity)
    //                 VALUES (?, ?, ?, ?, ?)";
                    
    //     $itemStmt = $conn->prepare($itemSql);
        
    //     foreach ($orderItems as $item) {
    //         $itemStmt->bind_param("issdi", $orderId, $item['id'], $item['name'], $item['price'], $item['quantity']);
    //         $itemStmt->execute();
    //     }
        
    //     // Commit transaction
    //     $conn->commit();
    // } catch (Exception $e) {
    //     // Roll back transaction on error
    //     $conn->rollback();
    //     echo json_encode(['success' => false, 'message' => 'Error processing order: ' . $e->getMessage()]);
    //     exit;
    // }
    
    // $stmt->close();
    // $itemStmt->close();
    // $conn->close();
    
    // For demonstration purposes, let's simulate a successful order
    $orderId = 'ORD-' . rand(10000, 99999);
    
    // Send confirmation email (in a real app)
    // $to = $email;
    // $subject = "Order Confirmation - Savoria Restaurant";
    // $message = "Dear $name,\n\nThank you for your order at Savoria Restaurant.\n\n";
    // $message .= "Order Details:\n";
    // $message .= "Order ID: $orderId\n\n";
    
    // $message .= "Items:\n";
    // $subtotal = 0;
    // foreach ($orderItems as $item) {
    //     $itemTotal = $item['price'] * $item['quantity'];
    //     $subtotal += $itemTotal;
    //     $message .= "{$item['name']} x {$item['quantity']} - \${$itemTotal}\n";
    // }
    
    // $tax = $subtotal * 0.1;
    // $total = $subtotal + $tax;
    
    // $message .= "\nSubtotal: \${$subtotal}\n";
    // $message .= "Tax: \${$tax}\n";
    // $message .= "Total: \${$total}\n\n";
    
    // $message .= "Delivery Address:\n$address\n\n";
    // $message .= "Payment Method: $payment\n\n";
    
    // if ($notes) {
    //     $message .= "Special Instructions: $notes\n\n";
    // }
    
    // $message .= "Your order will be ready shortly. If you have any questions, please call us at (123) 456-7890.\n\n";
    // $message .= "Thank you for choosing Savoria Restaurant!\n\n";
    // $message .= "Warm regards,\nSavoria Restaurant Team";
    
    // $headers = "From: orders@savoria.com";
    
    // mail($to, $subject, $message, $headers);
    
    // Send success response
    echo json_encode([
        'success' => true,
        'message' => 'Order successfully placed',
        'order_id' => $orderId
    ]);
} else {
    // Not a POST request
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
