import Layout from '../../components/layout';
import Link from 'next/link';
import Head from 'next/head';
import { get_all_item_ids, get_item_data, get_relationship_data } from '../../lib/data';

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
    const relationship_data = get_relationship_data(params.id);
    const page_title = item_data.first_name + " " + item_data.last_name;

    return {
        props: {
            item_data,
            relationship_data,
            page_title
        },
    };
}


export default function person_page({ item_data, relationship_data, page_title}) {
    return (
        

        <Layout>
            <Head>
                <title>{page_title}</title>
            </Head>
               
            <h1 className='text-center'>{item_data.first_name} {item_data.last_name}</h1>
            <hr/>
            <h3>Employee ID: {item_data.id}</h3>
            <br/>
            <h3>Email: {item_data.email}</h3>
            <br/>
            <hr/>
            <h3>Emergency Contacts:</h3>

            <div className='list-group'>
            {relationship_data.map(
                    ({id, first_name, last_name}) => (
                        <Link key={id} href={`/people/${id}`} className="list-group-item list-group-item-action list-group-item-info">
                            {first_name} + {last_name}
                        </Link>
                    )
                )
            }
            </div>
            <br/>
        </Layout>
    );
  }