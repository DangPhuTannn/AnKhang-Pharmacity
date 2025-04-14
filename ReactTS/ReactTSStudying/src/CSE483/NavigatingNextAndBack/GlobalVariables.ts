export interface PageProps {
  namePage: string;
  nextPage: string;
}

export const style = {
  button: "border border-b-gray-500 p-[10px] cursor-pointer",
  container: "flex justify-center items-center gap-[20px] mt-[50px]",
};

export const storePages: PageProps[] = [
  {
    namePage: "Screen A",
    nextPage: "Screen C",
  },
  {
    namePage: "Screen B",
    nextPage: "Screen E",
  },
  {
    namePage: "Screen C",
    nextPage: "Screen E",
  },
  { namePage: "Screen E", nextPage: "Screen A" },
];
