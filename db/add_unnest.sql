INSERT INTO orders (item_id, quan, client_id)
values
(unnest ($1), unnest ($2), unnest ($3));

UPDATE items set avail = avail - data_table.quan
FROM
(select unnest($1) as item_id,
unnest($2) as quan) as data_table
where items.item_id = data_table.item_id;

