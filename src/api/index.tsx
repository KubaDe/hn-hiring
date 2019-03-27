import axios from 'axios';
import { SearchThreadDto, GetThreadDto } from './thread.dto';

export const thread = {
  search: async (query: string): Promise<SearchThreadDto> => {
    try {
      const result = await axios.request({
          method: 'get',
          url: 'https://hn.algolia.com/api/v1/search',
          params: {
            query,
          },
        },
      );
      const { data } = result;
      return data;
    } catch (e) {
      console.error(e);
    }
    return {
      hits: [],
    };
  },
  getThread: async (id: string): Promise<GetThreadDto> => {
    try {
      const result = await axios.request({
          method: 'get',
          url: `https://hn.algolia.com/api/v1/items/${id}`,
        },
      );
      const { data } = result;
      return data;
    } catch (e) {
      console.error(e);
    }
    return {
      children: [],
      title: '',
    };
  },
};
