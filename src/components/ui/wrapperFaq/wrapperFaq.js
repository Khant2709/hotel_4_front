'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";

import ComponentFaq from './componentFaq/componentFaq.jsx';


const WrapperFaq = ({faqData, hasSlice}) => {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState([]);

  const toggleFaq = (id) => {
    const isActiveFaq = activeFaq.includes(id);

    if (isActiveFaq) {
      setActiveFaq((prev) => prev.filter(el => el !== id));
    } else {
      setActiveFaq([...activeFaq, id]);
    }
  };

  const listFaq = hasSlice ? faqData.slice(0, 7) : faqData;

  return (
      <ComponentFaq
          listFaq={listFaq}
          activeFaq={activeFaq}
          hasSlice={hasSlice}
          router={router}
          toggleFaq={toggleFaq}
      />
  )
};

export default WrapperFaq;