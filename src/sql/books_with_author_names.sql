-- books_with_author_names.sql
CREATE OR REPLACE FUNCTION books_with_author_names(year int)
RETURNS TABLE(book_id uuid, title text, price numeric, publish_date date, author_name text) AS $$
BEGIN
    RETURN QUERY
    SELECT Books.book_id, Books.title, Books.price, Books.publish_date, Authors.name AS author_name
    FROM Books
    JOIN Authors ON Books.author_id = Authors.author_id
    WHERE EXTRACT(YEAR FROM Books.publish_date) = year
    ORDER BY Books.price DESC;
END;
$$ LANGUAGE plpgsql;
