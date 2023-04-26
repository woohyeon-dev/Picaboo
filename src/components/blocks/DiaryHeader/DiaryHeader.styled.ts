import styled from 'styled-components';

export const StDiaryHeader = styled.div`
  padding: 2.25rem 2.25rem 0.75rem 2.25rem;
  position: sticky;
  top: 80px;
  z-index: 1;
  background-color: ${({ theme }) => theme.bgclr.primary};
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'space-between')};
  svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  img {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    margin-right: 0.25rem;
  }
`;

export const StDiaryIconContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox('row', 'baseline')};
  svg {
    margin-left: 1.25rem;
  }
`;

export const StCalendarBox = styled.div`
  position: relative;
`;

export const StCalendarLoadingBox = styled.div`
  position: absolute;
  z-index: 10;
  right: 0;
  margin-top: 0.25rem;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  background: ${({ theme }) => theme.bgclr.primary};
  ${({ theme }) => theme.mixins.flexBox('column')};
  min-width: 275px;
  min-height: 266px;
  border-radius: 0.75rem;
`;
