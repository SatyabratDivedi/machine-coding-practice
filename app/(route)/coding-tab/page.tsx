'use client';

import datas from "./data";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface datatype {
  name: string;
  isFolder: boolean;
  children?: datatype[];
}

interface itemListProps {
  items: datatype[];
  setItems: React.Dispatch<React.SetStateAction<datatype[]>>;
  openItems: string[];
  setOpenItems: React.Dispatch<React.SetStateAction<string[]>>;
  deleteItemHandler: (item: datatype) => void;
}

function ItemList({ items, openItems, setOpenItems, setItems, deleteItemHandler }: itemListProps) {

  return (
    <div style={{ marginLeft: "12px" }}>
      {items.map((data: datatype, i: number) => {
        const isOpen = openItems.includes(data.name);
        return (
          <div key={i} style={{ marginBottom: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                onClick={() =>
                  data.isFolder &&
                  setOpenItems((prev) =>
                    prev.includes(data.name)
                      ? prev.filter((word) => word !== data.name)
                      : [...prev, data.name]
                  )
                }
                className={`flex max-w-fit px-1 items-center gap-2 hover:bg-gray-700 ${data.isFolder ? "cursor-pointer" : "cursor-default"} ${isOpen ? "bg-gray-600" : ""} transition-colors duration-200`}
                onMouseEnter={(e) =>
                  ((e.currentTarget.style.backgroundColor = "#2c2c2c"))
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget.style.backgroundColor = "transparent"))
                }
              >
                <FaAngleRight
                  style={{
                    visibility: data.isFolder ? "visible" : "hidden",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                />
                {data.name}
              </div>
              <div><MdOutlineDeleteOutline className="text-red-500 cursor-pointer" onClick={() => deleteItemHandler(data)} /></div>
            </div>

            {isOpen && data.isFolder && (
              <div
                className="border-l-2 border-white ml-3 pl-2"
              >
                <ItemList
                  items={data.children || []}
                  setItems={setItems}
                  openItems={openItems}
                  setOpenItems={setOpenItems}
                  deleteItemHandler={deleteItemHandler}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState<datatype[]>(datas);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const deleteItemHandler = (item: datatype) => {
    function deleteList(items: datatype[], name: string): datatype[] {
      return items.filter((item) => item.name !== name)
        .map((item) => {
          if (!item.children) return item;
          return {
            ...item,
            children: deleteList(item.children, name)
          }
        })
    }
    setItems((prev) => deleteList(prev, item.name))
  }

  return (
    <div className="App" style={{ padding: "16px", color: "#fff", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "16px" }}>📁 File Explorer</h2>
      <ItemList
        items={items}
        setItems={setItems}
        openItems={openItems}
        setOpenItems={setOpenItems}
        deleteItemHandler={deleteItemHandler}
      />
    </div>
  );
}