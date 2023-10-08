import CustomAxios from "../Interceptor/Interceptor";
import { environment } from '../Environment/Environment';
const urlPrefix = 'country/'
export const CountryServices = {
    country(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'grid', data)
    },
    countrydeactive(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'deactive', data)
    },
    countryinsert(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'insert', data)
    },
    countryedit(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'edit', data)
    },
    countryupdate(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'update', data)
    }
}
