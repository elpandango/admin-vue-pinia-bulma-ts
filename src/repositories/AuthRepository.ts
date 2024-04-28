import Axios from './Clients/AxiosClient';
const resource = '/auth';
export default {
    login(payload: any) {
        return Axios.post(`${resource}/login`, payload);
    },
    signup(payload: any) {
        return Axios.put(`${resource}/signup`, payload);
    }
};
