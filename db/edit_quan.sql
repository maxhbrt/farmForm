UPDATE orders
SET quan = $1
WHERE order_item_id = $2;

UPDATE items
SET avail = avail - $1 * 1
WHERE item_id = $3;