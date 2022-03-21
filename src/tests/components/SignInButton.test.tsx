import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'ts-jest/utils';
import { SignInButton } from '../../components/SignInButton';

jest.mock('next-auth/react');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ 
      data: null, 
      status: 'unauthenticated' 
    });

    const { getByText } = render(<SignInButton />);

    expect(getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ 
      data: { 
        user: { 
          name: 'John Doe',
          email: 'john.doe@email.com'
        }, 
        expires: '' 
      }, 
      status: 'authenticated',
    })
  
    const { getByText } = render(<SignInButton />);

    expect(getByText('John Doe')).toBeInTheDocument();
  });
});