import fs from 'fs';
import path from 'path';

// get filepath to data directory
const data_dir = path.join( process.cwd(), 'data' );
// get filepath to json file
const file_path = path.join(data_dir, 'people.json');
// load json file contents
const json_string = fs.readFileSync(file_path,'utf8');
// convert string from file into json array object
const json_obj = JSON.parse(json_string);


// function returns ids for all json objects in array
export function get_all_names() {
// use map() on array to extract just id + name properties into new array of obj values
    return json_obj.map(
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
    return json_obj.map(
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
    const obj_match = json_obj.filter(
        function(obj) {
        return obj.id.toString() === req_id;
        }
    );

  return obj_match.length > 0 ? obj_match[0] : {};
}