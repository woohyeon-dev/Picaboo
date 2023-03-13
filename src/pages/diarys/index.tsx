import Layout from '@/src/components/layout/Layout';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Edit3 } from 'react-feather';
import MonthPicker from '../../components/common/MonthPicker';
import useDropdown from '../../hooks/useDropdown';
import { StCreateBtn, StItem, StList } from '../../styles/common/common.style';
import {
  StDateBox,
  StPickerLayout,
  StYear,
} from '../../styles/common/monthPicker';
import ubuntu from '../../utils/font/ubuntu';
import getTodayDate from '../../utils/getTodayDate';
import MonthsOfYear from '@/src/utils/constant/MonthsOfYear.json';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { fetchDiaryListFn } from '../../api/diaryApi';
import Loading from '../../components/common/Loading';
import { useRouter } from 'next/router';

export default function DiarysPage() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPickerOpen, setIsPickerOpen] = useDropdown(dropdownRef);
  const [date, setDate] = useState({
    year: 0,
    month: 0,
  });
  const { isLoading, isError, data, error } = useQuery(
    // queryKey: 쿼리를 고유하게 식별하는 문자열이나 배열으로 쿼리 키가 변경되면 React Query는 새로운 데이터를 가져와 캐시를 업데이트함
    ['list', String(date.month), String(date.year)],
    // queryFn: 쿼리를 호출하는 함수로 Promise를 반환해야하며, 해당 Promise가 resolve되면 데이터가 반환됨
    fetchDiaryListFn,
    {
      refetchOnWindowFocus: false, // 윈도우가 다시 포커스될 때 쿼리를 다시 호출할지 여부를 설정, 기본값은 true
      refetchOnReconnect: false, // 인터넷 연결이 끊겼다가 다시 연결될 때 데이터를 자동으로 다시 가져오도록 설정, 기본값은 true
      retry: 0, // 실패 시 쿼리 재시도 몇 번 할지 결정, 기본값은 3이고 true로 설정하면 무한 재시도, false로 설정하면 재시도 X
      onSuccess: data => {
        // 성공시 호출
        console.log(data);
      },
      onError: (error: AxiosError) => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됨)
        console.log(error.message);
      },
    }
  );

  const handlePictureClick = (id: number) => {
    router.push(`/diarys/${id}`);
  };

  useEffect(() => {
    const { year, month } = getTodayDate();
    setDate({ year: year, month: month });
  }, []);

  return (
    <main className={ubuntu.className}>
      <Layout>
        {date && (
          <StPickerLayout ref={dropdownRef}>
            <StDateBox onClick={() => setIsPickerOpen(!isPickerOpen)}>
              <>{MonthsOfYear.full[date.month - 1]}</>
              <StYear>{date.year}</StYear>
              {isPickerOpen ? <ChevronUp /> : <ChevronDown />}
            </StDateBox>
            {isPickerOpen && (
              <MonthPicker
                date={date}
                setDate={setDate}
                setIsPickerOpen={setIsPickerOpen}
              />
            )}
          </StPickerLayout>
        )}
        {data && (
          <StList>
            {data.map((el: any, i: number) => {
              return (
                <StItem key={i}>
                  <Image
                    src={el.source}
                    fill
                    alt=''
                    onClick={() => handlePictureClick(el.diary_id)}
                  />
                </StItem>
              );
            })}
          </StList>
        )}
        {isLoading && <Loading message={'Loading diary pictures...'} />}
        {isError && <></>}
        <StCreateBtn href='/diarys/write'>
          <Edit3 width={30} height={30} strokeWidth={1} />
        </StCreateBtn>
      </Layout>
    </main>
  );
}
