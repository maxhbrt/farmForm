SELECT * FROM items
join users
ON (users.user_id = items.user_id);
