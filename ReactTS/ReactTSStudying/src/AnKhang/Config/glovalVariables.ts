import { ColDef } from "ag-grid-enterprise";
import { generateSlug } from "./function";
import {
  AttributeProps,
  ContactProps,
  ContentProps,
  DecorationItemsProps,
  FormMedicineProps,
  HealthNewsProps,
  MedicineProps,
  OrderProps,
  UserProps,
} from "./interface";

export const decorationItems: DecorationItemsProps[] = [
  {
    imageURL: "/AnKhang/topleft.png",
    classCSS: "topleft",
  },
  {
    imageURL: "/AnKhang/topright.png",
    classCSS: "topright",
  },
  {
    imageURL: "/AnKhang/bottomleft.png",
    classCSS: "bottomleft",
  },
  {
    imageURL: "/AnKhang/bottomright.png",
    classCSS: "bottomright",
  },
];

export const storeIndexPics = ["0Pic.jpg", "1Pic.jpg", "2Pic.jpg"];
export const contactData: ContactProps[] = [
  {
    title: "TỔNG ĐÀI",
    storeText: [
      { text: "Gọi mua (8:00 - 21:30):", phoneNum: " 1900 1572" },
      { text: "Khiếu nại (8:00 - 21:30):", phoneNum: " 1900 1275" },
    ],
    sizeContact: 3.3,
  },
  {
    title: "HỆ THỐNG NHÀ THUỐC",
    storeText: [
      { text: "Hệ thống 326 nhà thuốc", phoneNum: null },
      { text: "Nội quy nhà thuốc", phoneNum: null },
      { text: "Chất lượng phục vụ", phoneNum: null },
      { text: "Chính sách đổi trả, bảo hành", phoneNum: null },
      { text: "Tích điểm Quà tặng VIP", phoneNum: null },
    ],
    sizeContact: 2.6,
  },
  {
    title: "HỖ TRỢ KHÁCH HÀNG",
    storeText: [
      { text: "Điều kiện giao dịch chung", phoneNum: null },
      { text: "Hướng dẫn mua hàng online", phoneNum: null },
      { text: "Chính sách giao hàng", phoneNum: null },
      { text: "Chính sách thanh toán", phoneNum: null },
      { text: "Lịch sử đơn hàng", phoneNum: null },
    ],
    sizeContact: 2.6,
  },
  {
    title: "VỀ NHÀ THUỐC AN KHANG",
    storeText: [
      { text: "Giới thiệu công ty", phoneNum: null },
      { text: "Ban Điều Hành", phoneNum: null },
      { text: "Chính sách xử lý dữ liệu cá nhân", phoneNum: null },
    ],
    sizeContact: 2.6,
  },
];

export const storeFooterLogosWB: string[] = [];
for (let i = 0; i < 7; i++) {
  storeFooterLogosWB.push(`/AnKhang/FooterLogosWB/footerLogosWB${i}.png`);
}

export const storeEachFormStyle: FormMedicineProps[] = [
  {
    typeForm: "Tủ thuốc gia đình",
    typeMedicine: [
      {
        title: "Giảm đau, hạ sốt",
        keyWords: ["Giảm đau", "Hạ sốt"],
      },
      {
        title: "Mắt, tai, mũi, họng",
        keyWords: ["Vệ sinh mắt", "Vệ sinh tai", "Vệ sinh mũi", "Vệ sinh họng"],
      },
      {
        title: "Hỗ trợ tiêu hóa",
        keyWords: ["Tiêu hóa"],
      },
      {
        title: "Đau nhức, hô hấp",
        keyWords: ["Đau nhức", "Hô hấp"],
      },
    ],
    defaultCategory: ["Giảm đau", "Hạ sốt"],
  },
  {
    typeForm: "Thực phẩm chức năng",
    typeMedicine: [
      {
        title: "Vitamin, khoáng chất",
        keyWords: ["Vitamin"],
      },
      {
        title: "Tuần hoàn máu",
        keyWords: ["Tuần hoàn máu"],
      },
      {
        title: "Chăm sóc gan",
        keyWords: ["Chăm sóc gan"],
      },
    ],
    defaultCategory: ["Vitamin"],
  },
  {
    typeForm: "Dược mỹ phẩm chính hãng",
    typeMedicine: [
      {
        title: "Chăm sóc da",
        keyWords: ["Chăm sóc da"],
      },
      {
        title: "Chống nắng",
        keyWords: ["Chống nắng"],
      },
      {
        title: "Dưỡng ẩm",
        keyWords: ["Dưỡng ẩm"],
      },
      {
        title: "Trị mụn, trị seo",
        keyWords: ["Trị mụn", "Trị sẹo"],
      },
    ],
    defaultCategory: ["Chăm sóc da"],
  },
];

