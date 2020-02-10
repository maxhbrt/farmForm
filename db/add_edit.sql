INSERT INTO items( user_id, name, unit, price, avail )
values($1, $2, $3, $4, $5);

SELECT item_id FROM items
WHERE (user_id = $1 AND name = $2);
 
