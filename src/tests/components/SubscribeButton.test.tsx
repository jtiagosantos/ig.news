import { render, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubscribeButton } from '../../components/SubscribeButton'

jest.mock('next-auth/react');
jest.mock('next/router');

const useSessionMocked = mocked(useSession);

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    const { getByText } = render(<SubscribeButton />);

    expect(getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    const { getByText } = render(<SubscribeButton />);

    const subscribeButton = getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toBeCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);

    useSessionMocked.mockReturnValueOnce({ 
      data: { 
        user: { 
          name: 'John Doe',
          email: 'john.doe@email.com',
        }, 
        expires: '',
        activeSubscription: 'fake-active-subscription',
      }, 
      status: 'authenticated',
    })

    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValueOnce({ push: pushMocked } as any);

    const { getByText } = render(<SubscribeButton />);

    const subscribeButton = getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMocked).toBeCalledWith('/posts')
  });
});