export const placeholderValues = [
  "Tìm tên thuốc",
  "Tìm theo bệnh",
  "Miễn phí đơn hàng trên 150k",
];

export const storeContents: ContentProps[] = [
  {
    mainTitle: "THỰC PHẨM CHỨC NĂNG",
    relatives: [
      {
        title: "Vitamin & Khoáng chất",
        keyWords: [
          "Vitamin",
          "Dầu cá, Omega 3, DHA",
          "Vitamin C",
          "Vitamin D",
          "Bổ sung sắt & Axit Folic",
        ],
      },
      {
        title: "Sinh lý & Nội tiết tố",
        keyWords: [
          "Sinh lý nam",
          "Sinh lý nữ",
          "Sức khỏe tình dục",
          "Cân bằng nội tiết tố",
          "Hỗ trợ mãn kinh",
        ],
      },
      {
        title: "Cải thiện tăng cường chức năng",
        keyWords: [
          "Chăm sóc gan",
          "Tăng sức đề kháng, miễn dịch",
          "Bổ mắt, bảo vệ mắt",
          "Hỗ trợ trao đổi chất",
          "Giải rượu, cai rượu",
        ],
      },
      {
        title: "Hỗ trợ điều trị",
        keyWords: [
          "Cơ xương khớp",
          "Hô hấp, ho, xoang",
          "Thận, tiền liệt tuyến",
          "Hỗ trợ điều trị trĩ",
          "Hỗ trợ điều trị gout",
          "Hỗ trợ điều trị tiểu đường",
          "Hỗ trợ điều trị ung thư",
        ],
      },
      {
        title: "Hỗ trợ tiêu hóa",
        keyWords: [
          "Tiêu hóa",
          "Dạ dày, tá tràng",
          "Táo bón",
          "Vi sinh - Probiotic",
          "Đại tràng",
          "Khó tiêu",
        ],
      },
      {
        title: "Thần kinh não",
        keyWords: [
          "Bổ não, cải thiện trí nhớ",
          "Hỗ trợ giấc ngủ ngon",
          "Tuần hoàn máu",
          "Kiểm soát căng thẳng",
          "Hoạt huyết",
        ],
      },
      {
        title: "Hỗ trợ làm đẹp",
        keyWords: ["Da", "Hỗ trợ giảm cân", "Tóc"],
      },
      {
        title: "Sức khỏe tim mạch",
        keyWords: ["Giảm cholesterol", "Huyết áp", "Suy giãn tỉnh mạch"],
      },
      {
        title: "Dinh dưỡng",
        keyWords: ["Sữa", "Dinh dưỡng trẻ em"],
      },
    ],
  },
  {
    mainTitle: "THIẾT BỊ Y TẾ",
    relatives: [
      {
        title: "Dụng cụ y tế",
        keyWords: [
          "Dụng cụ vệ sinh mũi",
          "Kim các loại",
          "Máy massage",
          "Túi chườm",
          "Vớ ngăn tĩnh mạch",
          "Găng tay",
          "Đai lưng",
          "Dụng cụ vệ sinh tai",
          "Đai nẹp",
          "Máy xông khí dung",
        ],
      },
      {
        title: "Dụng cụ theo dõi",
        keyWords: [
          "Máy đo huyết áp",
          "Máy, que thử đường huyết",
          "Thử thai",
          "Nhiệt kế",
          "Kit Test Covid",
          "Máy đo SpO2",
        ],
      },
      {
        title: "Dụng cụ sơ cứu",
        keyWords: [
          "Băng y tế",
          "Bông y tế",
          "Cồn, nước sát trùng, nước muối",
          "Chăm sóc vết thương",
          "Xịt giảm đau, kháng viêm",
          "Miếng dán giảm đau, hạ sốt",
        ],
      },
      {
        title: "Khẩu trang",
        keyWords: ["Khẩu trang y tế", "Khẩu trang vải"],
      },
    ],
  },
  {
    mainTitle: "DƯỢC MỸ PHẨM",
    relatives: [
      {
        title: "Chăm sóc da mặt",
        keyWords: [
          "Sữa rửa mặt (Kem, gel, sữa)",
          "Kem chống nắng da mặt",
          "Dưỡng da mặt",
          "Mặt nạ",
          "Serum, Essence hoặc Ampoule",
          "Toner ( nước hoa hồng )/Lotion",
          "Tẩy tế bào chết",
          "Xịt khoáng",
          "Nước tẩy trang, dầu tẩy trang",
        ],
      },
      {
        title: "Chăm sóc cơ thể",
        keyWords: [
          "Sữa tắm, xà bông",
          "Chống nắng toàn thân",
          "Lăn khử mùi, xịt khử mùi",
          "Sữa dưỡng thể, kem dưỡng thể",
          "Trị nứt da",
          "Kem dưỡng da, tay chân",
          "Chăm sóc ngực",
          "Message",
        ],
      },
      {
        title: "Giải pháp làn da",
        keyWords: [
          "Trị sẹo, mờ vết thâm",
          "Kem trị mụn, gel trị mụn",
          "Dưỡng da bị khô, thiếu ẩm",
          "Kem trị nám, tàn nhang, đốm nâu",
          "Viêm da cơ địa",
          "Da bị kích ứng",
          "Tái tạo, chống lão hóa da",
          "Da sạm, xỉn màu",
        ],
      },
      {
        title: "Chăm sóc tóc - da đầu",
        keyWords: [
          "Dầu gội đầu xả",
          "Dầu gội trị nấm",
          "Dưỡng tóc, ủ tóc",
          "Đặc trị cho tóc",
        ],
      },
      {
        title: "Mỹ phẩm trang điểm",
        keyWords: ["Son môi", "Trang điểm mặt"],
      },
      {
        title: "Chăm sóc da vùng mắt",
        keyWords: [
          "Trị quầng thâm, bọng mắt",
          "Xóa nếp nhăn vùng mắt",
          "Dưỡng da mắt",
        ],
      },
      {
        title: "Sản phẩm từ thiên nhiên",
        keyWords: ["Tinh dầu", "Dầu dừa"],
      },
    ],
  },
  {
    mainTitle: "CHĂM SÓC CÁ NHÂN",
    relatives: [
      {
        title: "Hỗ trợ tình dục",
        keyWords: ["Bao cao su", "Gel bôi trơn"],
      },
      {
        title: "Thực phẩm - Đồ uống",
        keyWords: [
          "Nước Yến",
          "Kẹo cứng",
          "Nước uống không gas",
          "Đường ăn kiêng",
          "Trà thảo dược",
          "Kẹo dẻo",
          "Tổ Yến",
        ],
      },
      {
        title: "Vệ sinh cá nhân",
        keyWords: [
          "Dung dịch vệ sinh phụ nữ",
          "Vệ sinh tai",
          "Băng vệ sinh",
          "Nước rửa tay",
        ],
      },
      {
        title: "Chăm sóc răng miệng",
        keyWords: [
          "Kem đánh răng",
          "Bàn chải điện",
          "Chi nha khoa",
          "Chăm sóc răng",
          "Nước súc miệng",
        ],
      },
      {
        title: "Đồ dùng gia đình",
        keyWords: [
          "Chống muỗi & côn trùng",
          "Đồ dùng cho bé",
          "Đồ dùng cho mẹ",
        ],
      },
      {
        title: "Hàng tổng hợp",
        keyWords: ["Khăn giấy, khăn ướt"],
      },
      {
        title: "Tinh dầu các loại",
        keyWords: ["Tinh dầu massage", "Tinh dầu trị cảm", "Tinh dầu xông"],
      },
      {
        title: "Thiết bị làm đẹp",
        keyWords: ["Dụng cụ tẩy lông", "Dụng cụ cạo râu"],
      },
    ],
  },
  {
    mainTitle: "CHĂM SÓC TRẺ EM",
    relatives: [
      {
        title: "Khẩu trang cho bé",
        keyWords: [],
      },
      {
        title: "Tinh dầu cho trẻ",
        keyWords: [],
      },
      {
        title: "Sữa bột cho bé",
        keyWords: [],
      },
    ],
  },
  {
    mainTitle: "GÓC SỨC KHỎE",
    relatives: [
      {
        title: "Blog sức khỏe",
        keyWords: [],
      },
      {
        title: "Tra cứu bệnh",
        keyWords: [],
      },
    ],
  },
];

