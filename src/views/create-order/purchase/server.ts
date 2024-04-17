import { request } from '@/utils/service'
export const login = (data: any) => {
  return request<ApiResponseData>({
    method: 'POST',
    url: `/admin/ecm/login`,
    data: data
  })
}
