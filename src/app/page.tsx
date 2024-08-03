import Breadcrumb from "@/components/Breadcrumb";
import FeaturedMovies from "@/components/Home/FeaturedMovies";
import FilterFirm from "@/components/Home/FilterFirm";

export const dataFirm = [
  {
    id: 1,
    name: "Hồ Yêu Tiểu Hồng Nương: Trúc Nghiệp Thiên",
    decription: "Love in Pavilion (2024)",
    img: "/phim1.jpg",
  },
  {
    id: 2,
    name: "Thiếu Niên Bạch Mã Túy Xuân Phong",
    decription: "Love in Pavilion (2024)",
    img: "/phim2.jpg",
  },
  {
    id: 3,
    name: "Hồ Yêu Tiểu Hồng Nương: Trúc Nghiệp Thiên",
    decription: "Love in Pavilion (2024)",
    img: "/phim3.jpg",
  },
  {
    id: 4,
    name: "Miêu Lĩnh Quỷ Sự",
    decription: "Love in Pavilion (2024)",
    img: "/phim4.jpg",
  },
  {
    id: 5,
    name: "Mục Trung Vô Nhân: Dùng Mắt Trả Mắt",
    decription: "Love in Pavilion (2024)",
    img: "/phim5.jpg",
  },
  {
    id: 6,
    name: "Miêu Lĩnh Quỷ Sự",
    decription: "Love in Pavilion (2024)",
    img: "/phim2.jpg",
  },
  {
    id: 7,
    name: "Mục Trung Vô Nhân: Dùng Mắt Trả Mắt",
    decription: "Love in Pavilion (2024)",
    img: "/phim3.jpg",
  },
  {
    id: 8,
    name: "Thiếu Niên Bạch Mã Túy Xuân Phong",
    decription: "Love in Pavilion (2024)",
    img: "/phim1.jpg",
  },
];

export default function Home() {
  return (
    <div className="mt-2 grid grid-cols-8 gap-x-2">
      <div className="col-span-full lg:col-span-6">
        <Breadcrumb />
        <div className="z-10 mt-2 min-h-screen rounded bg-black">
          <h1 className="ml-2 font-bold">DANH SÁCH PHIM BỘ</h1>
          <FilterFirm />
          <div className="mt-2 grid grid-cols-2 gap-x-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {dataFirm.map((firm) => {
              return (
                <div
                  className="relative mb-2 mt-2 cursor-pointer overflow-hidden rounded-sm"
                  key={firm.id}
                >
                  <img src={firm.img} alt="phim" style={{ width: "100%" }} />
                  <h2 className="mt-1 line-clamp-2 min-h-12 font-semibold">
                    {firm.name}
                  </h2>
                  <span className="mt-1 text-[10px]">{firm.decription}</span>

                  {/* Số tập */}
                  <div className="absolute left-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-white">
                    Tập 14
                  </div>
                  {/* HD */}
                  <div className="absolute right-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-primary">
                    HD
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="z-10 col-span-full lg:col-span-2 min-h-screen rounded bg-black pt-2 mt-4 md:mt-0">
        <h1 className="text-center">PHIM NỔI BẬT</h1>
        <FeaturedMovies />
      </div>
    </div>
  );
}
