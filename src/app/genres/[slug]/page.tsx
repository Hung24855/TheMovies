import Pagination from "@/base/libs/Pagination";
import Breadcrumb from "@/components/shared/Breadcrumb";
import FilterFirm from "@/components/shared/FilterFirm";
import ListFirm from "@/components/shared/ListFirm";
import usefetch from "@/hooks/useFetch";
import clsx from "clsx";
import { notFound } from "next/navigation";
import React, { Fragment } from "react";



export default async function GenresPage({ searchParams, params }: MovieContext) {
const {
  page = "1",
  category,
  year,
  sort_type,
  country,
  sort_field,
} = searchParams;

  const { data } = await usefetch<ResponseMovies>(
    clsx(
      `/the-loai/${params.slug}?page=${searchParams.page}`,
      year && `&year=${year}`,
      category && `&category=${category}`,
      sort_type && `&sort_type=${sort_type}`,
      country && `&country=${country}`,
      sort_field === "name"
        ? `&sort_field=${sort_field}&sort_type=asc`
        : "&sort_field=year",
    ).replace(/\s+/g, ""),
  );

  if (!data) {
    return notFound();
  }

  const { titlePage } = data;

  const { items: dataFirm = [], params: paramsMovie } = data;
  if (!paramsMovie) {
    return notFound();
  }

  const { pagination } = paramsMovie;
  const totalpage =
    pagination && pagination.totalItems > pagination.totalItemsPerPage
      ? Math.floor(pagination.totalItems / pagination.totalItemsPerPage)
      : 0;

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
      <div className="mt-2 min-h-screen bg-black pt-2">
        <h1 className="ml-2 font-bold">{`PHIM ${titlePage}`.toUpperCase()}</h1>
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
