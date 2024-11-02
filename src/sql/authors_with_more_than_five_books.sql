-- authors_with_more_than_five_books.sql
CREATE OR REPLACE FUNCTION authors_with_more_than_five_books()
RETURNS TABLE(author_id uuid, book_count integer) AS $$
BEGIN
    RETURN QUERY
    SELECT author_id, COUNT(*) AS book_count
    FROM Books
    GROUP BY author_id
    HAVING COUNT(*) > 5;
END;
$$ LANGUAGE plpgsql;
