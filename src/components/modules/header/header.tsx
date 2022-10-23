import {DatePicker, Slider} from 'antd';
import type {SliderMarks} from 'antd/es/slider';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    BarElement,
    Tooltip
} from "chart.js";
import {useAppDispatch, useAppState} from "@context/AppContext/AppProvider";
import IAppState from "@context/AppContext/AppReducer";
const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM';
const formatter = (value?: number) => `${value && value / 100}`;
const marks: SliderMarks = {
    100: '1',
    200: '2',
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
);

const Header = () => {
    const {scales,dates} = useAppState();
    const {setScales,setDates} = useAppDispatch();



    return <nav className="sticky bg-stone-100 top-0 z-10 w-full bg-white shadow-md py-8">
        <div className="flex flex-col md:flex-row gap-x-10 gap-y-4  justify-between items-center px-10 mx-auto">
            <a href="#" className="flex">
                <span className="self-center text-3xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r to-sky-400 from-violet-700" role='brand'>Economic Dashboard</span>
            </a>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <div className="flex items-center">
                    <RangePicker placeholder={['from', 'to']} picker="month"
                                 defaultValue={dates}
                                 onCalendarChange={(val) => {if(val&&val[0]&&val[1])setDates(val as IAppState['dates'])}}
                                 allowClear={true}
                    />
                </div>
                <div className="items-center">
                    <Slider tooltip={{formatter}} min={100} max={200} marks={marks} defaultValue={scales}
                            onAfterChange={(val)=>{setScales(val)}}
                    />
                </div>
            </div>
        </div>
    </nav>
};

export default Header;
