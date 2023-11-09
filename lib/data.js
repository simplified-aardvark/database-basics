import fs from 'fs';
import path from 'path';

// get filepath to data directory
const data_dir = path.join( process.cwd(), 'data' );

//create "people" json obj
const file_path_people = path.join(data_dir, 'people.json');
const json_string_people = fs.readFileSync(file_path_people,'utf8');
const json_obj_people = JSON.parse(json_string_people);

//create "relationships" json obj
const file_path_relationship = path.join(data_dir, 'relationships.json');
const json_string_relationship = fs.readFileSync(file_path_relationship,'utf8');
const json_obj_relationship = JSON.parse(json_string_relationship);



// ########--PEOPLE FUNCTIONS--########

// function returns ids for all json objects in array
export function get_all_names() {
// use map() on array to extract just id + name properties into new array of obj values
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


export function get_all_item_ids() {
    return json_obj_people.map(
        function(item) {
            return {
                params: {
                    id: item.id.toString()
                }
            };
        }
    );
}


export function get_item_data(req_id) {
    // find object value in array that has matching id
    const obj_match = json_obj_people.filter(
        function(obj) {
            return obj.id === req_id;
        }
    );
    
    return obj_match.length > 0 ? obj_match[0] : {};
}
// ########--END OF PEOPLE FUNCTIONS--########



// ########--RELATIONSHIP FUNCTIONS--########
export function get_relationship_data(req_id) {
    // find object value in array that has matching id
    let obj_match = json_obj_relationship.filter(
        function(obj) {
            return obj.owner_id === req_id;
        }
    );

    let related_people = json_obj_people.filter(
        function(obj) {
            return obj_match[0].related.includes(obj.id);
        }
    )
    
    return related_people; 
}
// ########--END OF RELATIONSHIP FUNCTIONS--########