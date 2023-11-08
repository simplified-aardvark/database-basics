import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { get_all_names } from '../lib/data';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const all_names = get_all_names();
 
  // const list_items = all_names.map((name) =>
  //   // <li key={name.id}>{name.first_name} {name.last_name} </li>
  //   <li>{name.id}</li>
  // );
  
  return {
    props: { all_names }
  };
}



export default function Home( {all_names}) {
    return (
      <Layout home>
        <Head>
            <title>Homepage</title>
        </Head>
  
        <h1>This is a page</h1>

        <h3>This is a list of people</h3>

        <div className='list-group'>
          {all_names.map(
              ({id, first_name, last_name}) => (
                // <ul key={id}>{first_name} + {last_name}</ul>

                <Link key={id} href={`/people/${id}`} className="list-group-item list-group-item-action">
                  {first_name} + {last_name}
                </Link>
              )


            )
          }
          
          
        </div>
      </Layout>
    );
  }