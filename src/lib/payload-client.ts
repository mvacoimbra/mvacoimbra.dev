import { getPayload } from 'payload'
import config from '@/src/modules/payload/payload.config'

export const getPayloadClient = async () => {
  return await getPayload({ config })
}
