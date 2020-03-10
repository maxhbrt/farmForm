UPDATE orders
SET filled = FALSE
WHERE order_item_id = $1;