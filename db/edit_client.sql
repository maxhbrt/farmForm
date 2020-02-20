UPDATE clients
SET business_name = $1
WHERE client_id = $2;

SELECT * FROM clients WHERE client_id = $2;