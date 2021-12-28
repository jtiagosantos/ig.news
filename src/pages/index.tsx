import Head from 'next/head';

import syles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={syles.contentContainer}>
        <section className={syles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br /> the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
