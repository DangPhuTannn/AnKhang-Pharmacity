import { Backdrop, CircularProgress, Grid2 } from "@mui/material";
import ButtonProduct from "../Product/ButtonProduct";
import Verification from "../Verification/Verification";
import Title from "../Title";
import { BigNewsProps } from "../../interface/interface";
import { useEffect, useState } from "react";
import { getAPIBigNews } from "../../API";

const storeButtons: string[] = ["1", "2", "3", "4"];
export default function BigNews() {
  const [open, setOpen] = useState(true);
  const [storeBigNews, setStoreBigNews] = useState<BigNewsProps[]>([]);

  useEffect(() => {
    async function getBigNews() {
      const bigNews = await getAPIBigNews();
      setStoreBigNews(bigNews);
      setOpen(false);
    }
    getBigNews();
  }, []);

  return (
    <>
      {open ? (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (

        // em code tailwind từ khúc này ạ

        <div className="mt-[30px]">
          <Title title="TIN TỨC"></Title>
          {storeBigNews.map(({ title, text, imgURL, date }) => {
            const storeDate = date.split("/");
            const dayMonth = storeDate.slice(0, 2).join("/");
            const year = storeDate[2];
            return (
              <div className="pb-[30px] border-b border-gray-400 mt-[30px]">
                <div className="flex gap-[30px]">
                  <div className="bg-[#662D91] text-white p-[15px] h-fit text-center">
                    {dayMonth} <div className="font-bold">{year}</div>
                  </div>

                  <div className="w-[300px] h-[200px] flex-shrink-0 cursor-pointer">
                    <img
                      src={`/CSE433/${imgURL}`}
                      className="w-full h-full "
                    />
                  </div>

                  <div className="flex-1 max-w-[600px] break-words whitespace-normal">
                    <div className="text-[#2C3E50] font-bold text-xl cursor-pointer">
                      {title}
                    </div>
                    <div className="text-gray-700 mt-[10px]">{text}</div>
                    <div className="
                    hover:bg-[#662d91] hover:text-white
                    text-center border-[2px]  border-[#662d91] text-[#662d91] w-[150px] py-[5px] mt-[15px] font-bold cursor-pointer">
                      Đọc tiếp
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* tới khúc này */}
          
          {storeButtons.length != 0 && (
            <Grid2
              container
              spacing={2}
              justifyContent="center"
              width={"100%"}
              marginTop={3}
            >
              <ButtonProduct text="Trước"></ButtonProduct>
              {storeButtons.map((eachButton, index) => (
                <ButtonProduct text={eachButton} key={index}></ButtonProduct>
              ))}
              <ButtonProduct text="Sau"></ButtonProduct>
            </Grid2>
          )}
          <Verification></Verification>
        </div>
      )}
    </>
  );
}
