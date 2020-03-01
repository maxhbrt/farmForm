INSERT INTO orders(quan, item_id, client_id)
VALUES($1, $2, $3);

UPDATE items
SET avail = avail - $1 * 1
WHERE item_id = $2;



