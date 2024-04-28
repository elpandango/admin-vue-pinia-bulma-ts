import Axios from './Clients/AxiosClient';
const resource = '/feed';
export default {
    get(page: number = 1) {
        return Axios.get(`${resource}/posts/?page=${page}`);
    },
    getPost(id: string) {
      return Axios.get(`${resource}/post/${id}`);
    },
    addPost(payload: any) {
      return Axios.post(`${resource}/post`, payload);
    },
    update(id: string, payload: any,) {
        return Axios.put(`${resource}/post/${id}`, payload);
    },
    delete(id: string) {
      return Axios.delete(`${resource}/post/${id}`)
    },
};
