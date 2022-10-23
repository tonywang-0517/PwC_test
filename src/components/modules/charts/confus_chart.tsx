import React from 'react';
import {Line} from "react-chartjs-2";
import {Spin} from "antd";
import {useAppState} from "@context/AppContext/AppProvider";
import {fetchCONFUS} from "@services/api";
import {useFetch} from "@services/hooks";


const CONFUSChart: React.FC = () => {

    const {dates, scales} = useAppState();
    const {data: CONFUSData, loading, error} = useFetch(fetchCONFUS, dates);
    const labels = CONFUSData ? CONFUSData.data?.dates.map((t: string) => {
        let ts = t.split('-');
        ts.pop();
        return ts.join('-');
    }) : [];
    const data = {
        labels,
        datasets: [
            {
                label: CONFUSData ? CONFUSData.ticker : '',
                data: CONFUSData ? CONFUSData.data?.values : [],
                borderColor: '#91d5ff',
                backgroundColor: '#91d5ffa8',
            },
        ],
    };
    if (scales > 100) {
        data.datasets?.push({
            label: CONFUSData ? `${CONFUSData.ticker} With Scales` : '',
            data: CONFUSData ? CONFUSData.data?.values.map((v: number) => v * scales / 100) : [],
            borderColor: '#a78bfa',
            backgroundColor: '#a78bfaa8',
        });
    }
    const options = CONFUSData && {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${CONFUSData.ticker} - ${CONFUSData.description}`,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                    maxTicksLimit: 6
                }
            }
        }
    };

    return (<div className={'confus_chart'}>
        {
            error ? <p className={'text-3xl text-center mt-20 text-orange-500'}>CONFUS API Error</p> :
                <Spin spinning={loading}>
                    <Line options={options} data={data}/>
                </Spin>
        }

    </div>)
};

export default CONFUSChart;
