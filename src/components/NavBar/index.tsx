import React from "react";

interface Props {
    changeNav: boolean;
}

const NavBar = ({ changeNav }: Props) => {
    return (
        <section
            className={
                changeNav
                    ? "fixed flex p-5 bg-black/[.1] transition ease-in duration-700 justify-between w-full"
                    : "fixed flex p-5  transition ease-in duration-700 justify-between w-full"
            }
        >
            <div className="flex gap-10">
                <div className="ml-10">Logo</div>
                <ul className="flex gap-7 ml-10 text-white">
                    <li>More popular</li>
                    <li>More views</li>
                </ul>
            </div>
            <div className="mr-10">
                <span className="text-white">Account</span>
            </div>
        </section>
    );
};

export default NavBar;
