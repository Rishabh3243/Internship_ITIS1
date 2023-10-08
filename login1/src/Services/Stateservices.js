import CustomAxios from "../Interceptor/Interceptor";
import { environment } from '../Environment/Environment';
const urlPrefix = 'state/'
const urlPrefix2 = 'dropdown/'
export const StateServices = {
    state(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'grid', data)
    },
    statedeactive(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'deactive', data)
    },
    stateinsert(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'insert', data)
    },
    stateedit(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'edit', data)
    },
    stateupdate(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'update', data)
    },
    dropdown(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix2 + 'Country', data)
    }
}