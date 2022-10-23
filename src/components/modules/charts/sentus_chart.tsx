import React, {useMemo} from "react";
import {Spin} from 'antd';
import {useFetch} from "@services/hooks";
import {fetchSENTUS,fetchPOPUS} from "@services/api";
import {useAppState} from "@context/AppContext/AppProvider";

const CPIUSChart: React.FC = () => {
    const {dates} = useAppState();
    const {data:SENTUSData,loading:sLoading,error:sError} = useFetch(fetchSENTUS,dates);
    const {data:POPUSData,loading:pLoading,error:pError} = useFetch(fetchPOPUS,dates);
    const POPUS:string = useMemo(()=>{
        if(POPUSData && POPUSData.data?.values && POPUSData.data.values.length>0){
            const values: Array<number> = POPUSData!.data!.values;
            return ((values[values.length-1] - values[0])*1000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
        return 'No Data';
    },[POPUSData]);

    const SENTUS:string = useMemo(()=>{
        if(SENTUSData && SENTUSData.data?.values && SENTUSData.data.values.length>0){
            return (SENTUSData?.data?.values?.reduce((p:number,n:number)=>p+n)/SENTUSData?.data?.values.length).toFixed(2).toString();
        }
        return 'No Data';
    },[SENTUSData])

    return (

        <section
            className="sentus_chart border border-slate-200 px-5 lg:px-10 xl:lg-15 py-5 sm:py-10 md:py-10  h-full w-full flex items-center">

            <div className={'mx-auto'}>
                <div>
                    <h4 className={'text-base sm:text-xl md:text-xl lg:text-sm xl:text-xl mt-0 capitalize'}>Average US
                        Sentiment Index (SENTUS)</h4>
                    {
                        sError? <p className={'m-0 mb-8 md:mb-4 lg:mb-8 text-3xl sm:text-4xl font-semibold md:text-4xl lg:text-2xl xl:text-4xl text-orange-500'}>SENTUS API ERROR</p>:
                        sLoading ?
                        <div className={'m-0 mb-8 md:mb-4 lg:mb-8 text-3xl sm:text-4xl font-semibold md:text-4xl  lg:text-2xl xl:text-4xl'}><Spin size={'default'} /></div> :
                            <p className={`m-0 mb-8 md:mb-4 lg:mb-8 text-3xl sm:text-4xl font-semibold md:text-4xl  lg:text-2xl xl:text-4xl ${!isNaN(+SENTUS) && (+SENTUS>0?'text-green-500':'text-red-500')}`} role="SENTUS">{SENTUS}</p>}
                </div>
                <div>
                    <h4 className={'text-base sm:text-xl md:text-xl lg:text-sm xl:text-xl capitalize'}>Population Growth
                        during the selected Period (POPUS)</h4>
                    {
                        pError? <p className={'m-0 text-3xl sm:text-4xl font-semibold md:text-4xl  lg:text-2xl xl:text-4xl text-orange-500'}>POPUS API ERROR</p>:
                        pLoading ? <div className={'m-0 mb-8 md:mb-4 lg:mb-8 text-3xl sm:text-4xl font-semibold md:text-4xl  lg:text-2xl xl:text-4xl'}><Spin size={'default'}/></div> :
                            <p className={'m-0 text-3xl sm:text-4xl font-semibold md:text-4xl  lg:text-2xl xl:text-4xl'} role="POPUS">{POPUS}</p>
                    }
                </div>
            </div>


        </section>
    );
};

export default CPIUSChart;
