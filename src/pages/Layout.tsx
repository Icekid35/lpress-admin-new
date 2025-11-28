import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      {/* Desktop view */}
      <div className="fixed top-0 left-0 bottom-0 w-[250px] h-dvh overflow-auto hidden md:block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, fugiat
        perspiciatis. Voluptatem exercitationem distinctio, eius perspiciatis
        ullam inventore eos ducimus temporibus aliquam! Vel nisi sequi itaque,
        corrupti amet iusto deleniti fugiat, sint ipsa dolores optio velit sed
        dolorum temporibus! Mollitia, enim nisi! Vero nulla exercitationem
      </div>
      <div className="fixed left-[250px] right-0 top-0 hidden md:block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        doloribus dolor, at in animi placeat, laudantium unde ipsam illo
        officia, numquam deserunt labore libero incidunt? Cumque incidunt
        repellendus autem quo.
      </div>

      {/* Mobile view */}
      <div className="fixed top-0 left-0 right-0 md:hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint
        veniam. Iusto sed, nisi laboriosam id aut aspernatur fuga at!
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint
        veniam. Iusto sed, nisi laboriosam id aut aspernatur fuga at!
      </div>
      <div className="pt-14 md:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
