SELECT * FROM orders
JOIN clients ON (clients.client_id = orders.client_id)
JOIN items ON (items.item_id = orders.item_id)
WHERE orders.user_id = $1;