export const healthNewsArray: HealthNewsProps[] = [
  {
    title: "Cách tăng cường miễn dịch vào mùa đông",
    createdAt: "2025-01-04T10:00:00Z",
    imageURL: "healthNews0.png",
  },
  {
    title: "Tầm quan trọng của vitamin D đối với sức khỏe",
    createdAt: "2024-12-30T15:00:00Z",
    imageURL: "healthNews1.png",
  },
  {
    title: "Lợi ích của việc uống nước chanh mỗi sáng",
    createdAt: "2024-12-10T09:30:00Z",
    imageURL: "healthNews2.png",
  },
  {
    title: "Những thực phẩm giúp giảm cân hiệu quả",
    createdAt: "2024-11-20T08:45:00Z",
    imageURL: "healthNews3.png",
  },
  {
    title: "Cách giảm stress trong cuộc sống hiện đại",
    createdAt: "2024-07-01T11:00:00Z",
    imageURL: "healthNews4.png",
  },
  {
    title: "Bí quyết chăm sóc da vào mùa hè",
    createdAt: "2023-10-01T13:00:00Z",
    imageURL: "healthNews5.png",
  },
  {
    title: "Làm thế nào để cải thiện giấc ngủ tự nhiên",
    createdAt: "2022-12-20T20:00:00Z",
    imageURL: "healthNews6.png",
  },
];

