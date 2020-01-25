Select * from items
JOIN users
ON (users.user_id = items.user_id)
WHERE user_id = $1;