import { Backdrop, CircularProgress, Grid2 } from "@mui/material";
import Advertisement from "../Advertisement/Advertisement";
import Title from "../Title";
import { FlowerProps, NewsProps } from "../../interface/interface";
import { useEffect, useState } from "react";
import { getAPINews } from "../../API";
import FlowerVertical from "../Flower/FlowerVertical";
import FlowerHorizontal from "../Flower/FlowerHorizontal";
import News from "../News/News";
import Verification from "../Verification/Verification";
import axios from "axios";

export default function MainHome() {
  const [open, setOpen] = useState(false);
  const [storeNews, setStoreNews] = useState<NewsProps[]>([]);
  const [storeFlowers, setStoreFlowers] = useState<FlowerProps[]>([]);
  useEffect(() => {
    async function getFlowers() {
      setOpen(true);
      const response = await axios.get("http://localhost:3001/flowers");
      if (response.data.length > 0) {
        setStoreFlowers(response.data);
      }
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
          <Advertisement></Advertisement>
          <Grid2 container>
            <Grid2 container spacing={1} className="bodyLeft">
              <Title title={"SẢN PHẨM ƯU CHUỘNG"}></Title>
              <Grid2 container spacing={4}>
                {storeFlowers.map((eachFlower, index) => (
                  <FlowerVertical
                    key={index}
                    eachFlower={eachFlower}
                    size={
                      storeFlowers.length >= 4 ? 3 : 12 / storeFlowers.length
                    }
                  ></FlowerVertical>
                ))}
              </Grid2>
              <Title title={"SẢN PHẨM KHUYẾN MÃI"}></Title>
              <Grid2 container spacing={4}>
                {storeFlowers.map((eachFlower, index) => (
                  <FlowerVertical
                    key={index}
                    eachFlower={eachFlower}
                    size={
                      storeFlowers.length >= 4 ? 3 : 12 / storeFlowers.length
                    }
                  ></FlowerVertical>
                ))}
              </Grid2>
            </Grid2>
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
          </Grid2>
          <Verification></Verification>
        </>
      )}
    </>
  );
}
