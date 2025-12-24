import React, {useEffect, useState} from 'react';
import {fetchClientInfo} from "@features/monobank/api";

const Monobank = () => {
    const [monoClientInfo, setMonoClientInfo] = useState()

    useEffect(() => {
        const clientInfo = fetchClientInfo();
        setMonoClientInfo(clientInfo);
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Monobank</h1>
                    <p className="mt-1">Observe your monobank client info</p>
                </div>
            </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden">

                    <h1>{monoClientInfo?.name}</h1>
                </div>
        </div>

    );
};

export default Monobank;