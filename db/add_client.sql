INSERT INTO clients( business_name )
values($1);

SELECT * FROM clients
WHERE business_name = $1;