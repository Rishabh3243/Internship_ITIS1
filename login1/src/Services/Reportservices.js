import CustomAxios from "../Interceptor/Interceptor";
import { environment } from '../Environment/Environment';

const urlPrefix = 'registration/'
const urlPrefix2 = 'dropdown/'
export const ReportServices = {
    report(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix + 'registrationreport', data)
    },
    reportedit(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix  + 'edit',data)
    },
    reportdropstatus(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix2 + 'status' ,data)
    },
    reportdropuser(data)
    {
        return CustomAxios.post(environment.api_url + urlPrefix2 + 'user' ,data)
    }
}
