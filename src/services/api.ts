import axios from 'axios';

const API_URL = 'https://api.github.com/search/repositories';

export const fetchRepositories = async (query: string, page: number) => {
    const response = await axios.get(API_URL, {
        params: {
            q: query,
            sort: 'stars',
            order: 'desc',
            page,
            per_page: 5,
        },
    });
    return response.data.items;
};