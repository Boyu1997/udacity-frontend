import { displayNewTripForm, hideNewTripForm, createNewTrip  } from '../client/js/newTrip';
import { createTripContainer, removeTripContainer } from '../client/js/tripContainer';

describe("Testing client", () => {
    
    test("Testing displayNewTripForm() function", () => {
        expect(displayNewTripForm).toBeDefined();
    });
    test("Testing hideNewTripForm() function", () => {
        expect(hideNewTripForm).toBeDefined();
    });
    test("Testing createNewTrip() function", () => {
        expect(createNewTrip).toBeDefined();
    });

    test("Testing createTripContainer() function", () => {
        expect(createTripContainer).toBeDefined();
    });
    test("Testing removeTripContainer() function", () => {
        expect(removeTripContainer).toBeDefined();
    });
})