// functions/getBooks.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = 'https://zxmojbbduanxklikmnot.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bW9qYmJkdWFueGtsaWttbm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3ODU1NzUsImV4cCI6MjA0NTM2MTU3NX0.8WCYfuHKOtimNQg72ZIoWvvGcEXT9CqnWMCpZnmmqXA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Change to your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle the GET request
  try {
    // Get query parameters from request
    const { author_id, sort = 'asc', limit = 10, offset = 0 } = req.query;

    // Create a base query to the Books table
    let query = supabase.from('Books').select('*');

    // Filter by author_id if provided
    if (author_id) {
      query = query.eq('author_id', author_id);
    }

    // Sort by publish_date, ascending or descending
    query = query.order('publish_date', { ascending: sort === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // Execute query
    const { data, error } = await query;

    // Handle errors if any
    if (error) throw error;

    // Send a successful response with the data
    res.status(200).json(data);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
}
