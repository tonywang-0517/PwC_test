import type {NextPage} from 'next'
import CONFUSChart from "@components/modules/charts/confus_chart";
import CPIUSChart from "@components/modules/charts/cpius_chart";
import SENTUSChart from "@components/modules/charts/sentus_chart";
import RETAUSChart from "@components/modules/charts/retaus_chart";
import {APPLayout} from "@components/layout";
import Head from "next/head";


const Home: NextPage = () => (
    <APPLayout>
        <Head>
            <title>Economic Dashboard</title>
        </Head>
        <section className="container items-center py-10 grid grid-cols-1 lg:grid-cols-2 mx-auto gap-10 px-4 ">
            <div className={'h-full'} role={'CPIUS'}>
                <CPIUSChart/>
            </div>
            <div className={'h-full'} role={'CONFUS'}>
                <CONFUSChart/>
            </div>
            <div className={'h-full'} role={'RETAUS'}>
                <RETAUSChart/>
            </div>
            <div className={'h-full'}>
                <SENTUSChart/>
            </div>
        </section>
    </APPLayout>)


export default Home;
