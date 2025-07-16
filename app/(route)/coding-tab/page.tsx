'use client';

import datas from "./data";
import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";

interface datatype {
  name: string;
  isFolder: boolean;
  children?: datatype[];
}

interface itemListProps {
  items: datatype[];
  openItems: string[];
  setOpenItems: React.Dispatch<React.SetStateAction<string[]>>;
}

function ItemList({ items, openItems, setOpenItems }: itemListProps) {
  return (
    <div style={{ marginLeft: "12px" }}>
      {items.map((data: datatype, i: number) => {
        const isOpen = openItems.includes(data.name);
        return (
          <div key={i} style={{ marginBottom: "4px" }}>
            <div
              onClick={() =>
                setOpenItems((prev) =>
                  prev.includes(data.name)
                    ? prev.filter((word) => word !== data.name)
                    : [...prev, data.name]
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: data.isFolder ? "pointer" : "default",
                fontWeight: data.isFolder ? "bold" : "normal",
                padding: "2px 4px",
                borderRadius: "4px",
                transition: "background 0.3s",
                userSelect: "none",
              }}
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

            {isOpen && data.isFolder && (
              <div
                style={{
                  borderLeft: "2px solid #555", // ✅ improved line color
                  marginLeft: "12px",
                  paddingLeft: "8px",
                }}
              >
                <ItemList
                  items={data.children || []}
                  openItems={openItems}
                  setOpenItems={setOpenItems}
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

  useEffect(() => {
    console.log(openItems);
  }, [openItems]);

  return (
    <div className="App" style={{ padding: "16px", color: "#fff", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "16px" }}>📁 File Explorer</h2>
      <ItemList
        items={items}
        openItems={openItems}
        setOpenItems={setOpenItems}
      />
    </div>
  );
}