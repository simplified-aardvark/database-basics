import { getDefaultNormalizer } from "@testing-library/react";
import app from "./firebase_app";
import {getFirestore, collection, getDocs, doc, getDoc, query, where} from "firebase/firestore";



const db = getFirestore(app);

//d = d
export async function get_snapshot_from_fb(collection_name) {
    const firebase_collection = collection(db, collection_name);
    return await getDocs(firebase_collection);
}

// ########--PEOPLE FUNCTIONS--########

// function returns ids for all json objects in array
export async function get_all_names_sorted() {
    const data_snapshot = await get_snapshot_from_fb("people");

    const json_obj_people = data_snapshot.docs.map(
        (d) => (
            {
                id: d.id,
                ...d.data() //captures remaining data
            }
        )
    ).sort(
        function(a,b) {
                return a.first_name.localeCompare(b.first_name);
        }
    );


    return json_obj_people.map(
        function(item) {
            return {
                id: item.id.toString(),
                first_name: item.first_name,
                last_name: item.last_name
            };
        }
    );
}
    
    
    export async function get_all_item_ids() {
        const data_snapshot = await get_snapshot_from_fb("people");

        return data_snapshot.docs.map(
            function(d) {
                return {
                    params: {
                        id: d.id.toString()
                    }
                };
            }
        );
    }
    
    
    export async function get_item_data(req_id) {
        const doc_ref = doc(db, "people", req_id);
        const d = await getDoc(doc_ref);
        
        return d.exists ? d.data() : {};
    }
    // ########--END OF PEOPLE FUNCTIONS--########
    
    
    
    // ########--RELATIONSHIP FUNCTIONS--########
    export async function get_relationship_data(req_id) {
        let q =  query(collection(db, "relationships"), where ("owner_id", "==", req_id));
        const query_snapshot = await getDocs(q);


        let related_people_ids = query_snapshot.docs.map(
            function(d) {
                console.log(d.data())
                return d.data().related
            }
        )

    
        // const related_people_snapshot = await getDocs(related_people_ids);
        // console.log(related_people_ids);
    


        let return_obj = await related_people_ids[0].map(
            async function(id) {
                const doc_ref = doc(db, "people", id);
                console.log(id);
                const d = await getDoc(doc_ref);
                return d.data();
            }
            
        )
        
        // let temp_thing = await return_obj;
        // console.log(return_obj+"fghgh");
        console.log(return_obj)
        
        return {}; 
        return return_obj
    }
    // ########--END OF RELATIONSHIP FUNCTIONS--########