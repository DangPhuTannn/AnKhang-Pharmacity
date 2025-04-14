import { Backdrop, CircularProgress, Grid2 } from "@mui/material";
import "./../../css/body.css";
import Title from "../Title";
import FlowerVertical from "../Flower/FlowerVertical";
import News from "../News/News";
import FlowerHorizontal from "../Flower/FlowerHorizontal";
import ButtonProduct from "./ButtonProduct";
import { FlowerProps, NewsProps } from "../../interface/interface";
import { useEffect, useState } from "react";
import { getAPIFlowers, getAPINews } from "../../API";
import { useParams } from "react-router-dom";
const storeButtons: string[] = ["1", "2", "3", "4"];
export default function SearchProduct() {
  const [open, setOpen] = useState(true);
  const { productName } = useParams();

  const [storeNews, setStoreNews] = useState<NewsProps[]>([]);
  const [storeFlowers, setStoreFlowers] = useState<FlowerProps[]>([]);

  useEffect(() => {
    async function getFlowers() {
      const flowers = await getAPIFlowers();
      setStoreFlowers(flowers);
    }

    async function getNews() {
      const news = await getAPINews();
      setStoreNews(news);
      setOpen(false);
    }
    getFlowers();
    getNews();
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
        <>
          <div className="flex">
            <div className="bodyLeft">
              <div>
                <Title title={"Search Result"}></Title>
                <Grid2 container spacing={3}>
                  {storeFlowers
                    .filter((eachFlower) => {
                      if (!productName?.trim()) {
                        return true;
                      }
                      return eachFlower.name
                        .toLowerCase()
                        .includes(productName.toLowerCase());
                    })
                    .map((eachFlower, index) => (
                      <FlowerVertical
                        key={index}
                        eachFlower={eachFlower}
                        size={
                          storeFlowers.length >= 4
                            ? 3
                            : 12 / storeFlowers.length
                        }
                      ></FlowerVertical>
                    ))}
                </Grid2>
              </div>

              {storeButtons.length != 0 && (
                <Grid2
                  container
                  spacing={2}
                  justifyContent="center"
                  width={"100%"}
                  marginTop={3}
                  className="h-fit"
                >
                  <ButtonProduct text="Trước"></ButtonProduct>
                  {storeButtons.map((eachButton, index) => (
                    <ButtonProduct
                      text={eachButton}
                      key={index}
                    ></ButtonProduct>
                  ))}
                  <ButtonProduct text="Sau"></ButtonProduct>
                </Grid2>
              )}
            </div>
            <Grid2 container spacing={1} className="bodyRight">
              <Grid2 size={12}>
                <Title title={"SẢN PHẨM VỪA XEM"}></Title>
                {storeFlowers.slice(0, 3).map((eachFlower, index) => (
                  <FlowerHorizontal
                    key={index}
                    {...eachFlower}
                  ></FlowerHorizontal>
                ))}
                <div className="wrapperNews">
                  <Grid2 size={12}>
                    <Title title={"TIN TỨC"}></Title>
                    {storeNews.map((eachNews, index) => (
                      <News key={index} {...eachNews}></News>
                    ))}
                  </Grid2>
                </div>
              </Grid2>
            </Grid2>
          </div>
        </>
      )}
    </>
  );
}
