import PaginatedLinks from "./paginatedLinks";

function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Record<string, string>;
}) {
  return (
    <main className="max-w-[1360px] mx-auto mt-[140px] mb-20">
      <div className=" w-[95%] mx-auto">
        <h1 className="text-4xl text-white font-extrabold ">
          Amr Diab's Albums
        </h1>
        <div
          className="w-full mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] 
      gap-3 justify-items-center"
        >
          {children}
        </div>
        <PaginatedLinks />
      </div>
    </main>
  );
}

export default layout;
