INSERT INTO orders(quan, item_id, client_id, user_id)
VALUES($1, $2, $3, $4);

UPDATE items
SET avail = avail - $1 * 1
WHERE item_id = $2;

SELECT * FROM orders 
JOIN items ON (items.item_id = orders.item_id)
JOIN users on (users.user_id = orders.user_id)
WHERE client_id = $3;


