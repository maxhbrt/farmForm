UPDATE items
SET image = $1
WHERE item_id = $2;

SELECT image FROM items 
WHERE item_id = $2;