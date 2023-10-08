import CustomAxios from "../Interceptor/Interceptor";
import { environment } from '../Environment/Environment';
const urlPrefix = 'city/'
const urlPrefix2 = 'dropdown/'
export const CityServices = {
    city(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'grid', data)
    },
    citydeactive(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'deactive', data)
    },
    cityinsert(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'insert', data)
    },
    cityedit(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'edit', data)
    },
    cityupdate(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'update', data)
    },
    dropdowncountry(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix2 + 'Country', data)
    },
    dropdownstate(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix2 + 'State', data)
    }

}