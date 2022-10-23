import { render, screen, waitFor } from '@testing-library/react'

import Home from "@pages/index";
import {ContextProvider} from "@context/index";



describe('loads and displays items',  () => {

    it('renders a logo', async () => {
        render(<ContextProvider><Home/></ContextProvider>)
        const brand =  await waitFor(() => screen.getByRole('brand'));

        // @ts-ignore
        expect(brand).toBeInTheDocument()
    });
    it('loads and displays CPIUS Chart', async() => {
        render(<ContextProvider><Home/></ContextProvider>)
        const CPIUS = await waitFor(() => document.querySelector('.cpius_chart canvas'));
        // @ts-ignore
        expect(CPIUS).not.toBeNull();
    });
    it('loads and displays RETAUS Chart', async() => {
        render(<ContextProvider><Home/></ContextProvider>)
        const RETAUS = await waitFor(() => document.querySelector('.retaus_chart canvas'));
        // @ts-ignore
        expect(RETAUS).not.toBeNull();
    });
    it('loads and displays CONFUS Chart', async() => {
        render(<ContextProvider><Home/></ContextProvider>)
        const CONFUS = await waitFor(() => document.querySelector('.confus_chart canvas'));
        // @ts-ignore
        expect(CONFUS).not.toBeNull();
    });
});
