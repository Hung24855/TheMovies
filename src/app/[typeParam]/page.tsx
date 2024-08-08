import React, { Fragment } from "react";
import { movieTypes } from "./constants";
import { notFound } from "next/navigation";
import usefetch from "@/hooks/useFetch";
import ListFirm from "@/components/shared/ListFirm";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/base/libs/Pagination";
import clsx from "clsx";
import FilterFirm from "@/components/shared/FilterFirm";

export default async function SearchPage({
  params,
  searchParams,
}: MovieContext) {
  const { typeParam } = params;
  const {
    page = "1",
    q = "",
    category,
    year,
    sort_type,
    country,
    sort_field,
  } = searchParams;

  const type = movieTypes.find((item) => item.path === typeParam);
  if (!type) return notFound();

  const paramFilter = clsx(
    year && `&year=${year}`,
    category && `&category=${category}`,
    sort_type && `&sort_type=${sort_type}`,
    country && `&country=${country}`,
    sort_field === "name"
      ? `&sort_field=${sort_field}&sort_type=asc`
      : "&sort_field=year",
  );
  // url get data
  let url = "";
  if (type.path === "tim-kiem") {
    url = `/tim-kiem?keyword=${q}&page=${page}${paramFilter}`;
  } else {
    url = `/danh-sach/${type.path}?&page=${page}${paramFilter}`;
  }

  const { data } = await usefetch<ResponseMovies>(url.replace(/\s+/g, ""));

  if (!data) return notFound();

  const { items: dataFirm = [], params: paramsMovie } = data;
  if (!paramsMovie) {
    return notFound();
  }

  const { pagination } = paramsMovie;
  const totalpage =
    pagination && pagination.totalItems > pagination.totalItemsPerPage
      ? Math.floor(pagination.totalItems / pagination.totalItemsPerPage)
      : 1;

  if (Number(page) > totalpage) {
    return notFound();
  }

  const { data: genres } = await usefetch<ResponseGenres>("/the-loai");
  const { data: countries } = await usefetch<ResponseCountries>("/quoc-gia");

  return (
    <Fragment>
      {/* <div className="mt-2">
        <Breadcrumb />
      </div> */}
      <div className="mt-2 min-h-screen w-full bg-black/90 pt-2">
        <h1 className="ml-2 font-bold">{type.title.toUpperCase()}</h1>
        <FilterFirm
          genres={genres?.items ?? null}
          countries={countries?.items ?? null}
        />
        {dataFirm.length > 0 ? (
          <Fragment>
            <div className="mt-2 grid grid-cols-2 gap-2 px-2 pb-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <ListFirm dataFirm={dataFirm} />
            </div>
            {/* Phân trang */}
            {pagination && totalpage > 1 && (
              <div className="flex items-center justify-center bg-black pb-10 pt-16">
                <Pagination totalPage={totalpage} initPage={Number(page)} />
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
