export interface RedirectionItem {
  id: string | number;
  title: string;
  url: string;
  index?: number;
}

export async function fetchRedirections(url: string = '/redirs/redirects.json'): Promise<RedirectionItem[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch redirections: ${response.status} ${response.statusText}`);
    }

    const data: RedirectionItem[] = await response.json();

    // Ensure each item has an index if not provided
    return data.map((item, index) => ({
      ...item,
      index: item.index ?? index
    }));
  } catch (error) {
    console.error('Error fetching redirections:', error);
    throw error;
  }
}

// Example usage:
// const redirections = await fetchRedirections();
// or
// const redirections = await fetchRedirections('https://example.com/api/redirections');
