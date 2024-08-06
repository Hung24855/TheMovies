import Pagination from "@/base/libs/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import FeaturedMovies from "@/components/Home/FeaturedMovies";
import FilterFirm from "@/components/Home/FilterFirm";
import usefetch from "@/hooks/useFetch";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams :{page:number}}) {
  
  const { data } = await usefetch<ResponseNewMovies>(
    `/danh-sach/phim-moi-cap-nhat?page=${searchParams.page}`,
  );

  // Sử dụng destructuring để trích xuất các giá trị cần thiết từ data
  const { items: dataFirm = [], params } = data ?? {};
  const { pagination } = params ?? {};
  const totalpage = pagination
    ? Math.floor(pagination.totalItems / pagination.totalItemsPerPage)
    : 0;

  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE;
  return (
    <div className="mt-2 grid grid-cols-8 gap-x-2">
      <div className="col-span-full lg:col-span-6">
        <Breadcrumb />
        {/* Danh sách phim */}
        <div className="z-10 mt-2 min-h-screen rounded bg-black">
          <h1 className="ml-2 font-bold">PHIM MỚI CẬP NHẬT</h1>
          <FilterFirm />
          <div className="mt-2 grid grid-cols-2 gap-x-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {dataFirm.map((firm) => {
              return (
                <Link key={firm._id} href={`/movie/${firm.slug}`}>
                  <div className="relative mb-2 mt-2 flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-sm duration-200 hover:-translate-y-1 hover:scale-[1.01]">
                    <img
                      src={`${domain_img}/${firm.thumb_url}`}
                      alt="phim"
                      style={{ width: "100%", objectFit: "cover", flex: 1 }}
                    />
                    <div>
                      <h2 className="mt-1 line-clamp-2 min-h-12 font-semibold">
                        {firm.name}
                      </h2>
                      <span className="mt-1 text-[10px]">{firm.lang}</span>
                    </div>
                    {/* Số tập */}
                    {firm.episode_current && (
                      <div className="absolute left-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-white">
                        {firm.episode_current.startsWith("Hoàn Tất")
                          ? `${firm.episode_current.replace("Hoàn Tất", "Full")}`
                          : firm.episode_current}
                      </div>
                    )}
                    {/* HD */}
                    {firm.quality && (
                      <div className="absolute right-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-primary">
                        {firm.quality}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Phân trang */}
        {pagination && (
          <div className="flex items-center justify-center bg-black pb-4 pt-6">
            <Pagination totalPage={totalpage} />
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
