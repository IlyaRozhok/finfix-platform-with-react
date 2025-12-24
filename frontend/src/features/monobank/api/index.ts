import {api} from "@shared/api/axios";

export const fetchClientInfo = async () => {
    try {
        const res = await api.get("/api/integrations/monobank/client-info")
        return res.data;
    }
    catch(err) {
        console.error("Failed to fetch monobank client info", err)
        throw err
    }
}