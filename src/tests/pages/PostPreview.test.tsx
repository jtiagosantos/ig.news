import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import PostPreview, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post content</p>",
  updatedAt: "01 de abril de 2021",
};

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock("../../services/prismic");

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)

    const { getByText } = render(<PostPreview post={post} />);

    expect(getByText("My New Post")).toBeInTheDocument();
    expect(getByText("Post content")).toBeInTheDocument();
    expect(getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        activeSubscription: 'fake-active-subscription'
      }
    } as any);

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any)

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post'}
          ],
          content: [
            { type: 'paragraph', text: 'Post content'}
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getStaticProps({ params: { slug: 'my-new-post'} })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021',
          }
        }
      })
    )
  })
})