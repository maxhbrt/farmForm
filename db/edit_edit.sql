UPDATE items
SET name = $2,
unit = $3,
price = $4,
avail = $5
WHERE item_id = $1;

SELECT * FROM items 
WHERE item_id = $1;

