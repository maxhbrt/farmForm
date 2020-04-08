INSERT INTO orders (item_id, quan, client_id)
values
(unnest ($1), unnest ($2), unnest ($3));

--UPDATE items
--SET avail = avail - $2 
--WHERE item_id = $1
--(unnest ($1), unnest ($2));

