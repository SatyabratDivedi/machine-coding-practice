'use client';
import { useState } from "react";

const InfiniteScroll = () => {
  const arrData = [...new Array(20)];
  const [datas, setDatas] = useState(arrData);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDatas((prev) => [...prev, ...new Array(20)]);
      setLoading(false);
    }, 1000);
  };

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollHeight = event.currentTarget.scrollHeight;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollTop = event.currentTarget.scrollTop;

    const remainingHeight = scrollHeight - (clientHeight + scrollTop);

    if (remainingHeight <= 20 && !loading) {
      loadMore();
    }
  };

  return (
    <>
      <div>Infinite scroll</div>
      <div onScroll={scrollHandler} className="h-[300px] overflow-y-auto border-2 border-gray-300 p-4">
        {datas.map((_, i) => {
          return <div className="bg-gray-400 m-1" key={i}>Item {i + 1}</div>;
        })}
      </div>
      {loading && <div>Loading...</div>}
    </>
  );
};

export default InfiniteScroll;
