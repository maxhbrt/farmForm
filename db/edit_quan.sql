UPDATE orders
SET quan = $1
WHERE order_item_id = $2;

UPDATE items
SET avail = 
CASE
    WHEN $1 > $4 THEN (avail - ($1 - $4)) 
    WHEN $1 < $4 THEN (avail + ($4 - $1))
END
WHERE item_id = $3;

--SET avail = avail - $1 * 1
--WHERE item_id = $3;