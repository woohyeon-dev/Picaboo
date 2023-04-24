import ReactDom from 'react-dom';
import IProps from '@/types/IProps';
import { useEffect, useState } from 'react';

interface IPortalProps extends IProps {
  qs: string;
}
const Portal = ({ children, qs }: IPortalProps) => {
  const [element, setElement] = useState<HTMLElement | Element | null>(null);

  useEffect(() => {
    setElement(document.querySelector(qs));
  }, []);

  if (!element) {
    return <></>;
  }

  return ReactDom.createPortal(children, element);
};

export default Portal;
