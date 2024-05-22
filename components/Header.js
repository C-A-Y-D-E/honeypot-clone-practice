import React from "react";

const Header = () => {
  return (
    <div className="bg-[#F1B825]">
      <div className="container mx-auto px-6 py-10 ">
        <div className="flex gap-4 items-center">
          <img src="/logo.png" className="max-w-[200px] w-full" />
          <div className="h-[40px] bg-black w-[1px]" />
          <a
            href="https://t.me/honeypotis"
            className="border-2 block border-black  h-10 w-10 rounded-full p-2"
          >
            <svg
              class="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
