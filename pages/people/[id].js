import Layout from '../../components/layout';
import Head from 'next/head';
import { get_all_item_ids, get_item_data } from '../../lib/data';

export async function getStaticPaths() {
  const paths = get_all_item_ids();
  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const item_data = get_item_data(params.id);
    return {
        props: {
            item_data,
        },
    };
}


export default function person_page({ item_data }) {
    return (
        

        <Layout>
            <Head>
                <title>{item_data.first_name} {item_data.last_name}</title>
            </Head>
               
            {item_data.first_name} {item_data.last_name}
            <br />
            {item_data.id}
            <br />
            {item_data.email}
        </Layout>
    );
  }
  

