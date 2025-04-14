import { BigNewsProps, NewsProps } from "./interface/interface";




export function getAPINews(): Promise<NewsProps[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            name: "Hoa tươi VOW khuyến mãi gói event tưng bừng",
            imageURL: "side-news.png",
            date: "18/07/2015",
          },
          {
            name: "Ý nghĩa các loại hoa trong năm",
            imageURL: "side-news.png",
            date: "17/05/2015",
          },
          {
            name: "Violet on Wednesday tuyển nhân viên",
            imageURL: "side-news.png",
            date: "24/05/2003",
          },
        ]),
      1000
    )
  );
}


export function getAPIBigNews(): Promise<BigNewsProps[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          title: "Mặn mà mùa hoa giấy ở làng hoa Thanh Tiên",
          text: "Khác với không khí sôi động của bao làng nghề vào dịp cuối năm,làng hoa Thanh Tiên vẫn yên ả như những ngày thường. Nhưng khi đến đầu làng thì quang cảnh khác hẵn. Những ngôi nhà thấp thoáng sau hàng đâu rực rỡ hẵn lên.",
          imgURL: "bigNews.png",
          date: "02/08/2015",
        },
        {
          title: "Mặn mà mùa hoa giấy ở làng hoa Thanh Tiên",
          text: "Khác với không khí sôi động của bao làng nghề vào dịp cuối năm,làng hoa Thanh Tiên vẫn yên ả như những ngày thường. Nhưng khi đến đầu làng thì quang cảnh khác hẵn. Những ngôi nhà thấp thoáng sau hàng đâu rực rỡ hẵn lên.",
          imgURL: "bigNews.png",
          date: "02/08/2015",
        },
        {
          title: "Mặn mà mùa hoa giấy ở làng hoa Thanh Tiên",
          text: "Khác với không khí sôi động của bao làng nghề vào dịp cuối năm,làng hoa Thanh Tiên vẫn yên ả như những ngày thường. Nhưng khi đến đầu làng thì quang cảnh khác hẵn. Những ngôi nhà thấp thoáng sau hàng đâu rực rỡ hẵn lên.",
          imgURL: "bigNews.png",
          date: "02/08/2015",
        },
        {
          title: "Mặn mà mùa hoa giấy ở làng hoa Thanh Tiên",
          text: "Khác với không khí sôi động của bao làng nghề vào dịp cuối năm,làng hoa Thanh Tiên vẫn yên ả như những ngày thường. Nhưng khi đến đầu làng thì quang cảnh khác hẵn. Những ngôi nhà thấp thoáng sau hàng đâu rực rỡ hẵn lên.",
          imgURL: "bigNews.png",
          date: "02/08/2015",
        },
        {
          title: "Mặn mà mùa hoa giấy ở làng hoa Thanh Tiên",
          text: "Khác với không khí sôi động của bao làng nghề vào dịp cuối năm,làng hoa Thanh Tiên vẫn yên ả như những ngày thường. Nhưng khi đến đầu làng thì quang cảnh khác hẵn. Những ngôi nhà thấp thoáng sau hàng đâu rực rỡ hẵn lên.",
          imgURL: "bigNews.png",
          date: "02/08/2015",
        },
        {
          title: "Mặn mà mùa hoa giấy ở làng hoa Thanh Tiên",
          text: "Khác với không khí sôi động của bao làng nghề vào dịp cuối năm,làng hoa Thanh Tiên vẫn yên ả như những ngày thường. Nhưng khi đến đầu làng thì quang cảnh khác hẵn. Những ngôi nhà thấp thoáng sau hàng đâu rực rỡ hẵn lên.",
          imgURL: "bigNews.png",
          date: "02/08/2015",
        },
      ]);
    }, 1000)
  );
}
