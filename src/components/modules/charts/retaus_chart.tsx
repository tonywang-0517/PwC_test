import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import {fetchRETAUS} from "@services/api";
import {useAppState} from "@context/AppContext/AppProvider";
import {useFetch} from "@services/hooks";


const RETAUSChart: React.FC = () => {
    const {dates} = useAppState();
    const {data: RETAUSData, loading, error} = useFetch(fetchRETAUS, dates)

    const labels = RETAUSData ? RETAUSData.data?.dates.map((t:string)=>{let ts = t.split('-'); ts.pop(); return ts.join('-');}) : [];
    const data = {
        labels,
        datasets: [
            {
                label: RETAUSData?.ticker,
                data: RETAUSData?.data?.values,
                borderColor: '#91d5ff',
                backgroundColor: '#91d5ffa8',
            },
        ],
    };
    const options = RETAUSData && {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${RETAUSData.ticker} - ${RETAUSData.description}`,
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


    return <div className={'retaus_chart'}>
        {
            error ? <p className={'text-3xl text-center mt-20 text-orange-500'}>RETAUS API Error</p> :
                <Spin spinning={loading}>
                    <Bar options={options} data={data}/>
                </Spin>
        }
    </div>;
};

export default RETAUSChart;
