import useSWRImmutable from 'swr/immutable'
import {IecondbRes} from "@services/api";

type Res = {
    loading:boolean,
    data:IecondbRes|undefined,
    error:boolean,
}

export const useFetch = (fetcher: any, props: any):Res => {
    const key = `${fetcher.name}-${JSON.stringify(props)}`;
    const {data: swrData, error: swrError} = useSWRImmutable<IecondbRes, Error>(key, () => fetcher(props));
    return {
        loading: (!swrError && !swrData),
        data: swrData,
        error: !!swrError
    }
};
