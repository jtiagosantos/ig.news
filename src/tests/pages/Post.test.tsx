import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getSession } from 'next-auth/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');
jest.mock('next-auth/react');

const post = { 
  slug: 'my-new-post', 
  title: 'My New Post', 
  content: '<p>Post excerpt</p>', 
  updatedAt: '10 de abril' 
};

describe('Posts page', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Post post={post} />
    )

    expect(getByText('10 de abril')).toBeInTheDocument();
    expect(getByText('My New Post')).toBeInTheDocument();
    expect(getByText('Post excerpt')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post',
      }
    } as any);


    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      }),
    );
  });

  it('loads initial data if subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ],
        },
        last_publication_date: '04-01-2021',
      })
    } as any);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post',
      }
    } as any);


    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      }),
    );
  });
});
