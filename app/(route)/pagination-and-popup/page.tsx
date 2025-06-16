'use client';

import { Suspense, useEffect, useState } from 'react';
import Popup from '../../components/Popup';
import Pagination from '../../components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<DataType | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchparams = useSearchParams();
  const page = searchparams.get('page');

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/user?limit=300`);
    const data = await res.json();
    setDatas(data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const next = () => {
    if (currentPage == Math.ceil(datas.length / 10)) return alert('max hai bhai bs kr lo');
    setCurrentPage((prev) => prev + 1);
    router.push(`?page=${currentPage + 1}`);
  };

  const prev = () => {
    if (currentPage == 1) return alert('min ho gya bhai');
    setCurrentPage((prev) => prev - 1);
    router.push(`?page=${currentPage - 1}`);
  };

  const deleteData = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      setPopOpen(false);
      setDeletingId(null);
      setDatas((prevDatas) => prevDatas.filter((data) => data.id !== id));
    }, 2000);
  };

  return (
    <div className='App'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          datas.slice((currentPage - 1) * 10, currentPage * 10).map((data) => {
            return (
              <div key={data.id} style={{ display: 'flex', paddingBlock: '5px' }}>
                <div>
                  {data.id} {data.firstName}
                </div>
                <button
                  className='px-2 py-1 m-1 rounded-md bg-red-500 text-white'
                  onClick={() => {
                    setPopOpen(true);
                    setUserToDelete(data);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}

        <Pagination
          dataLength={datas.length}
          currentPage={currentPage}
          nextPage={next}
          prevPage={prev}
          goToPage={(page) => {
            setCurrentPage(page);
            router.push(`?page=${page}`);
          }}
        />

        <Popup isOpen={popOpen} onClose={() => setPopOpen(false)} onConfirm={() => userToDelete && deleteData(userToDelete.id)} title='Do you Really want to Delete' description={`going to delete ${userToDelete?.firstName}`} isPending={deletingId !== null} />
    </div>
  );
}