export const storeTypes = [
  {
    title: "Dược Mỹ Phẩm",
    linkURL: `/home/category/${generateSlug("DƯỢC MỸ PHẨM")}`,
  },
  {
    title: "Vitamin và Khoáng chất",
    linkURL: `/home/category/${generateSlug(
      "THỰC PHẨM CHỨC NĂNG"
    )}/${generateSlug("Vitamin & Khoáng chất")}`,
  },
  {
    title: "Kem chống nắng",
    linkURL: `/home/category/${generateSlug("DƯỢC MỸ PHẨM")}/${generateSlug(
      "Chăm sóc da mặt"
    )}/${generateSlug("Kem chống nắng da mặt")}`,
  },
  {
    title: "Bao cao su",
    linkURL: `/home/category/${generateSlug("CHĂM SÓC CÁ NHÂN")}/${generateSlug(
      "Hỗ trợ tình dục"
    )}/${generateSlug("Bao cao su")}`,
  },
  {
    title: "Tăng Sinh Lý, Bổ Thận",
    linkURL: `/home/category/${generateSlug(
      "THỰC PHẨM CHỨC NĂNG"
    )}/${generateSlug("Sinh lý & Nội tiết tố")}`,
  },
  {
    title: "Chăm sóc cá nhân",
    linkURL: `/home/category/${generateSlug("CHĂM SÓC CÁ NHÂN")}`,
  },
  {
    title: "Chăm sóc trẻ em",
    linkURL: `/home/category/${generateSlug("CHĂM SÓC TRẺ EM")}`,
  },
  {
    title: "Dụng cụ y tế",
    linkURL: `/home/category/${generateSlug("THIẾT BỊ Y TẾ")}/${generateSlug(
      "Dụng cụ y tế"
    )}`,
  },
  {
    title: "Bổ phế, hô hấp",
    linkURL: `/home/category/${generateSlug(
      "THỰC PHẨM CHỨC NĂNG"
    )}/${generateSlug("Hỗ trợ điều trị")}/${generateSlug("Hô hấp, ho, xoang")}`,
  },
  {
    title: "Hỗ Trợ Tim Mạch",
    linkURL: `/home/category/${generateSlug(
      "THỰC PHẨM CHỨC NĂNG"
    )}/${generateSlug("Sức khỏe tim mạch")}`,
  },
];

export const storeMedicineAttributes = [
  "Nước sản xuất",
  "Đối tượng sử dụng",
  "Chỉ định",
  "Loại da",
  "Mùi vị/ Mùi hương",
  "Thương hiệu",
  "Loại",
];

export const storeAssuranceMedicineInformation = [
  {
    name: "Đổi trả",
    firstLine: "Đổi trả trong 30 ngày",
    otherLine: " kể từ ngày mua hàng",
  },
  {
    name: "Đổi thuốc",
    firstLine: "Miễn phí 100%",
    otherLine: " đổi thuốc",
  },
  {
    name: "Miễn phí giao",
    firstLine: "Miễn phí vận chuyển",
    otherLine: " theo chính sách giao hàng",
  },
];

