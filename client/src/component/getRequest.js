export async function fetchBooks() {
  try {
      const response = await fetch('http://localhost:3000/Books/Get');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
  }
}