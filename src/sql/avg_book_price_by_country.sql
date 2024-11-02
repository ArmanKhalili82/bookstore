-- avg_book_price_by_country.sql
CREATE OR REPLACE FUNCTION avg_book_price_by_country()
RETURNS TABLE(country text, avg_price numeric) AS $$
BEGIN
    RETURN QUERY
    SELECT Authors.country, AVG(Books.price) AS avg_price
    FROM Books
    JOIN Authors ON Books.author_id = Authors.author_id
    GROUP BY Authors.country;
END;
$$ LANGUAGE plpgsql;