export const storeCategory: string[] = [
  "Vitamin",
  "Dầu cá, Omega 3, DHA",
  "Vitamin C",
  "Vitamin D",
  "Bổ sung sắt & Axit Folic",
  "Sinh lý nam",
  "Sinh lý nữ",
  "Sức khỏe tình dục",
  "Cân bằng nội tiết tố",
  "Hỗ trợ mãn kinh",
  "Chăm sóc gan",
  "Tăng sức đề kháng, miễn dịch",
  "Bổ mắt, bảo vệ mắt",
  "Hỗ trợ trao đổi chất",
  "Giải rượu, cai rượu",
  "Cơ xương khớp",
  "Hô hấp, ho, xoang",
  "Thận, tiền liệt tuyến",
  "Hỗ trợ điều trị trĩ",
  "Hỗ trợ điều trị gout",
  "Hỗ trợ điều trị tiểu đường",
  "Hỗ trợ điều trị ung thư",
  "Tiêu hóa",
  "Dạ dày, tá tràng",
  "Táo bón",
  "Vi sinh - Probiotic",
  "Đại tràng",
  "Khó tiêu",
  "Bổ não, cải thiện trí nhớ",
  "Hỗ trợ giấc ngủ ngon",
  "Tuần hoàn máu",
  "Kiểm soát căng thẳng",
  "Hoạt huyết",
  "Da",
  "Hỗ trợ giảm cân",
  "Tóc",
  "Giảm cholesterol",
  "Huyết áp",
  "Suy giãn tỉnh mạch",
  "Sữa",
  "Dinh dưỡng trẻ em",
  "Dụng cụ vệ sinh mũi",
  "Kim các loại",
  "Máy massage",
  "Túi chườm",
  "Vớ ngăn tĩnh mạch",
  "Găng tay",
  "Đai lưng",
  "Dụng cụ vệ sinh tai",
  "Đai nẹp",
  "Máy xông khí dung",
  "Máy đo huyết áp",
  "Máy, que thử đường huyết",
  "Thử thai",
  "Nhiệt kế",
  "Kit Test Covid",
  "Máy đo SpO2",
  "Băng y tế",
  "Bông y tế",
  "Cồn, nước sát trùng, nước muối",
  "Chăm sóc vết thương",
  "Xịt giảm đau, kháng viêm",
  "Miếng dán giảm đau, hạ sốt",
  "Khẩu trang y tế",
  "Khẩu trang vải",
  "Sữa rửa mặt (Kem, gel, sữa)",
  "Kem chống nắng da mặt",
  "Dưỡng da mặt",
  "Mặt nạ",
  "Serum, Essence hoặc Ampoule",
  "Toner ( nước hoa hồng )/Lotion",
  "Tẩy tế bào chết",
  "Xịt khoáng",
  "Nước tẩy trang, dầu tẩy trang",
  "Sữa tắm, xà bông",
  "Chống nắng toàn thân",
  "Lăn khử mùi, xịt khử mùi",
  "Sữa dưỡng thể, kem dưỡng thể",
  "Trị nứt da",
  "Kem dưỡng da, tay chân",
  "Chăm sóc ngực",
  "Message",
  "Trị sẹo, mờ vết thâm",
  "Kem trị mụn, gel trị mụn",
  "Dưỡng da bị khô, thiếu ẩm",
  "Kem trị nám, tàn nhang, đốm nâu",
  "Viêm da cơ địa",
  "Da bị kích ứng",
  "Tái tạo, chống lão hóa da",
  "Da sạm, xỉn màu",
  "Dầu gội đầu xả",
  "Dầu gội trị nấm",
  "Dưỡng tóc, ủ tóc",
  "Đặc trị cho tóc",
  "Son môi",
  "Trang điểm mặt",
  "Trị quầng thâm, bọng mắt",
  "Xóa nếp nhăn vùng mắt",
  "Dưỡng da mắt",
  "Tinh dầu",
  "Dầu dừa",
  "Bao cao su",
  "Gel bôi trơn",
  "Nước Yến",
  "Kẹo cứng",
  "Nước uống không gas",
  "Đường ăn kiêng",
  "Trà thảo dược",
  "Kẹo dẻo",
  "Tổ Yến",
  "Dung dịch vệ sinh phụ nữ",
  "Vệ sinh tai",
  "Băng vệ sinh",
  "Nước rửa tay",
  "Kem đánh răng",
  "Bàn chải điện",
  "Chi nha khoa",
  "Chăm sóc răng",
  "Nước súc miệng",
  "Chống muỗi & côn trùng",
  "Đồ dùng cho bé",
  "Đồ dùng cho mẹ",
  "Khăn giấy, khăn ướt",
  "Tinh dầu massage",
  "Tinh dầu trị cảm",
  "Tinh dầu xông",
  "Dụng cụ tẩy lông",
  "Dụng cụ cạo râu",
];

