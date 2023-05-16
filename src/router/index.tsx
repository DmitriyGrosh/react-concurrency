import React, { FC, PropsWithChildren } from "react";
import {
    // createBrowserRouter,
    // createHashRouter,
    Outlet,
    // RouterProvider,
    Route,
    Routes
} from "react-router-dom";

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
import { PlayersSearch } from '../pages/players/PlayersSearch';

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

const routes = [
    {
        path: '/concurrent-rendering',
        element: <ConcurrentRendering />,
    },
    {
        path: '/blocking-rendering',
        element: <BlockingRendering />
    },
    {
        path: '/urgent-non-urgent',
        element: <UrgentNonUrgent />
    },
    {
        path: '/blocking-autocomplete',
        element: <BlockingAutocomplete />
    },
    {
        path: '/concurrent-autocomplete',
        element: <ConcurrentAutocomplete />
    },
    {
        path: '/players/:type/:isLogs',
        element: <Players />
    },
    {
        path: '/charts',
        element: <ChartsStat />
    },
    {
        path: '/deferred',
        element: <DeferredPlayerList />
    },
    {
        path: '/charts/:count/:type',
        element: <LineChartWorker />
    },
    {
        path: '/players-search',
        element: <PlayersSearch />
    }
]

export const Router: FC = () => {
    // const router = createBrowserRouter([
    //     {
    //         path: '',
    //         element: <PublicRoute />,
    //         children: [
    //             {
    //                 path: 'concurrent-rendering',
    //                 element: <ConcurrentRendering />,
    //             },
    //             {
    //                 path: 'blocking-rendering',
    //                 element: <BlockingRendering />
    //             },
    //             {
    //                 path: 'urgent-non-urgent',
    //                 element: <UrgentNonUrgent />
    //             },
    //             {
    //                 path: 'blocking-autocomplete',
    //                 element: <BlockingAutocomplete />
    //             },
    //             {
    //                 path: 'concurrent-autocomplete',
    //                 element: <ConcurrentAutocomplete />
    //             },
    //             {
    //                 path: 'players/:type/:isLogs',
    //                 element: <Players />
    //             },
    //             {
    //                 path: 'charts',
    //                 element: <ChartsStat />
    //             },
    //             {
    //                 path: 'deferred',
    //                 element: <DeferredPlayerList />
    //             }
    //         ]
    //     },
    //     {
    //         path: '/charts',
    //         children: [
    //             {
    //                 path: ':count/:type',
    //                 element: <LineChartWorker />
    //             }
    //         ]
    //     }
    // ],
    //   {
    //       basename: '/react-concurrency'
    //   });

    return (
      <Routes>
          <Route path="*" element={<Header />} />
          {routes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
      </Routes>
    );
};
