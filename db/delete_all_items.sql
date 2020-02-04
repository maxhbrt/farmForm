DELETE FROM items WHERE user_id = $1;

SELECT * FROM items
WHERE user_id = $1;