export const typeMedicine: { title: string; linkURL: string }[] = [
  {
    title: `Thần kinh não`,
    linkURL: `/${generateSlug(`THỰC PHẨM CHỨC NĂNG`)}/${generateSlug(
      `Thần kinh não`
    )}`,
  },
  {
    title: `Cơ xương khớp`,
    linkURL: `/${generateSlug("THỰC PHẨM CHỨC NĂNG")}/${generateSlug(
      "Hỗ trợ điều trị"
    )}/${generateSlug("Cơ xương khớp")}`,
  },
  {
    title: `Thuốc tiêu hóa, dạ dày`,
    linkURL: `/${generateSlug(`THỰC PHẨM CHỨC NĂNG`)}/${generateSlug(
      "Hỗ trợ tiêu hóa"
    )}`,
  },
  {
    title: `Đau nhức, hô hấp`,
    linkURL: `/${generateSlug(`THỰC PHẨM CHỨC NĂNG`)}/${generateSlug(
      "Hỗ trợ điều trị"
    )}/${generateSlug("Cơ xương khớp")}`,
  },
  {
    title: `Vitamin & Khoáng chất`,
    linkURL: `/${generateSlug(`THỰC PHẨM CHỨC NĂNG`)}/${generateSlug(
      "Vitamin & Khoáng chất"
    )}`,
  },
  {
    title: `Tuần hoàn máu`,
    linkURL: `/${generateSlug(`THỰC PHẨM CHỨC NĂNG`)}/${generateSlug(
      "Thần kinh não"
    )}/${generateSlug("Tuần hoàn máu")}`,
  },
  {
    title: `Chăm sóc gan`,
    linkURL: `/${generateSlug(`THỰC PHẨM CHỨC NĂNG`)}/${generateSlug(
      "Cải thiện tăng cường chức năng"
    )}/${generateSlug("Chăm sóc gan")}`,
  },
  {
    title: `Chăm sóc da`,
    linkURL: `/${generateSlug(`DƯỢC MỸ PHẨM`)}/${generateSlug(
      "Chăm sóc da mặt"
    )}`,
  },
  {
    title: `Chống nắng`,
    linkURL: `/${generateSlug("DƯỢC MỸ PHẨM")}/${generateSlug(
      "Chăm sóc da mặt"
    )}/${generateSlug("Kem chống nắng da mặt")}`,
  },
  {
    title: `Dưỡng ẩm`,
    linkURL: `/${generateSlug("DƯỢC MỸ PHẨM")}/${generateSlug(
      "Giải pháp làn da"
    )}/${generateSlug("Dưỡng da bị khô, thiếu ẩm")}`,
  },
  {
    title: `Trị mụn, trị seo`,
    linkURL: `/${generateSlug("DƯỢC MỸ PHẨM")}/${generateSlug(
      "Giải pháp làn da"
    )}/${generateSlug("Kem trị mụn, gel trị mụn")}`,
  },
];

export const storePropsSideBar = ["Products", "Order", "Account"];

export const storeFieldsProducts: ColDef<MedicineProps>[] = [
  {
    field: "medicineId",
    headerName: "Id",
    width: 115,
    minWidth: 115,
    filter: "agNumberColumnFilter",
  },
  {
    field: "medicineName",
    headerName: "Name",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
  },
  {
    field: "price",
    valueFormatter: (p) => p.value.toLocaleString("vi-VN") + "đ",
    headerName: "Price",
    width: 150,
    minWidth: 150,
    filter: "agNumberColumnFilter",
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 160,
    minWidth: 160,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "D.Price",
    width: 160,
    minWidth: 160,
    valueGetter: (p) => {
      return p.data
        ? ((p.data.price * (100 - p.data.discount)) / 100).toLocaleString(
            "vi-VN"
          ) + "đ"
        : "";
    },
    filter: "agNumberColumnFilter",
  },
  {
    field: "totalQuantity",
    headerName: "Quantity",
    width: 160,
    minWidth: 160,
    filter: "agNumberColumnFilter",
    cellClassRules: {
      "greenStatusDashBoard": (params) => (params.data?.totalQuantity ?? 0) >= 100,
      "yellowStatusDashBoard": (params) =>
        (params.data?.totalQuantity ?? 0) < 100 &&
        (params.data?.totalQuantity ?? 0) >= 50,
      "redStatusDashBoard": (params) => (params.data?.totalQuantity ?? 0) < 50,
    },
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 150,
    minWidth: 150,
    filter: "agMultiColumnFilter",
  },
  {
    field: "originCountry",
    headerName: "Country",
    width: 160,
    minWidth: 160,
    filter: "agMultiColumnFilter",
  },
  {
    field: "packageUnit",
    headerName: "Package",
    width: 160,
    minWidth: 160,
    filter: "agSetColumnFilter",
  },
  {
    field: "packageQuantity",
    headerName: "P.Quantity",
    width: 180,
    minWidth: 180,
    filter: "agNumberColumnFilter",
  },
  {
    field: "itemUnit",
    headerName: "Item",
    width: 150,
    minWidth: 150,
    filter: "agSetColumnFilter",
  },
  {
    field: "itemQuantityPerPackage",
    headerName: "I.Quantity",
    width: 180,
    minWidth: 180,
    filter: "agNumberColumnFilter",
  },
  {
    field: "imageURL",
    headerName: "ImageURL",
    width: 180,
    minWidth: 180,
    filter: "agTextColumnFilter",
  },
  {
    field: "targetPatiences",
    headerName: "Targets",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
    valueGetter: (p) =>
      p.data?.targetPatiences.map((each) => each.name).join(", ") || "",
  },
  {
    field: "indications",
    headerName: "Indications",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
    valueGetter: (p) =>
      p.data?.indications.map((each) => each.name).join(", ") || "",
  },
  {
    field: "categories",
    headerName: "Categories",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
    valueGetter: (p) =>
      p.data?.categories.map((each) => each.name).join(", ") || "",
  },
  {
    field: "flavorOrScents",
    headerName: "Flavor",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
    valueGetter: (p) =>
      p.data?.flavorOrScents.map((each) => each.name).join(", ") || "",
  },
  {
    field: "skinTypes",
    headerName: "Skins",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
    valueGetter: (p) =>
      p.data?.skinTypes.map((each) => each.name).join(", ") || "",
  },
];

