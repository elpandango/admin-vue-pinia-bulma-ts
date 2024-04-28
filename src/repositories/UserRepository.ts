import Axios from './Clients/AxiosClient';
const resource = '/user';
export default {
    getUser() {
        return Axios.get(`${resource}/get-user`);
    }
};
