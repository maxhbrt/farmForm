INSERT INTO users
(farm_name, password, email)
VALUES
($1, $2, $3);


-- SELECT farm_name
-- FROM users
-- WHERE farm_name = $1;