import { FC, memo } from "react";
import { NavLink } from "react-router-dom";

export const Header: FC = memo(() => {
    return (
        <header className="flex flex__gap-lg">
            <NavLink to="/blocking-rendering">
                Blocking Rendering
            </NavLink>
            <NavLink to="/concurrent-rendering">
                Concurrent Rendering
            </NavLink>
            <NavLink to="/urgent-non-urgent">
                Urgent and Non Urgent Difference
            </NavLink>
            <NavLink to="/blocking-autocomplete">
                Blocking Autocomplete
            </NavLink>
            <NavLink to="/concurrent-autocomplete">
                Concurrent Autocomplete
            </NavLink>
        </header>
    );
})