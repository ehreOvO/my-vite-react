import { useState } from "react";
import Use_Api from "./Use_Api";
import { useEffect } from "react";
import Api_links from "./Api_links";


export default function Test() {
    const [data, setData] = useState({})
    const [ccc, setCcc] = useState('')

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        let isMounted = true; // 标记是否已卸载

        const fetchdata = async () => {
            const result = await Use_Api('asia', Api_links.PATH_ADDRESS.Account.Players,{ search: 'die_ehre',account_id:2024794880 });
            setData(result);
        }
        fetchdata()
        return () => {
            isMounted = false;
        }
    }, [])
    useEffect(() => {
        console.log('JSON.stringify(data)', JSON.stringify(data))
        console.log('data', data)
        setCcc(JSON.stringify(data))
    }, [data])

    return (
        <div>
            {ccc}
        </div>
    )
}