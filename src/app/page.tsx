import Pagination from "@/base/libs/Pagination";

import FeaturedMovies from "@/components/home/FeaturedMovies";
import FilterFirm from "@/components/home/FilterFirm";
import ListFirm from "@/components/home/ListFirm";
import usefetch from "@/hooks/useFetch";
import { notFound } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const { data } = await usefetch<ResponseMovies>(
    `/danh-sach/phim-moi-cap-nhat?page=${searchParams.page}&sort_field=year`,
  );

  if (!data) {
    return notFound();
  }

  const { items: dataFirm = [], params } = data;
  const { pagination } = params;
  const totalpage = pagination
    ? Math.floor(pagination.totalItems / pagination.totalItemsPerPage)
    : 0;

  if (searchParams.page > totalpage) {
    return notFound();
  }
  return (
    <div className="mt-2 grid grid-cols-8 gap-x-2">
      <div className="col-span-full bg-black lg:col-span-6">
        {/* Danh sách phim */}
        <div className="z-10 mt-2 min-h-screen rounded">
          <h1 className="ml-2 font-bold">PHIM MỚI CẬP NHẬT</h1>
          <FilterFirm />
          {/* Danh sách phim */}
          <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <ListFirm dataFirm={dataFirm} />
          </div>
        </div>
        {/* Phân trang */}
        {pagination && (
          <div className="flex items-center justify-center bg-black pb-10 pt-16">
            <Pagination
              totalPage={totalpage}
              initPage={searchParams.page && Number(searchParams.page)}
            />
          </div>
        )}
      </div>
      {/* Phim noi bat */}
      <div className="z-10 col-span-full mt-4 min-h-screen rounded bg-black pt-2 md:mt-0 lg:col-span-2">
        <h1 className="text-center">PHIM NỔI BẬT</h1>
        <FeaturedMovies />
      </div>
    </div>
  );
}
