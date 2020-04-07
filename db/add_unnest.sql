INSERT INTO orders (item_id, quan, client_name)
(SELECT * from UNNEST($1, $2, $3) );