UPDATE orders 
SET placed = TRUE
WHERE client_id = $1;