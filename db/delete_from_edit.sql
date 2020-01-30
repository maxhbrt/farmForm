DELETE FROM items WHERE item_id = $1;

SELECT * from items
WHERE user_id = $2;