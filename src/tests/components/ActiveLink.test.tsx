import { render } from '@testing-library/react';
import { ActiveLink } from '../../components/ActiveLink';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('ActiveLink component', () => {
  it('active link renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );
  
    expect(getByText('Home')).toBeInTheDocument();
  });
  
  it('active link is receiving active class', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );
  
    expect(getByText('Home')).toHaveClass('active');
  })
});