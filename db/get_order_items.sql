SELECT * FROM items
JOIN users
ON (users.user_id = items.user_id);
