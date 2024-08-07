import React, { Fragment } from "react";
import { movieTypes } from "./constants";
import { notFound } from "next/navigation";
import usefetch from "@/hooks/useFetch";
import ListFirm from "@/components/home/ListFirm";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/base/libs/Pagination";

type MovieTypeProps = {
  params: { typeParam: string };
  searchParams: {
    page: number;
    q: string;
  };
};

export default async function SearchPage({
  params,
  searchParams,
}: MovieTypeProps) {
  const { typeParam } = params;
  const { page = "1", q = "" } = searchParams;

  const type = movieTypes.find((item) => item.path === typeParam);
  if (!type) return notFound();

  const { data } = await usefetch<ResponseMovies>(
    type.path === "tim-kiem"
      ? `/tim-kiem?keyword=${q}&page=${page}`
      : `/danh-sach/${type.path}?&page=${page}&sort_field=year`,
  );

 
  
  if (!data) return notFound();

  const { items: dataFirm = [], params: paramsMovie } = data;

  const { pagination } = paramsMovie;
  const totalpage = pagination
    ? Math.floor(pagination.totalItems / pagination.totalItemsPerPage)
    : 0;

  if (searchParams.page > totalpage) {
    return notFound();
  }

  return (
    <Fragment>
      <div className="mt-2">
        <Breadcrumb />
      </div>
      <div className="mt-2 min-h-screen w-full bg-black/90 p-2">
        <h1 className="text-3xl font-medium">{type.title}</h1>
        {dataFirm.length > 0 ? (
          <Fragment>
            <div className="mt-2 grid grid-cols-2 gap-2 pb-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <ListFirm dataFirm={dataFirm} />
            </div>
            {/* Phân trang */}
            {pagination && totalpage > 1 && (
              <div className="flex items-center justify-center bg-black pb-10 pt-16">
                <Pagination
                  totalPage={totalpage}
                  initPage={searchParams.page && Number(searchParams.page)}
                />
              </div>
            )}
          </Fragment>
        ) : (
          <div className="mt-28 text-center text-3xl font-semibold text-white">
            Không có kết quả
          </div>
        )}
      </div>
    </Fragment>
  );
}
