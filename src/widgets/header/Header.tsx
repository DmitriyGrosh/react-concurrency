import { FC, memo } from "react";
import { NavLink } from "react-router-dom";

export const Header: FC = memo(() => {
    return (
        <header className="flex flex__gap-lg">
            <NavLink to="/players/sync/false">
              Players Sync
            </NavLink>
            <NavLink to="/players/async/false">
              Players Async
            </NavLink>
            <NavLink to="/players/concurrent/false">
              Players Concurrent
            </NavLink>
            <NavLink to="/urgent-non-urgent">
              Urgent and Non Urgent Difference
            </NavLink>
            <NavLink to="/blocking-rendering">
              Blocking Rendering
            </NavLink>
            <NavLink to="/concurrent-rendering">
              Concurrent Rendering
            </NavLink>
            <NavLink to="/concurrent-autocomplete">
              Concurrent Autocomplete
            </NavLink>
            <NavLink to="/players-search">
              Players Search
            </NavLink>
        </header>
    );
})
