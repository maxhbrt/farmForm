INSERT INTO orders(quan, item_id, business_name)
VALUES($1, $2, $3);

UPDATE items
SET avail = avail - $1 * 1
WHERE item_id = $2;



