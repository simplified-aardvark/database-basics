import { get_all_item_ids } from "../lib/data";
import '@testing-library/jest-dom'

//Tests to see if the loaded item/people list contains at least on entry
test('at least one item', () => {
    expect(get_all_item_ids().length).toBeGreaterThan(0);
});