export const storeFieldsUser: ColDef<UserProps>[] = [
  {
    field: "id",
    headerName: "Id",
    width: 115,
    minWidth: 115,
    filter: "agNumberColumnFilter",
  },
  {
    field: "email",
    headerName: "Email",
    filter: "agTextColumnFilter",
    width: 250,
    minWidth: 250,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    minWidth: 250,
    filter: "agTextColumnFilter",
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 160,
    minWidth: 160,
    filter: "agNumberColumnFilter",
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    minWidth: 250,
    filter: "agTextColumnFilter",
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 160,
    minWidth: 160,
    filter: "agSetColumnFilter",
    valueGetter: (p) => (p.data?.gender ? "Male" : "Female"),
    // cellClassRules: {
    //   "high-quantity": (params) => (params.data?.totalQuantity ?? 0) >= 100,
    //   "medium-quantity": (params) =>
    //     (params.data?.totalQuantity ?? 0) < 100 &&
    //     (params.data?.totalQuantity ?? 0) >= 50,
    //   "low-quantity": (params) => (params.data?.totalQuantity ?? 0) < 50,
    // },
  },
  {
    field: "doB",
    headerName: "DoB",
    width: 150,
    minWidth: 150,
    filter: "agTextColumnFilter",
  },
  {
    field: "rankClient",
    headerName: "Rank",
    width: 160,
    minWidth: 160,
    filter: "agSetColumnFilter",
    cellClassRules: {
      " bg-gray-200 text-gray-700": (params) =>
        params.data?.rankClient == "NONE",
      " bg-gray-300 text-gray-800": (params) =>
        params.data?.rankClient == "SILVER",
      " bg-yellow-400 text-yellow-900": (params) =>
        params.data?.rankClient == "GOLD",
      " bg-blue-400 text-blue-900": (params) =>
        params.data?.rankClient == "PLATINUM",
    },
  },
  {
    field: "loyaltyPoint",
    headerName: "Loyal Points",
    width: 160,
    minWidth: 160,
    filter: "agNumberColumnFilter",
  },
];

