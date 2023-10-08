import CustomAxios from "../Interceptor/Interceptor";
import { environment } from '../Environment/Environment';
const urlPrefix = 'auth/'
export const LoginServices = {
    Login(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'login', data)
    }
}
