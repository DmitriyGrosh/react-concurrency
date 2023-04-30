import React, { FC, PropsWithChildren } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { BlockingRendering } from "../pages/blocking-rendering";
import { ConcurrentRendering } from "../pages/concurrent-rendering";
import { UrgentNonUrgent } from "../pages/urgent-non-urgent";
import { BlockingAutocomplete } from "../pages/blocking-autocomplete";
import { ConcurrentAutocomplete } from "../pages/concurrent-autocomplete";
import { Players } from "../pages/players";

import { Header } from "../widgets/header";
import { ChartsStat } from '../pages/charts-stat';
import { LineChartWorker } from '../pages/charts/LineChartWorker';
import { DeferredPlayerList } from '../pages/deferred-value/DeferredPlayerList';

const PublicRoute: FC<PropsWithChildren> = () => {
    return (
        <>
            {/*<Header />*/}
            <main>
                <Outlet />
            </main>
        </>
    );
};

export const Router: FC = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <PublicRoute />,
            children: [
                {
                    path: 'concurrent-rendering',
                    element: <ConcurrentRendering />,
                },
                {
                    path: 'blocking-rendering',
                    element: <BlockingRendering />
                },
                {
                    path: 'urgent-non-urgent',
                    element: <UrgentNonUrgent />
                },
                {
                    path: 'blocking-autocomplete',
                    element: <BlockingAutocomplete />
                },
                {
                    path: 'concurrent-autocomplete',
                    element: <ConcurrentAutocomplete />
                },
                {
                    path: 'players/:type/:isLogs',
                    element: <Players />
                },
                {
                    path: 'charts',
                    element: <ChartsStat />
                },
                {
                    path: 'deferred',
                    element: <DeferredPlayerList />
                }
            ]
        },
        {
            path: '/charts',
            children: [
                {
                    path: ':count/:type',
                    element: <LineChartWorker />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};