export const storeFieldsOrder: ColDef<OrderProps>[] = [
  {
    field: "orderId",
    headerName: "Id",
    width: 115,
    minWidth: 115,
    filter: "agNumberColumnFilter",
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    minWidth: 200,
    filter: "agTextColumnFilter",
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    minWidth: 150,
    filter: "agTextColumnFilter",
  },
  {
    field: "province",
    headerName: "Province",
    width: 200,
    minWidth: 200,
    filter: "agMultiColumnFilter",
  },
  {
    field: "district",
    headerName: "District",
    width: 200,
    minWidth: 200,
    filter: "agMultiColumnFilter",
  },
  {
    field: "ward",
    headerName: "Ward",
    width: 200,
    minWidth: 200,
    filter: "agMultiColumnFilter",
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
    minWidth: 200,
    filter: "agTextColumnFilter",
  },
  {
    field: "note",
    headerName: "Note",
    width: 200,
    minWidth: 200,
    filter: "agTextColumnFilter",
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    width: 180,
    minWidth: 180,
    filter: "agTextColumnFilter",
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 180,
    minWidth: 180,
    filter: "agNumberColumnFilter",
    valueGetter: (p) => {
      return p.data?.totalPrice.toLocaleString("vi-VN") + "đ";
    },
  },
  {
    field: "totalDiscount",
    headerName: "Total Discount",
    width: 200,
    minWidth: 200,
    filter: "agNumberColumnFilter",
    valueGetter: (p) => {
      return p.data?.totalDiscount.toLocaleString("vi-VN") + "đ";
    },
  },
  {
    field: "finalPrice",
    headerName: "Final Price",
    width: 180,
    minWidth: 180,
    filter: "agNumberColumnFilter",
    valueGetter: (p) => {
      return p.data?.finalPrice.toLocaleString("vi-VN") + "đ";
    },
  },
  {
    field: "loyaltyPointsEarned",
    headerName: "Loyalty Points",
    width: 200,
    minWidth: 200,
    filter: "agNumberColumnFilter",
  },
  {
    field: "orderStatus",
    headerName: "O.Status",
    width: 170,
    minWidth: 170,
    filter: "agSetColumnFilter",
    pinned: "right",
    cellClassRules: {
      "bg-yellow-100 text-yellow-700": (params) =>
        params.data?.orderStatus === "PROCESSING",
      "bg-blue-100 text-blue-700": (params) =>
        params.data?.orderStatus === "SHIPPING",
      "bg-green-100 text-green-700": (params) =>
        params.data?.orderStatus === "DELIVERED",
      "bg-red-100 text-red-700": (params) =>
        params.data?.orderStatus === "CANCELED",
      "bg-gray-200 text-gray-700": (params) =>
        params.data?.orderStatus === "RETURN",
      "bg-gray-100 text-gray-500": (params) => !params.data?.orderStatus,
    },
  },
];

export const storeFieldsAttribute: ColDef<AttributeProps>[] = [
  {
    field: "attributeId",
    headerName: "Id",
    width: 115,
    minWidth: 115,
    filter: "agNumberColumnFilter",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.8,
    filter: "agTextColumnFilter",
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    filter: "agTextColumnFilter",
  },
  {
    field: "attributeType",
    headerName: "Type",
    width: 200,
    minWidth: 200,
    filter: "agMultiColumnFilter",
  },
];

export const listAttributesForView = [
  [
    { title: "Price", value: "price" },
    {
      title: "Discount",
      value: "discount",
    },
  ],
  [
    {
      title: "Package Quantity",
      value: "packageQuantity",
    },
    {
      title: "Package Unit",
      value: "packageUnit",
    },
  ],
  [
    {
      title: "Quantity Per Package",
      value: "itemQuantityPerPackage",
    },
    {
      title: "Item Unit",
      value: "itemUnit",
    },
  ],

  [
    {
      title: "Brand",
      value: "brand",
    },
    {
      title: "Origin Country",
      value: "originCountry",
    },
  ],
  [
    {
      title: "Total Quantity",
      value: "totalQuantity",
    },
    {
      title: "Final Price",
      value: "",
    },
  ],
];

export const listAttributesForEdit = [
  [
    { title: "Price", value: "price" },
    {
      title: "Discount",
      value: "discount",
    },
    {
      title: "Total Quantity",
      value: "totalQuantity",
    },
  ],
  [
    {
      title: "Package Quantity",
      value: "packageQuantity",
    },
    {
      title: "Package Unit",
      value: "packageUnit",
    },
    {
      title: "Quantity Per Package",
      value: "itemQuantityPerPackage",
    },
    {
      title: "Item Unit",
      value: "itemUnit",
    },
  ],
  [
    {
      title: "Brand",
      value: "brand",
    },
    {
      title: "Origin Country",
      value: "originCountry",
    },
  ],
];

export const storeOrderStatus = [
  {
    title: "Tất cả",
    status: [],
  },
  {
    title: "Đang xử lý",
    status: ["PROCESSING"],
  },
  {
    title: "Đang giao",
    status: ["SHIPPING"],
  },
  {
    title: "Đã giao",
    status: ["DELIVERED"],
  },
  {
    title: "Đã hủy",
    status: ["CANCELED"],
  },
  {
    title: "Trả hàng",
    status: ["RETURN"],
  },
];
