import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  placeholderValues,
  storeCategory,
} from "../../../../Config/glovalVariables";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation, useNavigate } from "react-router-dom";
import { MedicineProps } from "../../../../Config/interface";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";
import useAxios from "../../../../Config/axiosInstance";
export default function SearchResult() {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [index, setIndex] = useState<number>(0);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [isVisible, setIsVisible] = useState(false);
  const [storeSearchMedicines, setStoreSearchMedicines] = useState<
    MedicineProps[] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(false);
    inputRef.current?.blur();
  }, [location.pathname]);
  const getMedicinesBySearch = useCallback(async (searchValue: string) => {
    try {
      showBackdrop();
      inputRef.current?.blur();
      const response = await axiosInstance.post("/medicines/allAttributes", {
        priceRange: null,
        listAttributeFilters: [
          {
            attributeType: "CATEGORY",
            attributeValues: storeCategory,
          },
        ],
        sortOrder: "desc",
        searchValue,
      });
      if (response.data.code == 1000) {
        setStoreSearchMedicines(response.data.result);
      }
    } catch (error) {
      console.error("Error getting medicines by searching", error);
    } finally {
      inputRef.current?.focus();
      hideBackdrop();
    }
  }, []);
  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const getValue = e.target.value.trim();
      if (getValue.length > 0) {
        getMedicinesBySearch(getValue);
      } else {
        setStoreSearchMedicines(null);
      }
      setSearchValue(getValue);
    }, 500),
    []
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key == "Enter") {
        e.preventDefault();
        handleSearch.cancel();
        const getValue = e.currentTarget.value.trim();
        if (getValue.length > 0) {
          navigate(`/home/search/${getValue}`);
        }
        setSearchValue(getValue);
      }
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholderValues.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="wrapSearchBar ">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholderValues[index]}
        className="searchHeader"
        onChange={(e) => handleSearch(e)}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
      ></input>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="iconSearchBar" />
      <div className="searchResultDiv" onMouseDown={(e) => e.preventDefault()}>
        <div className="bg-white rounded-2xl mainSearchResult overflow-hidden">
          {storeSearchMedicines != null && isVisible && (
            <>
              <div className="max-h-[370px] overflow-y-auto overflow-x-hidden storeSearchMedicines">
                {storeSearchMedicines?.map(
                  (
                    { medicineName, packageUnit, price, discount, imageURL },
                    index
                  ) => (
                    <div
                      className="p-[16px] border-b-[1px] border-b-[#e5e7eb] cursor-pointer"
                      key={index}
                      onClick={() =>
                        navigate(
                          `/home/product/${encodeURIComponent(medicineName)}`
                        )
                      }
                    >
                      <div className="flex gap-[1.25rem]">
                        <div className="w-[90px] h-[90px] p-[6px] rounded-[10px] border border-[#e5e7eb] flex-shrink-0 relative">
                          <img
                            src={`/AnKhang/Medicines/${imageURL}`}
                            className="w-full h-full object-contain"
                          ></img>
                          {discount > 0 && (
                            <div className="absolute top-0 left-0 bg-[#d0021c] text-white py-[2px] px-[4px] text-[11px] rounded-tl-[10px]">
                              -{discount}%
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <div>{medicineName}</div>
                          <div className="flex items-center gap-[5px]">
                            <div className="font-bold text-[15px] text-[#d0021c]">
                              {(
                                (price * (100 - discount)) /
                                100
                              ).toLocaleString("vi-VN") + "đ"}
                            </div>
                            <div className="text-[13px]"> / {packageUnit}</div>
                            {discount > 0 && (
                              <div className="text-[12px] text-[#4a4f63] line-through font-bold">
                                {price.toLocaleString("vi-VN") + "đ"}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              {storeSearchMedicines.length > 0 ? (
                <div
                  className="py-[8px] text-[14px] flex items-center justify-center text-[#4cb551] cursor-pointer"
                  onClick={() =>
                    navigate(`/home/search/${encodeURIComponent(searchValue)}`)
                  }
                >
                  Xem thêm
                  <KeyboardArrowRightIcon />
                </div>
              ) : (
                <div className="flex gap-[10px] py-[16px] px-[40px]">
                  <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div>
                      Không tìm thấy kết quả với từ khóa
                      <span className="font-bold"> "{searchValue}"</span>
                    </div>
                    <ul className="text-[14px] text-[#4A4F63] list-disc leading-snug border-t border-[#e5e7eb]">
                      <li className="mt-[10px]">
                        Kiểm tra lỗi chính tả với từ khóa đã nhập
                      </li>
                      <li className="mt-[10px]">
                        Trong trường hợp cần hỗ trợ, hãy liên hệ với Long Châu
                        qua tổng đài miễn phí{" "}
                        <span className="text-[#4cb551] font-bold">
                          1800 6928
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
