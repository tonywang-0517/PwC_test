import {Line} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import {useAppState} from "@context/AppContext/AppProvider";
import {fetchCPIUS} from '@services/api'


import {useFetch} from '@services/hooks';


const CPIUSChart: React.FC = () => {

    const {dates,scales} = useAppState();

    const {data: CPIUSData, loading, error} = useFetch(fetchCPIUS, dates)

    const labels = CPIUSData ? CPIUSData.data?.dates.map((t:string)=>{let ts = t.split('-'); ts.pop(); return ts.join('-');}) : [];

    const data = {
        labels,
        datasets: [
            {
                label: CPIUSData ? CPIUSData.ticker : '',
                data: CPIUSData ? CPIUSData.data?.values : [],
                borderColor: '#91d5ff',
                backgroundColor: '#91d5ffa8',
            }
        ]
    };
    if(scales>100){
        data.datasets?.push({
            label: CPIUSData ? `${CPIUSData.ticker} With Scales` : '',
            data: CPIUSData ? CPIUSData.data?.values.map((v:number)=>v*scales/100) : [],
            borderColor: '#a78bfa',
            backgroundColor: '#a78bfaa8',
        });
    }
    const options = CPIUSData && {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${CPIUSData.ticker} - ${CPIUSData.description}`,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                    maxTicksLimit:6
                }
            }
        }
    };
    return (<div className={'cpius_chart'}>
        {
            error ? <p className={'text-3xl text-center mt-20 text-orange-500'}>CPIUS API Error</p> :
                <Spin spinning={loading}>
                    <Line options={options} data={data} />
                </Spin>
        }
    </div>)
};

export default CPIUSChart;
